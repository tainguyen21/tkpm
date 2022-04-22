import { moment } from '@Configs'
import { yupResolver } from '@hookform/resolvers/yup'
import { Book, Category, Language, Publisher } from '@Model'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
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

export interface BookFormProps {
  type: 'ADD' | 'UPDATE'
  onSubmit: (data: Book) => any
  book?: Book
  category: Category[]
  language: Language[]
  publisher: Publisher[]
}

const CONFIGS = {
  ADD: {
    title: 'Thêm sách',
    submitBtn: 'Thêm',
  },
  UPDATE: {
    title: 'Cập nhật sách',
    submitBtn: 'Cập nhật',
  },
}

export default function BookForm(props: BookFormProps) {
  const { type, onSubmit, book, category, language, publisher } = props

  const schema = yup.object({
    name: yup.string().required('Vui lòng nhập tên'),
    category: yup.array().min(1, 'Vui lòng chọn loại'),
    publishDate: yup.date().required('Vui lòng nhập ngày xuất bản'),
    authorName: yup.string().required('Vui lòng nhập tên tác giả'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    stock: yup.number().required('Vui lòng nhập số lượng'),
    language: yup.string().required('Vui lòng chọn ngôn ngữ'),
    publisher: yup.string().required('Vui lòng chọn nhà xuất bản'),
    url: yup.string().required('Vui lòng thêm hình ảnh'),
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Book>({
    defaultValues: {
      name: type === 'UPDATE' && book ? book.name : '',
      url: type === 'UPDATE' && book ? book.url : '',
      category: type === 'UPDATE' && book ? (book.category as Category[]).map((item) => item._id) : [],
      publishDate: type === 'UPDATE' && book ? book.publishDate : moment().toDate(),
      authorName: type === 'UPDATE' && book ? book.authorName : '',
      description: type === 'UPDATE' && book ? book.description : '',
      stock: type === 'UPDATE' && book ? book.stock : 0,
      language: type === 'UPDATE' && book ? (book.language as Language)._id : '',
      publisher: type === 'UPDATE' && book ? (book.publisher as Publisher)._id : '',
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
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            label="Tên"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Controller
        name="url"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.url}
            helperText={errors.url?.message}
            fullWidth
            label="Hình ảnh"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.category}>
            <Typography component="p" fontSize="1.6rem" sx={{ marginBottom: '1rem' }}>
              Thể loại sách
            </Typography>
            {category.map((category) => (
              <FormControlLabel
                key={category._id}
                label={category.name}
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
                    value={category._id}
                    checked={field.value.includes(category._id as any)}
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

            {errors.category && (
              <FormHelperText sx={{ fontSize: '1.4rem' }}>{(errors.category as any).message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="publishDate"
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
                label="Ngày xuất bản"
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
      <Controller
        name="authorName"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.authorName}
            helperText={errors.authorName?.message}
            fullWidth
            label="Tên tác giả"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            multiline
            error={!!errors.description}
            helperText={errors.description?.message}
            fullWidth
            label="Mô tả"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Controller
        name="stock"
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors.stock}
            helperText={errors.stock?.message}
            fullWidth
            label="Số lượng"
            type="number"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.language}>
            <InputLabel id="language-label" sx={{ fontSize: '1.4rem' }}>
              Ngôn ngữ
            </InputLabel>
            <Select labelId="language-label" id="language-select" label="Ngôn ngữ" {...field}>
              {language.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>

            {errors.language && (
              <FormHelperText sx={{ fontSize: '1.4rem' }}>{(errors.language as any).message}</FormHelperText>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="publisher"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.publisher}>
            <InputLabel id="publisher-label">Nhà xuất bản</InputLabel>
            <Select labelId="publisher-label" id="publisher-select" label="Nhà xuất bản" {...field}>
              {publisher.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            {errors.publisher && (
              <FormHelperText sx={{ fontSize: '1.4rem' }}>{(errors.publisher as any).message}</FormHelperText>
            )}
          </FormControl>
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
