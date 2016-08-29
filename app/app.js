const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const controller = require('./helper/controller')
let app = module.exports = koa()

app.use(route.get('/api/:book/:chapter/:verse', controller.fetchOne))
app.use(route.get('/api/:book/from/:fromChapter/:fromVerse/to/:toChapter/:toVerse', controller.fetchRange))

if (!module.parent) {
  app.use(logger())
  app.listen(3000)
}
