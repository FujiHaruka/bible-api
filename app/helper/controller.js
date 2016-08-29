const { validateBook } = require('./validete')
const { BibleModel } = require('./db')
const bookInfo = require('../src/book')

module.exports.fetchOne = function * fetchOne (book, chapter, verse) {
  // Validation
  book = book.toLowerCase()
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              isIntStr(chapter) &&
              isIntStr(verse)
  if (!valid) {
    return
  }
  // Find
  let key = [book, chapter, verse].join('.')
  let one = yield BibleModel.findOne({
    where: {
      Verse: key
    }
  })
  if (!one) {
    return
  }
  this.body = {
    key,
    text: one.Scripture,
    book: bookInfo[book].jp
  }
}

module.exports.fetchRange = function * fetchRange (book, fromChapter, fromVerse, toChapter, toVerse) {
  // Validation
  book = book.toLowerCase()
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              isIntStr(fromChapter) &&
              isIntStr(fromVerse) &&
              isIntStr(toChapter) &&
              isIntStr(toVerse)
  if (!valid) {
    return
  }
  // Find
}

function isIntStr (str) {
  return str === '' + parseInt(str, 10)
}
