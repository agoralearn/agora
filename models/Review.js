const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
