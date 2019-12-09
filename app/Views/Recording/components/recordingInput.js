import React from 'react'
import Audio from 'Components/audio'
import IconButton from '@material-ui/core/IconButton'
import SettingVoice from '@material-ui/icons/SettingsVoice'
import UseRecording from 'Hooks/useRecording'
import DeleteIcon from '@material-ui/icons/Delete'

const RecordingInput = ({ getValues, handleChange, error, cleanAudio }) => {
  const [recording, recorder] = UseRecording()
  console.log(getValues())
  return getValues() && getValues().recordingFile
    ? <div>
      <Audio isLocal path={getValues().audioUrl} style={{ display: 'inline' }} />
      <IconButton
        edge='end'
        aria-label='delete'
        style={{ display: 'inline', top: -25 }}
        onClick={cleanAudio}
      >
        <DeleteIcon style={{ display: 'inline' }} />
      </IconButton>
    </div>
    : <React.Fragment>
      <IconButton edge='end' aria-label='recording' onClick={async () => {
        if (!recording) {
          recorder.start()
        } else {
          const { audioBlob, audioUrl, audio } = await recorder.stop()
          handleChange(audioBlob, audioUrl, audio)
        }
      }}>
        <SettingVoice style={{ color: recording ? 'green' : '' }} fill='green' />
        <p style={{ color: recording ? 'green' : '', fontSize: 14 }}> {recording ? 'Grabando' : 'Grabar'}</p>
      </IconButton>
      {
        error && <p style={{ color: '#f44336' }}>La grabación es requerida</p>
      }
    </React.Fragment>
}

export default RecordingInput
