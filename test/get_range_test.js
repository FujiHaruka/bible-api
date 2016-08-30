const app = require('../app/app')
const request = require('supertest')
const assert = require('assert')
const { URL_PREFIX } = require('../env')

describe('app.js', function () {
  this.timeout(2000)

  it('GET /gen/from/1/10/to/1/12', (done) => {
    request(app.listen())
      .get(URL_PREFIX + '/gen/from/1/10/to/1/12')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.equal(res.body.length, 3)
      })
      .end(done)
  })

  it('GET /gen/from/1/10/to/3/5', (done) => {
    request(app.listen())
      .get(URL_PREFIX + '/gen/from/1/10/to/3/5')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        assert.equal(res.body[0].verse, 10)
        assert.equal(res.body[res.body.length - 1].verse, 5)
      })
      .end(done)
  })
})

/* global describe it */
