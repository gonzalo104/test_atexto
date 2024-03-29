require('dotenv').config()

if (process.env.NODE_ENV === 'production') {
  require('./dist/server')
} else {
  require('@babel/register')
  require('babel-polyfill')
  require('./server')
}
