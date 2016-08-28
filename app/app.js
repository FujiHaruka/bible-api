const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const { validateBook } = require('./helper/validete')
const { BibleModel } = require('./helper/db')
let app = koa()

app.use(logger())

app.use(route.get('/:book/:chapter/:verse', function * fetch (book, chapter, verse) {
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
}))

app.listen(3000)
