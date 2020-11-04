const mongoose = require('mongoose')

const CommentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Post', {
  category: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    require: true,
  },
  post_title: {
    type: String,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  blog_handler: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0
  },
  comments: {
    type: [CommentsSchema]
  }
})
