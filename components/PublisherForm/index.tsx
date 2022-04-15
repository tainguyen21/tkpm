import { yupResolver } from '@hookform/resolvers/yup'
import { Publisher } from '@Model'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface PublisherFormProps {
  type: 'ADD' | 'UPDATE'
  onSubmit: (data: Publisher) => any
  publisher?: Publisher
}

const CONFIGS = {
  ADD: {
    title: 'Thêm nhà xuất bản',
    submitBtn: 'Thêm',
  },
  UPDATE: {
    title: 'Cập nhật nhà xuất bản',
    submitBtn: 'Cập nhật',
  },
}

export default function PublisherForm(props: PublisherFormProps) {
  const { type, onSubmit, publisher } = props

  const schema = yup.object({
    name: yup.string().required('Vui lòng nhập tên'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Publisher>({
    defaultValues: {
      name: type === 'UPDATE' && publisher ? publisher.name : '',
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
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            label="Tên loại"
            variant="outlined"
            {...field}
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
