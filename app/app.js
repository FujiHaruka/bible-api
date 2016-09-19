const koa = require('koa')
const logger = require('koa-logger')
const route = require('koa-route')
const controller = require('./helper/controller')
const { APP_PORT, URL_PREFIX } = require('../env')
let app = module.exports = koa()

app.use(route.get(URL_PREFIX + '/:book/:chapter/:verse', controller.fetchOne))
app.use(route.get(URL_PREFIX + '/:book/from/:fromChapter/:fromVerse/to/:toChapter/:toVerse', controller.fetchRange))

if (!module.parent) {
  app.use(logger())
  app.listen(APP_PORT)
}
