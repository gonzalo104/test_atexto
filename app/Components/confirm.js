import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'

export default function ResponsiveDialog (props) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        // onClose={props.close}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>{props.title || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.message || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close} color='secundary'>
            Cancelar
          </Button>
          <Button onClick={props.confirm} color='primary' autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
