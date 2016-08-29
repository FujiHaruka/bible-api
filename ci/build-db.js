#!/usr/bin/env node

const { execSync } = require('child_process')
const { DB_IMAGE_NAME } = require('../env')

let cmd = `

docker build -t ${DB_IMAGE_NAME} .

`.trim()

console.log('> ' + cmd)

execSync(cmd, {
  cwd: __dirname + '/../mysql',
  stdio: 'inherit'
})
