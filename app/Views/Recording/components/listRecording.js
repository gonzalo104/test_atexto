import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import noteImg from 'Assets/note.png'
import Audio from 'Components/audio'
import DialogConfirm from 'Components/confirm'

const useStyles = makeStyles(theme => ({
  list: {
    marginBottom: theme.spacing(2)
  },
  audio: {
    marginRight: 50,
    marginTop: 8
  }
}))

const ListRecording = ({ handleModal, data, deleteRecording }) => {
  const classes = useStyles()
  const [openComfirm, setOpenCom] = useState(false)
  const [actionDelete, setActionDelete] = useState(null)
  const handleActionDelete = (id) => {
    setOpenCom(true)
    setActionDelete(id)
  }
  return <React.Fragment>
    <List className={classes.list}>
      {data.map(({ _id, title, description, path }) => {
        return <React.Fragment key={_id}>
          <ListItem button >
            <ListItemAvatar>
              <Avatar alt='Profile Picture' src={noteImg} />
            </ListItemAvatar>
            <ListItemText primary={title} secondary={description} />
            <div className={classes.audio}>
              <Audio path={path} />
            </div>
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleModal({ _id, title, description, path })} edge='end' aria-label='edit'>
                <EditIcon />
              </IconButton>
              <IconButton edge='end' aria-label='delete' onClick={() => handleActionDelete(_id)} >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </React.Fragment>
      })}
    </List>
    <DialogConfirm
      close={() => setOpenCom(false)}
      confirm={() => deleteRecording(actionDelete)}
      title='Eliminar grabación'
      message='¿Quieres eliminar la grabación?'
      open={openComfirm} />
  </React.Fragment>
}

export default ListRecording
