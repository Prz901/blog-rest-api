const User = require('../models/User')
const signJwt = require('../utils/sign-jwt')

const create = async user => {
  try {
    const foundUser = await User.findOne({ email: user.email })

    if (foundUser) {
      return {
        message: 'Email already exists',
        status: 422
      }
    }
    const _user = new User(user)

    const token = signJwt({ email: user.email }, 604800000)

    const savedUser = await _user.save()

    return {
      message: 'User created',
      data: { ...savedUser._doc, token: token },
      status: 201,
    }
  } catch (err) {
    if (Object.keys(err.errors).length > 0)
      return {
        message: err,
        status: 400
      }

    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

const getById = async (id) => {
  try {
    const _user = await User.findById(id)

    if (!_user)
      return {
        message: 'User not Found',
        status: 404
      }

    return {
      message: 'User Found',
      data: _user,
      status: 200,
    }

  } catch (err) {
    if (err.kind === 'ObjectId')
      return {
        message: 'Invalid mongodb id',
        status: 400,
      }

    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}


const update = async postId => {
  try {
    const _user = await User.findById(id)

    if (!_user) {
      return {
        message: 'User not Found',
        status: 404
      }
    }

    _user.password = user.password || _user.password
    _user.name = user.name || _user.name
    _user.blog_handler = user.blog_handler || _user.blog_handler
    _user.profile_img = user.profile_img || _user.profile_img
    _user.about = user.about || _user.about
    _user.active = user.active || _user.active

    return {
      message: 'Update',
      data: await _user.save(),
      status: 200,
    }

  } catch (err) {
    if (err.kind === 'ObjectId')
      return {
        message: 'Invalid mongodb id',
        status: 400,
      }

    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

module.exports = {
  create,
  getById,
  update,
}