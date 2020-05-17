const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const TutorSchema = new Schema(
  {
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
    minGroupSize: {
      type: Number
    },
    maxGroupSize: {
      type: Number
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
      type: Number
    },
    role: {
      type: String,
      defaultValue: 'tutor'
    },
    price: {
      type: Number
    },
    sessionsCompleted: {
      type: Number
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
  }
  // { timestamps: true }
);

// Execute before each user.save() call
TutorSchema.pre('save', function (callback) {
  const user = this;
  user.createdAt = new Date(Date.now());
  console.log('test hello');
  callback();
});

TutorSchema.pre('save', function (callback) {
  const user = this;
  // user.createdAt = new Date(Date.now());
  console.log('test hash');
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
