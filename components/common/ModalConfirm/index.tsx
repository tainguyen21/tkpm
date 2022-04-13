import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import * as React from 'react'

export interface ModalConfirmProps {
  open: boolean
  onClose: () => any
  onReject: () => any
  onConfirm: () => any
  title: string
  detail: string
  confirmText?: string
  cancelText?: string
  type?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

export default function ModalConfirm(props: ModalConfirmProps) {
  const {
    open = false,
    onClose,
    onConfirm,
    onReject,
    confirmText = 'Đồng ý',
    cancelText = 'Huỷ',
    title = '',
    detail = '',
    type = 'primary',
  } = props

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{detail}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject}>{cancelText}</Button>
        <Button onClick={onConfirm} variant="contained" color={type}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
