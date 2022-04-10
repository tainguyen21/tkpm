import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface AuthFormProps {
  type: 'LOGIN' | 'REGISTER'
  onSubmit: (data: AuthFormData) => any
}

export interface AuthFormData {
  phone: string
  password: string
  confirmPassword?: string
}

const CONFIGS = {
  LOGIN: {
    title: 'WELCOME TO TKPM',
    submitBtn: 'Đăng nhập',
  },
  REGISTER: {
    title: 'WELCOME TO TKPM',
    submitBtn: 'Đăng ký',
  },
}

export default function AuthForm(props: AuthFormProps) {
  const { type } = props

  const { handleSubmit, control } = useForm<AuthFormData>({
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const _onSubmit = (data: AuthFormData) => console.log(data)

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(_onSubmit)}
      sx={{
        '& .MuiTextField-root': {
          '&:not(:last-child)': {
            marginBottom: (theme) => theme.spacing(3),
          },
        },
      }}
    >
      <Typography variant="h3" component="h1" sx={{ marginBottom: (theme) => theme.spacing(3) }} textAlign="center">
        {CONFIGS[type].title}
      </Typography>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => <TextField fullWidth label="Số điện thoại" variant="outlined" {...field} />}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => <TextField fullWidth label="Mật khẩu" variant="outlined" {...field} />}
      />
      {type === 'REGISTER' && (
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => <TextField fullWidth label="Xác nhận mật khẩu" variant="outlined" {...field} />}
        />
      )}

      <Box textAlign="center">
        <Button
          variant="contained"
          component="div"
          sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              color: 'inherit',
              padding: 0,
              cursor: 'inherit',
            }}
          >
            {CONFIGS[type].submitBtn}
          </button>
        </Button>
      </Box>
    </Box>
  )
}
