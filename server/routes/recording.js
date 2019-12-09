import express from 'express'
import Recording from '../models/recording'
import uuidv1 from 'uuid/v1'
const path = require('path')
const app = express()

// GET  ALL RECORDINGS
app.get('/recordings', async (req, res) => {
  const allRecordings = await Recording.find({}).lean().exec()
  res.json({
    ok: true,
    errors: [],
    data: allRecordings
  })
})

// Create RECORDING
app.post('/recording', async (req, res) => {
  const fileId = uuidv1()
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.')
  }
  const urlFile = `${path.resolve(__dirname, '../uploads')}/${fileId}.mp3`

  req.files.recordingFile.mv(urlFile, function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
  const recording = await Recording.create({ ...req.body, path: `uploads/${fileId}.mp3` })
  if (!recording) {
    res.status(201).json({
      ok: true,
      errors: ['error creating a recording'],
      data: null
    })
  }

  res.status(200).json({
    ok: true,
    errors: [],
    data: recording
  })
})

// UPDATE RECORDING {_id}
app.put('/recording/:id', async (req, res) => {
  const fileId = uuidv1()
  const { title, description } = req.body
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No files were uploaded.')
  }
  const urlFile = `${path.resolve(__dirname, '../uploads')}/${fileId}.mp3`
  req.files.recordingFile.mv(urlFile, function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
  const updateRec = await Recording.update({ _id: req.params.id }, { title, description, path: `uploads/${fileId}.mp3` })

  if (!updateRec) {
    res.status(201).json({
      ok: true,
      errors: ['error updating a recording'],
      data: null
    })
  }

  res.status(200).json({
    ok: true,
    errors: [],
    data: await Recording.findById(req.params.id).lean().exec()
  })
})

// DELETE RECORDINg {id}

app.delete('/recording/:id', async (req, res) => {
  console.log(req.params.id)
  await Recording.remove({ _id: req.params.id })
  res.status(200).json({
    ok: true,
    errors: [],
    data: []
  })
})

export default app
