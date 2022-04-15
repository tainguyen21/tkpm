import { moment } from '@Configs'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, User } from '@Model'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface CardFormProps {
  type: 'ADD' | 'UPDATE'
  onSubmit: (data: Card) => any
  card?: Card
  users: User[]
}

const CONFIGS = {
  ADD: {
    title: 'Thêm thẻ người dùng',
    submitBtn: 'Thêm',
  },
  UPDATE: {
    title: 'Cập nhật thẻ người dùng',
    submitBtn: 'Cập nhật',
  },
}

export default function CardForm(props: CardFormProps) {
  const { type, onSubmit, card, users } = props

  const schema = yup.object({
    user: yup.string().required('Vui lòng chọn người dùng'),
    expiredAt: type === 'ADD' ? yup.date().notRequired() : yup.date().required('Vui lòng chọn ngày'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Card>({
    defaultValues: {
      user: type === 'UPDATE' && card ? (card.user as User)._id : '',
      expiredAt: type === 'UPDATE' && card ? card.expiredAt : moment().toDate(),
    },
    resolver: yupResolver(schema),
  })

  console.log({ users })

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
        name="user"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.user}>
            <InputLabel id="card-label" sx={{ fontSize: '1.4rem' }}>
              Người dùng
            </InputLabel>
            <Select disabled={type === 'UPDATE'} labelId="card-label" id="card-select" label="Người dùng" {...field}>
              {users.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {`${item.fullName || ''} ~ ${item.phone}`}
                </MenuItem>
              ))}
            </Select>

            {errors.user && <FormHelperText sx={{ fontSize: '1.4rem' }}>{(errors.user as any).message}</FormHelperText>}
          </FormControl>
        )}
      />

      {type === 'UPDATE' && (
        <Controller
          name="expiredAt"
          control={control}
          render={({ field }) => (
            <Box
              my={(theme) => theme.spacing(3)}
              sx={{
                '& .MuiFormControl-root': {
                  width: '100%',
                },

                '& .MuiOutlinedInput-input': {
                  fontSize: '1.6rem',
                },
              }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Ngày hết hạn"
                  inputFormat="DD/MM/YYYY"
                  {...field}
                  PaperProps={{
                    sx: {
                      '& .MuiButtonBase-root': {
                        fontSize: '1.4rem',
                      },
                    },
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          )}
        />
      )}

      <Box textAlign="center" mt={3}>
        <Button variant="contained" type="submit" sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}>
          {CONFIGS[type].submitBtn}
        </Button>
      </Box>
    </Box>
  )
}
