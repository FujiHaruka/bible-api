const app = require('../app/app')
const request = require('supertest')
const co = require('co')
const assert = require('assert')

describe('app.js', function () {
  this.timeout(3000)

  it('GET 500 verses', () => co(function * () {
    for (let chapter = 1; chapter <= 50; chapter++) {
      for (let verse = 1; verse <= 10; verse++) {
        let req = request(app.listen())
        let got = yield req.get(`/gen/${chapter}/${verse}`)
        assert.equal(200, got.status)
      }
    }
  }))
})

/* global describe it */
