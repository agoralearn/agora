const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const TutorSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String
  },
  subjects: {
    type: [String]
  },
  groupSize: {
    type: [Num]
  },
  timeFrame: {
    type: [String]
  },
  age: {
    type: [String]
  },
  education: {
    type: [String]
  },
  rating: {
    type: Num
  },
  role: {
    type: String,
    defaultValue: 'tutor'
  },
  price: {
    type: Num
  },
  sessionsCompleted: {
    type: Num
  },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ],
  tutorSessions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Session'
    }
  ]
});

// Execute before each user.save() call
TutorSchema.pre('save', function (callback) {
  const user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('password')) {
    return callback();
  }

  // Password changed so we need to hash it
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return callback(err);
      }
      user.password = hash;
      callback();
    });
  });
});

TutorSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const Tutor = mongoose.model('Tutor', TutorSchema);

module.exports = Tutor;
