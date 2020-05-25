const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    session: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
