import express from 'express'
import recordingRoute from './recording'

const app = express()

app.use(recordingRoute)

module.exports = app
