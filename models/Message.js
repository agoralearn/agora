const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  read: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  specialMsg: {
    type: String,
    defaultValue: false
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
