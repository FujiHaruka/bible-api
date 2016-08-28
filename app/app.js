const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const { validateBook } = require('./helper/validete')
let app = koa()

app.use(logger())

app.use(route.get('/:book/:chapter/:verse', function * fetch (book, chapter, verse, next) {
  let valid = this.method === 'GET' &&
              validateBook(book) &&
              chapter === '' + parseInt(chapter, 10) &&
              verse === '' + parseInt(verse, 10)
  if (!valid) {
    return new Error('Invalid url.')
  }
  this.body = {
    book,
    chapter,
    verse
  }
}))

app.listen(3000)
