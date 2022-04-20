import { yupResolver } from '@hookform/resolvers/yup'
import { Book, Category, Language, Publisher } from '@Model'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
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

export interface BookFilterProps {
  onSubmit: (data: Book) => any
  category: Category[]
  language: Language[]
  publisher: Publisher[]
}

export default function BookFilter(props: BookFilterProps) {
  const { onSubmit, category = [], language = [], publisher = [] } = props

  const schema = yup.object({
    name: yup.string(),
    category: yup.array(),
    publishDate: yup.date(),
    authorName: yup.string(),
    description: yup.string(),
    language: yup.string(),
    publisher: yup.string(),
  })

  const { handleSubmit, control } = useForm<Book>({
    defaultValues: {
      name: '',
      category: [],
      publishDate: undefined,
      authorName: '',
      description: '',
      language: '',
      publisher: '',
    },
    resolver: yupResolver(schema),
  })

  return (
    <Grid
      spacing={4}
      component="form"
      container
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& .MuiFormControl-root': {
          '&:not(:last-child)': {
            marginBottom: (theme) => theme.spacing(3),
          },
        },
      }}
    >
      <Grid item xs={3}>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
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
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField fullWidth label="Tên" variant="outlined" {...field} />}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="publishDate"
              control={control}
              render={({ field }) => (
                <Box
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
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="authorName"
              control={control}
              render={({ field }) => <TextField fullWidth label="Tên tác giả" variant="outlined" {...field} />}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <TextField multiline fullWidth label="Mô tả" variant="outlined" {...field} />}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
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
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="publisher"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="publisher-label">Nhà xuất bản</InputLabel>
                  <Select labelId="publisher-label" id="publisher-select" label="Nhà xuất bản" {...field}>
                    {publisher.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button
            variant="contained"
            type="submit"
            sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}
          >
            Tìm kiếm
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}
