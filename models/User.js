const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
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
    required: true,
    select: false
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
  image: {
    type: String
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
    type: Number
  },
  education: {
    type: [String]
  },
  rating: {
    type: Number
  },
  role: {
    type: String
  },
  price: {
    type: Number
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
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
UserSchema.pre('save', function (callback) {
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

UserSchema.methods.verifyPassword = function (password, cb) {
  console.log(this);
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
