const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const StudentSchema = new Schema(
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
      type: Number
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
    age: {
      type: [String]
    },
    education: {
      type: String
    },
    role: {
      type: String,
      defaultValue: 'student'
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    sessionsCompleted: {
      type: Number
    },
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
      }
    ],
    tutorSessions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Session'
      }
    ]
  },
  { timestamps: true }
);

// Execute before each user.save() call
StudentSchema.pre('save', function (callback) {
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

StudentSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
