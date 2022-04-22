import { moment } from '@Configs'
import { yupResolver } from '@hookform/resolvers/yup'
import { Book, Order, OrderDetail, User } from '@Model'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface OrderFormProps {
  type: 'ADD' | 'UPDATE'
  onSubmit: (data: OrderFormData) => any
  order?: Order
  users: User[]
  books: Book[]
  onDetailDone: (detailId: OrderDetail['_id']) => any
}

export interface OrderFormData {
  user: User['_id']
  books: Book['_id'][]
  expiredAt?: Date
}

const CONFIGS = {
  ADD: {
    title: 'Thêm phiếu mượn',
    submitBtn: 'Thêm',
  },
  UPDATE: {
    title: 'Cập nhật phiếu mượn',
    submitBtn: 'Cập nhật',
  },
}

export default function OrderForm(props: OrderFormProps) {
  const { type, onSubmit, order, users, books, onDetailDone } = props

  const schema = yup.object({
    user: yup.string().required('Vui lòng chọn người dùng'),
    books: yup.array().min(1, 'Vui lòng chọn sách'),
    expiredAt: type === 'UPDATE' ? yup.date().required('Vui lòng chọn ngày') : yup.date().notRequired(),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      user: type === 'UPDATE' && order ? (order.user as User)?._id : '',
      books: type === 'UPDATE' && order ? order.details?.map((item) => (item.book as Book)?._id) : [],
      expiredAt: type === 'UPDATE' && order ? order.expiredAt : moment().toDate(),
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
        name="user"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.user}>
            <InputLabel id="user-label" sx={{ fontSize: '1.4rem' }}>
              Người dùng
            </InputLabel>
            <Select disabled={type === 'UPDATE'} labelId="user-label" id="user-select" label="Ngôn ngữ" {...field}>
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
      <Controller
        name="books"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.books}>
            <Typography component="p" fontSize="1.6rem" sx={{ marginBottom: '1rem' }}>
              Sách
            </Typography>
            {books.map((book) => (
              <FormControlLabel
                key={book._id}
                label={book.name}
                sx={{
                  paddingLeft: '0.8rem',
                  '& .MuiCheckbox-root': {
                    transform: 'scale(1.5)',
                  },

                  '& .MuiTypography-root': {
                    fontSize: '1.6rem',
                  },
                }}
                control={
                  <Checkbox
                    value={book._id}
                    checked={field.value.includes(book._id as any)}
                    disabled={type === 'UPDATE'}
                    onChange={(event, checked) => {
                      if (checked) {
                        field.onChange([...field.value, event.target.value])
                      } else {
                        field.onChange((field.value as any).filter((value: string) => value !== event.target.value))
                      }
                    }}
                  />
                }
              />
            ))}

            {errors.books && (
              <FormHelperText sx={{ fontSize: '1.4rem' }}>{(errors.books as any).message}</FormHelperText>
            )}
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

      {type === 'UPDATE' && order && (
        <Box mb={3}>
          <Typography component="h3" fontSize="1.6rem">
            Chi tiết (Tên sách - ngày trả)
          </Typography>
          {order.details?.map((item) => (
            <Stack
              key={item._id}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#eee"
              sx={{ borderRadius: '0.8rem' }}
              mt={2}
              padding={1}
            >
              <Typography component="span" fontSize="1.4rem">
                {(item.book as Book)?.name}
              </Typography>

              {item.status === 'PENDING' ? (
                <Button onClick={() => onDetailDone(item._id)}>Cập nhật đã trả</Button>
              ) : (
                // <DoneIcon fontSize="large" color="success" />
                <Typography component="span" fontSize="1.4rem">
                  {moment(item.receivedDate).format('DD/MM/YYY')}
                </Typography>
              )}
            </Stack>
          ))}
        </Box>
      )}

      <Box textAlign="center">
        <Button variant="contained" type="submit" sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}>
          {CONFIGS[type].submitBtn}
        </Button>
      </Box>
    </Box>
  )
}
