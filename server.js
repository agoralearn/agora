require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const morgan = require('morgan');
const initDb = require('./config/initDb');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const errorMiddleware = require('./routes/errorMiddleware');
const chatRouter = require('./routes/chat');
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

let socketMap = {};
let whiteBoardMap = {};

// setup socket.io middleware
function socketConfig(req, res, next) {
  req.io = io;
  req.socketMap = socketMap;
  next();
}

function removeSocketSession(socketId, socketMap) {
  const socketMapClone = { ...socketMap };
  const userId = socketMapClone[socketId];
  delete socketMapClone[userId];
  delete socketMapClone[socketId];

  return socketMapClone;
}

function addSocketToMap(socketId, userId, socketMap) {
  const socketMapClone = { ...socketMap };
  socketMapClone[userId] = socketId;
  socketMapClone[socketId] = userId;

  return socketMapClone;
}

// log all requests to the console in development
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Setting up express to use json and set it to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDb();

// Serve up static assets in production (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(authRouter, errorMiddleware);

// The logged in user
app.use('/api/user', usersRouter);

// Search or viewing tutor profile
app.use('/api/tutors', searchRouter);

// Logged in user chat stuff
app.use('/api/chat', socketConfig, chatRouter);

// Send all other requests to react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

io.on('connection', (socket) => {
  socket.on('loggedIn', (data) => {
    socketMap = addSocketToMap(socket.id, data.userId, socketMap);
  });

  socket.on('draw', (data) => {
    io.to(data.room).emit('newDraw', data);
  });

  socket.on('deleteDraw', (data) => {
    io.to(data.room).emit('delete', data);
  });

  socket.on('disconnect', () => {
    socketMap = removeSocketSession(socket.id, socketMap);
  });

  socket.on('leave', ({ chatId }) => {
    socket.leave(chatId);
  });

  // On connection to whiteboard
  // TODO: On join send this user the current board
  socket.on('join', (data) => {
    socket.join(data.chatId, () => {
      io.to(data.chatId).emit('join', '');
    });
  });
});

server.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
