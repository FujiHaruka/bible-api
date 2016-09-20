const { APP_PORT, URL_PREFIX } = require('../env')
const koa = require('koa')
const logger = require('koa-logger')
const router = require('koa-router')({ prefix: URL_PREFIX })
const koaBody = require('koa-body')()
const cors = require('koa-cors')
const controller = require('./helper/controller')
let app = module.exports = koa()

router
  .get('/:book/:chapter/:verse', controller.fetchOne)
  .get('/:book/from/:fromChapter/:fromVerse/to/:toChapter/:toVerse', controller.fetchRange)
  .post('/multiple', koaBody, controller.fetchMultiple)

app.use(cors({ origin: '*' }))
app.use(router.routes())
app.use(router.allowedMethods())

if (!module.parent) {
  app.use(logger())
  app.listen(APP_PORT)
}
