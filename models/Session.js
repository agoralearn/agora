const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
