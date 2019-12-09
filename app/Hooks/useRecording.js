/* eslint-disable */
import { useState, useEffect } from 'react'

export default () => {
  const [recording, setRecording] = useState(false)
  const [recorder, setRecorder] = useState(null)

  const recordAudio = () =>
    new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const audioChunks = []

      mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data)
      })

      const start = () => {
        setRecording(true)        
        mediaRecorder.start()
      }

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunks,{ type:"audio/mp3" })
            const audioUrl = URL.createObjectURL(audioBlob)
            const audio = new Audio(audioUrl)            
            const play = () => audio.play()            
            resolve({ audioBlob, audioUrl, play, audio })
          })
          setRecording(false)
          mediaRecorder.stop()
        })

      resolve({ start, stop })
    })

    useEffect(() => {
      async function initRecording() {        
        setRecorder(await recordAudio())
      }
      initRecording()
    }, [])

  return [ recording, recorder ]
}
