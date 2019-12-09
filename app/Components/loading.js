import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20%',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}))
const Loading = () => {
  const classes = useStyles()
  return <div className={classes.root}>
    <CircularProgress disableShrink />
  </div>
}

export default Loading
