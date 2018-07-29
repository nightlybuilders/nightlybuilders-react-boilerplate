// Docs: https://hapijs.com/tutorials/auth
import bcrypt from 'bcrypt'

let users = {}
const saltRounds = 10

const validate = async (request, username, password) => {
  const user = users[username]
  if (!user) {
    return { credentials: null, isValid: false }
  }

  const isValid = await bcrypt.compare(password, user.password)
  const credentials = { name: user.username }

  return { isValid, credentials }
}

export const setupSecurity = async server => {
  if (!process.env.BASIC_USER || !process.env.BASIC_PW) {
    return true // still return true, so that createAndStartServer does not fail
  }

  bcrypt.hash(process.env.BASIC_PW, saltRounds, (err, hash) => {
    users = {
      [process.env.BASIC_USER]: {
        username: process.env.BASIC_USER,
        password: hash, // 'secret'
      },
    }
  })

  await server.register(require('hapi-auth-basic')) // eslint-disable-line global-require
  server.auth.strategy('simple', 'basic', { validate })
  return true
}
