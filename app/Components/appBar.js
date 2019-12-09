import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50,
    height: '100vh'
  },
  appBar: {
    top: 'auto',
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto'
  }
}))

export default function BottomAppBar ({ children, handleModal }) {
  const classes = useStyles()

  return (
    <div>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant='h5' gutterBottom>
          Recordings
        </Typography>
        { children }
      </Paper>
      <AppBar position='fixed' color='primary' className={classes.appBar}>
        <Toolbar>
          <Fab color='secondary' aria-label='add' className={classes.fabButton} onClick={() => handleModal(true)}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </div>
  )
}
