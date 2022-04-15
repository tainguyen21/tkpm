import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export interface AuthFormProps {
  type: 'LOGIN' | 'REGISTER'
  onSubmit: (data: AuthFormData) => any
}

export interface AuthFormData {
  phone: string
  password: string
  confirmPassword?: string
  rememberAuth: boolean
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
  const { type, onSubmit } = props

  const schema = yup.object({
    phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu ít nhât 8 ký tự'),
    confirmPassword:
      type === 'REGISTER'
        ? yup
            .string()
            .oneOf([yup.ref('password'), null], 'Mật khẩu không trùng khớp')
            .required('Vui lòng xác nhận mật khẩu')
        : yup.string().notRequired(),
    rememberAuth: yup.boolean(),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
      rememberAuth: false,
    },
    resolver: yupResolver(schema),
  })

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
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
        render={({ field }) => (
          <TextField
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
            label="Số điện thoại"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
            label="Mật khẩu"
            variant="outlined"
            type="password"
            {...field}
          />
        )}
      />
      {type === 'REGISTER' && (
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              fullWidth
              label="Xác nhận mật khẩu"
              variant="outlined"
              type="password"
              {...field}
            />
          )}
        />
      )}

      <Controller
        name="rememberAuth"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Ghi nhớ đăng nhập"
            sx={{
              paddingLeft: '1.2rem',
              '& .MuiTypography-root': {
                fontSize: '1.6rem',
              },
            }}
            control={<Checkbox {...field} checked={field.value} sx={{ transform: 'scale(1.5)' }} />}
          />
        )}
      />

      <Box textAlign="center" mt={3}>
        <Button variant="contained" type="submit" sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}>
          {CONFIGS[type].submitBtn}
        </Button>
      </Box>
    </Box>
  )
}
