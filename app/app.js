const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
let app = koa()

app.use(logger())

app.use(route.get('/:book/:chapter/:verse', function * fetch (book, chapter, verse, next) {
  if (this.method !== 'GET') {
    return yield next
  }
  this.body = {
    book,
    chapter,
    verse
  }
}))

app.listen(3000)
