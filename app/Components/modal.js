import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const Modal = ({ open, onClose, submit, children, title = '' }) => {
  return <div>
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cerrar
        </Button>
        <Button onClick={submit} color='primary'>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  </div>
}

export default Modal
