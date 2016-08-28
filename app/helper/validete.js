const books = require('../src/book.json')

/**
 * 本の名称を validate
 */
function validateBook (name) {
  return books[name] !== undefined
}

module.exports = {
  validateBook
}
