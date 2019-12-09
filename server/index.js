import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import logger from 'node-color-log'
import fileUpload from 'express-fileupload'

const app = express()
const bodyParser = require('body-parser')

if (process.env.NODE_ENV === 'development') {
  const devMiddleware = require('./middlewares/dev-middleware')
  app.use(devMiddleware.webpackDev)
  app.use(devMiddleware.webpackHot)
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))
app.use(require('./routes/index'))
app.use(express.static(path.join(__dirname, '..', 'dist', 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
mongoose.connect(process.env.MONGODB, (err, res) => {
  if (err) throw err
  logger.info(`Database OnLine!`)
})

app.listen(process.env.PORT, () => {
  logger.info(`startup - La APP server started on ${process.env.HOST}:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
