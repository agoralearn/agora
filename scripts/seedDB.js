const mongoose = require('mongoose');
const db = require('../models');

// const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/agoraDB';

// const dbOptions = {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// };

// mongoose
//   .connect(mongoUri, dbOptions)
//   .then(() => console.log('MongoDB Connected!'))
//   .catch((err) => console.error(err));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/agoraDB');

const tutorSeed = [
  {
    email: 'courtney@mail.com',
    password: 'test',
    createdAt: '',
    firstName: 'Courtney',
    lastName: 'Baldwin',
    bio:
      'Hi! I recently completed my Masters degree in 18th century British literature and I am taking a year off before starting my PhD. I have been a nanny, TA, and tutor for 5 years and love to teach. I am willing to take one-on-one or on-going sessions through August 2020.',
    subjects: ['english', 'world history', 'grammar'],
    minGroupSize: 1,
    maxGroupSize: 10,
    timeFrame: ['one-time', 'on-going'],
    age: 100,
    education: ['undergraduate', 'masters'],
    rating: 4.8,
    role: 'tutor',
    price: 50,
    sessionsCompleted: 20,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'tracy@mail.com',
    password: 'test',
    // createdAt: '',
    firstName: 'Tracy',
    lastName: 'Clark',
    bio:
      'I graduated from UCSD last year with a degree in Early Child Development. I am currently doing teacher training as a middle school math teacher and I enjoy finding ways to make math accessible and fun!',
    subjects: ['algebra', 'geometry', 'trigonometry'],
    minGroupSize: 1,
    maxGroupSize: 5,
    timeFrame: ['one-time'],
    age: 15,
    education: ['undergraduate'],
    rating: 4,
    role: 'tutor',
    price: 30,
    sessionsCompleted: [],
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'matthew@mail.com',
    password: 'test',
    // createdAt: 1589689166924,
    firstName: 'Matthew',
    lastName: 'Bishop',
    bio:
      'Self-taught web developer. I have many youtube tutorials on web-development and other coding projects. I love engaging with people to help on their projects or help debug. Check me out at thispersondoesnotexist.com - happy hacking!',
    subjects: ['computer science', 'web development'],
    minGroupSize: 1,
    maxGroupSize: 10,
    timeFrame: ['one-time', 'on-going'],
    age: 100,
    education: ['undergraduate'],
    rating: 4.5,
    role: 'tutor',
    price: 60,
    sessionsCompleted: [],
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'emmett@mail.com',
    password: 'test',
    // createdAt: 1589689994853,
    firstName: 'Emmett',
    lastName: 'Gross',
    bio:
      'Home School Experience! I home-schooled my kids plus a small group from the neighborhood through highschool. They are all in college now and I am looking to take on new on-going home-school courses. I have a PhD in Physics from University of Washington and specialize in teaching science and math. I am open to other subjects or advanced courses for curious kids.',
    subjects: [
      'chemistry',
      'physics',
      'biology',
      'Earth Science',
      'algebra',
      'geometry',
      'trigonometry',
      'calculus'
    ],
    groupSize: 10,
    timeFrame: ['on-going'],
    age: 18,
    education: ['undergraduate', 'master', 'doctorate'],
    rating: 5,
    role: 'tutor',
    price: 80,
    sessionsCompleted: [],
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'adam@mail.com',
    password: 'test',
    // createdAt: 1589691162150,
    firstName: 'Adam',
    lastName: 'Morris',
    bio:
      '"History is the record of places and events, art history is the record of how people felt about it." I\'m passionate about art and arts education and would be interested in setting up on-going sessions for interested groups while I finish my PhD in Renaissance Art. Flexible schedule.',
    subjects: ['art', 'art history'],
    groupSize: 5,
    timeFrame: ['on-going'],
    age: 100,
    education: ['undergraduate', 'masters', 'doctorate'],
    rating: 4.6,
    role: 'tutor',
    price: 90,
    sessionsCompleted: [],
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'carmen@mail.com',
    password: 'test',
    // createdAt: 1589691465437,
    firstName: 'Carmen',
    lastName: 'Wells',
    bio:
      "Hola, I'm Carmen from Havana, Cuba. I have taught Spanish in middle and high school for 20 years. I am recently retired and flexible for a day or evening sessions.",
    subjects: ['spanish'],
    groupSize: 5,
    timeFrame: ['one-time', 'on-going'],
    age: 100,
    education: ['undergraduate'],
    rating: 4.9,
    role: 'tutor',
    price: 40,
    sessionsCompleted: [],
    chats: [],
    reviews: [],
    tutorSessions: []
  }
];

const studentSeed = [
  {
    email: 'ollie@mail.com',
    password: 'test',
    // createAt: 1589725116167,
    firstName: 'Ollie',
    lastName: 'Rice',
    age: 13,
    education: 'middle',
    role: 'student',
    favorites: [],
    sessionsCompleted: [],
    chats: [],
    tutorSessions: []
  },
  {
    email: 'norma@mail.com',
    password: 'test',
    // createAt: 1589725354450,
    firstName: 'Norma',
    lastName: 'Moody',
    age: 17,
    education: 'high',
    role: 'student',
    favorites: [],
    sessionsCompleted: [],
    chats: [],
    tutorSessions: []
  },
  {
    email: 'david@mail.com',
    password: 'test',
    // createAt: 1589725455764,
    firstName: 'David',
    lastName: 'Morrison',
    age: 15,
    education: 'high',
    role: 'student',
    favorites: [],
    sessionsCompleted: [],
    chats: [],
    tutorSessions: []
  },
  {
    email: 'jeannie@mail.com',
    password: 'test',
    // createAt: 1589725559566,
    firstName: 'Jeannie',
    lastName: 'Watts',
    age: 20,
    education: 'undergraduate',
    role: 'student',
    favorites: [],
    sessionsCompleted: [],
    chats: [],
    tutorSessions: []
  }
];

db.Tutor.deleteMany({})
  .then(() => db.Tutor.collection.insertMany(tutorSeed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

db.Student.deleteMany({})
  .then(() => db.Student.collection.insertMany(studentSeed))
  .then((data) => {
    console.log(data.result.n + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
