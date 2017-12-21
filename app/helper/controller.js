const { validateBook } = require('./validete')
const { BibleModel } = require('./db')
const bookInfo = require('../data/book')

module.exports.fetchOne = function * fetchOne (next) {
  let {book, chapter, verse} = this.params
  // Validation
  book = book.toLowerCase()
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              isIntStr(chapter) &&
              isIntStr(verse)
  if (!valid) {
    yield next
    return
  }
  // Find
  let key = [book, chapter, verse].join('.')
  let one = yield BibleModel.findOne({
    where: { key }
  })
  if (!one) {
    yield next
    this.body = JSON.stringify({error: 'Not found'})
    return
  }
  this.body = JSON.stringify({
    key: one.key,
    text: one.text,
    book: bookInfo[book].jp,
    chapter: parseInt(chapter, 10),
    verse: parseInt(verse, 10)
  })
  yield next
}

module.exports.fetchRange = function * fetchRange (next) {
  let {book, fromChapter, fromVerse, toChapter, toVerse} = this.params
  // Validation
  book = book.toLowerCase()
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              isIntStr(fromChapter) &&
              isIntStr(fromVerse) &&
              isIntStr(toChapter) &&
              isIntStr(toVerse)
  if (!valid) {
    yield next
    return
  }
  let resp = yield findRange({book, fromChapter, fromVerse, toChapter, toVerse})
  this.body = JSON.stringify(resp)
  yield next
}

module.exports.fetchMultiple = function * fetchMultiple (next) {
  let reqList = this.request.body
  if (Object.keys(reqList).length === 0) {
    yield next
    return
  }
  let resp = []
  for (let req of reqList) {
    // エラーが出てもとりあえず次に行く心の強さ
    try {
      if (req.single) {
        let {book, chapter, verse} = req
        book = book.toLowerCase()
        let key = [book, chapter, verse].join('.')
        let one = yield BibleModel.findOne({
          where: { key }
        })
        if (!one) {
          continue
        }
        book = book.toLowerCase()
        resp.push({
          key: one.key,
          text: one.text,
          book: bookInfo[book].jp,
          chapter: parseInt(chapter, 10),
          verse: parseInt(verse, 10)
        })
      } else {
        let res = yield findRange(req)
        resp.push(res)
      }
    } catch (e) {
      console.log(e)
      continue
    }
  }
  this.body = JSON.stringify(resp)
}

function isIntStr (str) {
  return str === '' + parseInt(str, 10)
}

function * findRange ({book, fromChapter, fromVerse, toChapter, toVerse}) {
  // 章のデータを丸ごととってくる
  book = book.toLowerCase()
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
  let res
  if (fromChapter === toChapter) {
    res = chapterData[0].slice(fromVerse - 1, toVerse)
  } else {
    chapterData[0] = chapterData[0].slice(fromVerse - 1)
    let last = chapterData.length - 1
    chapterData[last] = chapterData[last].slice(0, toVerse)
    res = chapterData.reduce((concat, data) => concat.concat(data), [])
  }
  return res
}
