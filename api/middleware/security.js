const bcrypt = require('bcrypt')

const security = {
  hashPassword(password) {
    return bcrypt.hash(password, 10)
  },
  validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword)
  },
}

module.exports = security
