const app = require('../app/app')
const request = require('supertest')

describe('app.js', function () {
  this.timeout(2000)

  it('GET /gen/1/1', (done) => {
    request(app.listen())
      .get('/gen/1/1')
      .set('Accept', 'text/plain')
      .expect(200, 'はじめに神は天と地とを創造された。', done)
  })
})

/* global describe it */
