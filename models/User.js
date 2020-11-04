const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const { isEmail } = require('validator')

const { Schema } = mongoose

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail, 'Invalid Email'],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  blog_handler: {
    type: String,
    required: true,
  },
  profile_img: {
    type: String,
  },
  posts: {
    type: [String]
  },
  about: {
    type: String
  },
  active: {
    type: Boolean,
    default: true,
  }
})

UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password'))
    return next()

  try {
    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hash(this.password, salt)

    return next()
  } catch (err) {
    return next(err)
  }
})

UserSchema.methods = {
  validatePassword: async function validatePassword(data) {
    return bcrypt.compare(data, this.password)
  },
}

module.exports = mongoose.model('User', UserSchema)