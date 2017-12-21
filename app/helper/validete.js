const books = require('../data/book.json')

/**
 * 本の名称を validate
 */
function validateBook (name) {
  return Boolean(books[name])
}

module.exports = {
  validateBook
}
