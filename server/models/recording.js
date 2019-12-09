var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RecordingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Recording', RecordingSchema)
