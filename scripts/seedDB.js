const mongoose = require('mongoose');
const db = require('../models');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/agoraDB';

const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
};

mongoose
  .connect(mongoUri, dbOptions)
  .then(() => console.log('MongoDB Connected!'))
  .catch((err) => console.error(err));

const userSeed = [
  {
    email: 'courtney@mail.com',
    password: 'test',
    firstName: 'Courtney',
    lastName: 'Baldwin',
    bio:
      'Hi! I recently completed my Masters degree in 18th century British literature and I am taking a year off before starting my PhD. I have been a nanny, TA, and tutor for 5 years and love to teach. I am willing to take one-on-one or on-going sessions through August 2020.',
    image: 'https://randomuser.me/api/portraits/women/29.jpg',
    subjects: ['english', 'world history', 'grammar'],
    minGroupSize: 1,
    maxGroupSize: 10,
    timeFrame: ['one-time', 'on-going'],
    age: 100,
    education: ['undergraduate', 'masters'],
    rating: 4.8,
    role: 'tutor',
    price: 50,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'tracy@mail.com',
    password: 'test',
    firstName: 'Tracy',
    lastName: 'Clark',
    bio:
      'I graduated from UCSD last year with a degree in Early Child Development. I am currently doing teacher training as a middle school math teacher and I enjoy finding ways to make math accessible and fun!',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    subjects: ['algebra', 'geometry', 'trigonometry'],
    minGroupSize: 1,
    maxGroupSize: 5,
    timeFrame: ['one-time'],
    age: 15,
    education: ['undergraduate'],
    rating: 4,
    role: 'tutor',
    price: 30,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'matthew@mail.com',
    password: 'test',
    firstName: 'Matthew',
    lastName: 'Bishop',
    bio:
      'Self-taught web developer. I have many youtube tutorials on web-development and other coding projects. I love engaging with people to help on their projects or help debug. Check me out at thispersondoesnotexist.com - happy hacking!',
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
    subjects: ['computer science', 'web development'],
    minGroupSize: 1,
    maxGroupSize: 10,
    timeFrame: ['one-time', 'on-going'],
    age: 100,
    education: ['undergraduate'],
    rating: 4.5,
    role: 'tutor',
    price: 60,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'emmett@mail.com',
    password: 'test',
    firstName: 'Emmett',
    lastName: 'Gross',
    bio:
      'Home School Experience! I home-schooled my kids plus a small group from the neighborhood through highschool. They are all in college now and I am looking to take on new on-going home-school courses. I have a PhD in Physics from University of Washington and specialize in teaching science and math. I am open to other subjects or advanced courses for curious kids.',
    image: 'https://randomuser.me/api/portraits/men/21.jpg',
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
    minGroupSize: 1,
    maxGroupSize: 10,
    timeFrame: ['on-going'],
    age: 18,
    education: ['undergraduate', 'master', 'doctorate'],
    rating: 5,
    role: 'tutor',
    price: 80,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'adam@mail.com',
    password: 'test',
    firstName: 'Adam',
    lastName: 'Morris',
    bio:
      '"History is the record of places and events, art history is the record of how people felt about it." I\'m passionate about art and arts education and would be interested in setting up on-going sessions for interested groups while I finish my PhD in Renaissance Art. Flexible schedule.',
    image: 'https://randomuser.me/api/portraits/men/33.jpg',
    subjects: ['art', 'art history'],
    minGroupSize: 1,
    maxGroupSize: 5,
    timeFrame: ['on-going'],
    age: 100,
    education: ['undergraduate', 'masters', 'doctorate'],
    rating: 4.6,
    role: 'tutor',
    price: 90,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'carmen@mail.com',
    password: 'test',
    firstName: 'Carmen',
    lastName: 'Wells',
    bio:
      'Hola, I am Carmen from Havana, Cuba. I have taught Spanish in middle and high school for 20 years. I am recently retired and flexible for a day or evening sessions.',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    subjects: ['spanish'],
    minGroupSize: 1,
    maxGroupSize: 5,
    timeFrame: ['one-time', 'on-going'],
    age: 100,
    education: ['undergraduate'],
    rating: 4.9,
    role: 'tutor',
    price: 40,
    chats: [],
    reviews: [],
    tutorSessions: []
  },
  {
    email: 'ollie@mail.com',
    password: 'test',
    firstName: 'Ollie',
    lastName: 'Rice',
    age: 13,
    education: ['middle'],
    role: 'student',
    favorites: [],
    sessionsCompleted: 2,
    chats: [],
    tutorSessions: []
  },
  {
    email: 'norma@mail.com',
    password: 'test',
    firstName: 'Norma',
    lastName: 'Moody',
    age: 17,
    education: ['high'],
    role: 'student',
    favorites: [],
    sessionsCompleted: 3,
    chats: [],
    tutorSessions: []
  },
  {
    email: 'david@mail.com',
    password: 'test',
    firstName: 'David',
    lastName: 'Morrison',
    age: 15,
    education: ['high'],
    role: 'student',
    favorites: [],
    sessionsCompleted: 6,
    chats: [],
    tutorSessions: []
  },
  {
    email: 'jeannie@mail.com',
    password: 'test',
    firstName: 'Jeannie',
    lastName: 'Watts',
    age: 20,
    education: ['undergraduate'],
    role: 'student',
    favorites: [],
    sessionsCompleted: 1,
    chats: [],
    tutorSessions: []
  }
];

db.User.deleteMany({})
  .then(() => db.User.insertMany(userSeed))
  .then((data) => {
    console.log(data.length + ' records inserted!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
