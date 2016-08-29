const { validateBook } = require('./validete')
const { BibleModel } = require('./db')
const bookInfo = require('../src/book')

module.exports.fetchOne = function * fetchOne (book, chapter, verse) {
  book = book.toLowerCase()
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              chapter === '' + parseInt(chapter, 10) &&
              verse === '' + parseInt(verse, 10)
  if (!valid) {
    return
  }
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

module.exports.fetchRange = function * fetchRange (book, chapter, fromVerse, toVerse) {
  // TODO 実装
}
