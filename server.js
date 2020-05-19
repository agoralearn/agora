require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const initDb = require('./config/initDb');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const errorMiddleware = require('./routes/errorMiddleware');
const chatRouter = require('./routes/chat');

const PORT = process.env.PORT || 3001;

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

// app.use("/api/tutor", tutorRouter)

app.use(authRouter, errorMiddleware);

// Leave for reference incase I f'd something up
// app.use('/api', searchRouter);
// app.use(chatRouter);

// The logged in user
app.use('/api/user', usersRouter); // Good

// Search or viewing tutor profile
app.use('/api/tutors', searchRouter); // Good

// Logged in user chat stuff
app.use('/api/chat', chatRouter); // Good

// Send all other requests to react app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
