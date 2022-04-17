import { yupResolver } from '@hookform/resolvers/yup'
import { User } from '@Model'
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface UserFormProps {
  type: 'ADD' | 'UPDATE'
  onSubmit: (data: User) => any
  user?: User
}

const CONFIGS = {
  ADD: {
    title: 'Thêm người dùng',
    submitBtn: 'Thêm',
  },
  UPDATE: {
    title: 'Cập nhật người dùng',
    submitBtn: 'Cập nhật',
  },
}

export default function UserForm(props: UserFormProps) {
  const { type, onSubmit, user } = props

  const schema = yup.object({
    fullName: yup.string(),
    phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    isBlacklist: yup.boolean(),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      fullName: type === 'UPDATE' && user ? user.fullName : '',
      phone: type === 'UPDATE' && user ? user.phone : '',
      isBlacklist: type === 'UPDATE' && user ? user.isBlacklist : false,
    },
    resolver: yupResolver(schema),
  })

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& .MuiFormControl-root': {
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
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            fullWidth
            label="Tên"
            variant="outlined"
            {...field}
          />
        )}
      />
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
        name="isBlacklist"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label="Danh sách đen"
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

      <Box textAlign="center">
        <Button variant="contained" type="submit" sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}>
          {CONFIGS[type].submitBtn}
        </Button>
      </Box>
    </Box>
  )
}
