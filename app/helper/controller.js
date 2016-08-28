const { validateBook } = require('./validete')
const { BibleModel } = require('./db')

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
  this.body = one.Scripture
}

module.exports.fetchRange = function * fetchRange (book, chapter, fromVerse, toVerse) {
  // TODO 実装
}
