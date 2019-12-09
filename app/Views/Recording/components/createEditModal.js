import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'Components/modal'
import useForm from 'react-hook-form'
import RecordinInput from './recordingInput'
import UrlToBlob from 'Utils/urlToBlob'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

export default function CreateEditModal ({ open, handleModal, initialValues, isNew, createRecordig, updateRecording }) {
  const classes = useStyles()
  const { register, handleSubmit, errors, triggerValidation, setValue, getValues } = useForm({ defaultValues: initialValues })

  const onSubmit = data => {
    if (isNew) {
      createRecordig(data)
    } else {
      updateRecording(data, initialValues._id)
    }
  }

  const handleChangeRecording = async (audioBlob, audioUrl, audio) => {
    setValue('recordingFile', audioBlob)
    setValue('audioUrl', audioUrl)
    setValue('audio', audio)
    await triggerValidation({ name: 'recordingFile' })
    await triggerValidation({ name: 'audioUrl' })
    await triggerValidation({ name: 'audio' })
  }

  const handleChangeCleanAudio = async () => {
    setValue('recordingFile', null)
    setValue('audioUrl', '')
    setValue('audio', null)
    await triggerValidation({ name: 'recordingFile' })
    await triggerValidation({ name: 'audioUrl' })
    await triggerValidation({ name: 'audio' })
  }

  useEffect(() => {
    register({ name: 'recordingFile' }, { required: true })
    register({ name: 'audioUrl' }, { required: true })
    register({ name: 'audio' }, { required: true })
    if (!isNew) {
      const getBlob = async () => {
        const { audioBlob, audioUrl, audio } = await UrlToBlob(`${process.env.URL_SERVER}/${initialValues.path}`)
        setValue('recordingFile', audioBlob)
        setValue('audioUrl', audioUrl)
        setValue('audio', audio)
      }
      getBlob()
    }
  }, [register])

  return (
    <Modal open={open} onClose={handleModal} submit={handleSubmit(onSubmit)} title={`${isNew ? 'Nueva' : 'Editar'} grabación`}>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField name='title' label='Título' autoFocus variant='outlined' fullWidth inputRef={register({ required: true })} error={!!errors.title} />
        <TextField name='description' label='Descripción' variant='outlined' fullWidth inputRef={register({ required: true })} error={!!errors.description} />
        <RecordinInput cleanAudio={handleChangeCleanAudio} getValues={getValues} handleChange={handleChangeRecording} error={!!errors.recordingFile} />
      </form>
    </Modal>
  )
}
