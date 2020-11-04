const User = require('../models/User')

const signToken = require('../utils/sign-jwt')

const auth = async (email, password) => {
  try {
    const user = await User.findOne({ email: email })

    if (!user)
      return {
        message: 'Usuário e/ou senha inválidos',
        status: 401
      }

    const resp = await user.validatePassword(password)

    if (!resp)
      return {
        message: 'Usuário e/ou senha inválidos',
        status: 401
      }
    return {
      message: 'Autenticado com sucesso',
      data: signToken({ email }, 604800000),
      status: 200
    }

  } catch (e) {
    return e
  }
}

module.exports = {
  auth
}
