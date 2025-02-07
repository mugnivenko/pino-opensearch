'use strict'

const pinoJs = require('pino')
const opensearch = require('./lib')({
  index: 'pinotest',
  node: 'http://localhost:9200',
  auth: {
    apiKey: 'someKey'
  },
  esVersion: 7,
  flushBytes: 1000
})

const level = 'trace'
const pino = pinoJs({ level }, pinoJs.multistream([
  { level, stream: opensearch },
  { level, stream: process.stdout }
]))

pino.trace('test')
setInterval(function () {
  pino.trace('test')
}, 10000)
