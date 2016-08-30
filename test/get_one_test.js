const app = require('../app/app')
const request = require('supertest')
const assert = require('assert')
const { URL_PREFIX } = require('../env')

describe('app.js', function () {
  this.timeout(2000)

  it('GET /gen/1/1', (done) => {
    request(app.listen())
      .get(URL_PREFIX + '/gen/1/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.equal(res.body.text, 'はじめに神は天と地とを創造された。')
      })
      .end(done)
  })
})

/* global describe it */
