import { yupResolver } from '@hookform/resolvers/yup'
import { Rule } from '@Model'
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface RuleFormProps {
  type: 'ADD' | 'UPDATE'
  onSubmit: (data: Rule) => any
  rule?: Rule
}

const CONFIGS = {
  ADD: {
    title: 'Thêm quy định',
    submitBtn: 'Thêm',
  },
  UPDATE: {
    title: 'Cập nhật quy định',
    submitBtn: 'Cập nhật',
  },
}

export default function RuleForm(props: RuleFormProps) {
  const { type, onSubmit, rule } = props

  const schema = yup.object({
    maxBook: yup.number().required('Vui lòng nhập số sách được mượn tối đa'),
    maxDate: yup.number().required('Vui lòng nhập số ngày mượn tối đa'),
    maxCardDate: yup.number().required('Vui lòng nhập hạn thẻ tối đa'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Rule>({
    defaultValues: {
      maxBook: type === 'UPDATE' && rule ? rule.maxBook : 0,
      maxDate: type === 'UPDATE' && rule ? rule.maxDate : 0,
      maxCardDate: type === 'UPDATE' && rule ? rule.maxCardDate : 0,
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
        name="maxBook"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.maxBook}
            helperText={errors.maxBook?.message}
            fullWidth
            label="Sách tối đa"
            variant="outlined"
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        name="maxDate"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.maxDate}
            helperText={errors.maxDate?.message}
            fullWidth
            label="Ngày tối đa"
            variant="outlined"
            type="number"
            {...field}
          />
        )}
      />
      <Controller
        name="maxCardDate"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.maxCardDate}
            helperText={errors.maxCardDate?.message}
            fullWidth
            label="Hạn thẻ"
            variant="outlined"
            type="number"
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
