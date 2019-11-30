import express from 'express'
const app = express()

app.get('/recordings', (req, res) => {
  res.json({
    ok: true,
    message: 'all recordings'
  })
})

export default app
