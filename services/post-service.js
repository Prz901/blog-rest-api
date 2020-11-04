const Post = require('../models/Post')
const User = require('../models/User')

const create = async (post, email) => {
  try {
    const expectedUrl = post.post_title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Z0-9]+/ig, "-").toLowerCase()
    const [_user, foundPost] = await Promise.all([User.findOne({ email }), Post.findOne({ url: expectedUrl })])

    if (foundPost)
      return {
        message: 'Conflict Post url already exists',
        status: 409
      }

    const newPost = {
      ...post,
      url: expectedUrl,
      author_id: _user._id,
      blog_handler: _user.blog_handler,
      profile_img: _user.profile_img,
      about: _user.about
    }

    const _post = new Post(newPost)

    return {
      message: 'Post created',
      data: await _post.save(),
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

const getByUrl = async url => {
  try {
    const _post = await Post.findOne({ url })

    if (!_post)
      return {
        message: 'Post not Found',
        status: 404
      }

    return {
      message: 'Post Found',
      data: _post,
      status: 200,
    }

  } catch (err) {
    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

const getAll = async () => {
  try {
    const _post = await Post.find()

    return {
      message: 'All found posts',
      data: _post,
      status: 200,
    }

  } catch (err) {
    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

const update = async (id, email, post) => {
  try {
    const [_post, _user] = await Promise.all([Post.findById(id), User.findOne({ email })])

    if (!_post) {
      return {
        message: 'Post not Found',
        status: 404
      }
    }

    if (_post.author_id !== _user.id)
      return {
        message: 'Unauthorized',
        status: 401
      }

    return {
      message: 'Update',
      data: await _post.update(post),
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

const deleteOne = async (id, email) => {
  try {
    const [_post, _user] = await Promise.all([Post.findById(id), User.findOne({ email })])

    if (!_post)
      return {
        message: 'Post not Found',
        status: 404
      }

    if (_post.author_id !== _user.id)
      return {
        message: 'Unauthorized',
        status: 401
      }

    return {
      message: 'Post Deleted',
      data: _post,
      status: 200,
    }

  } catch (err) {
    return {
      message: 'Server Error ' + err,
      status: 500,
    }
  }
}

module.exports = {
  create,
  getByUrl,
  getAll,
  update,
  deleteOne,
}