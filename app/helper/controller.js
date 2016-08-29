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
    where: { key }
  })
  if (!one) {
    return
  }
  this.body = {
    key: one.key,
    text: one.text,
    book: bookInfo[book].jp,
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10)
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
  // 章のデータを丸ごととってくる
  let chapterData = []
  fromChapter = parseInt(fromChapter, 10)
  toChapter = parseInt(toChapter, 10)
  for (let chap = fromChapter; chap <= toChapter; chap++) {
    let pattern = `${book}.${chap}.%`
    let verseList = yield BibleModel.findAll({
      where: {
        key: {
          $like: pattern
        }
      }
    })
    verseList = verseList
      .map(data => ({
        key: data.key,
        text: data.text,
        book: bookInfo[book].jp,
        chapter: chap,
        verse: parseInt(data.key.split('.')[2], 10)
      }))
      .sort((dataA, dataB) => dataA.verse - dataB.verse)
    chapterData.push(verseList)
  }
  // 頭と尻尾を整形して結合
  let body
  if (fromChapter === toChapter) {
    body = chapterData[0].slice(fromVerse - 1, toVerse)
  } else {
    chapterData[0] = chapterData[0].slice(fromVerse - 1)
    let last = chapterData.length - 1
    chapterData[last] = chapterData[last].slice(0, toVerse)
    body = chapterData.reduce((concat, data) => concat.concat(data), [])
  }
  this.body = body
}

function isIntStr (str) {
  return str === '' + parseInt(str, 10)
}
