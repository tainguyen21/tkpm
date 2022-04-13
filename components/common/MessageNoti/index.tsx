import { Alert, Snackbar } from '@mui/material'
import * as React from 'react'

export interface MessageNotiProps {
  open: boolean
  duration?: number
  onClose?: () => any
  message: string
  type?: 'error' | 'info' | 'success' | 'warning'
  position?: {
    vertical: 'top' | 'bottom'
    horizontal: 'center' | 'left' | 'right'
  }
}

export default function MessageNoti(props: MessageNotiProps) {
  const {
    open = false,
    duration = 3000,
    onClose = () => {},
    message = '',
    type = 'success',
    position = {
      vertical: 'top',
      horizontal: 'center',
    },
  } = props

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={position}
      sx={{
        '& .MuiPaper-root': {
          alignItems: 'center',
        },
      }}
    >
      <Alert severity={type} sx={{ fontSize: '1.4rem' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
