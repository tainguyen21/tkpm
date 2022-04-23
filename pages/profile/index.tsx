import MessageNoti from '@Components/common/MessageNoti'
import { yupResolver } from '@hookform/resolvers/yup'
import { MainLayout } from '@Layouts'
import { NextPageWithLayout, User } from '@Model'
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material'
import { updateUser } from 'apis/user'
import { useAppDispatch, useAppSelector } from 'hooks'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { updateAuth } from 'redux/auth'
import * as yup from 'yup'
import CryptoJS from 'crypto-js'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { moment } from '@Configs'

export interface ProfilePageProps {}

const ProfilePage: NextPageWithLayout = (_: ProfilePageProps) => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  const [toastOpt, setToastOpt] = useState({
    open: false,
    message: '',
    type: 'success',
  })

  const schema = yup.object({
    fullName: yup.string(),
    email: yup.string().email('Email không hợp lệ'),
    birthDate: yup.date(),
    phone: yup.string().matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    isBlacklist: yup.boolean(),
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      fullName: auth.accessToken ? auth.fullName : '',
      email: auth.accessToken ? auth.email : '',
      phone: auth.accessToken ? auth.phone : '',
      birthDate: auth.accessToken ? auth.birthDate : moment().toDate(),
      isBlacklist: auth.accessToken ? auth.isBlacklist : false,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: User) => {
    try {
      if (auth.accessToken) {
        const res = await updateUser(auth._id, data)

        dispatch(updateAuth(res.data))
        setToastOpt({
          open: true,
          type: 'success',
          message: 'Cập nhật thành công',
        })

        const hash = localStorage.getItem('auth')

        if (hash) {
          localStorage.removeItem('auth')

          const hash = CryptoJS.AES.encrypt(
            JSON.stringify({ ...res.data, accessToken: auth.accessToken }),
            process.env.NEXT_PUBLIC_SECRET_KEY!
          ).toString()

          localStorage.setItem('auth', hash)
        }
      }
    } catch (error: any) {
      setToastOpt({
        open: true,
        message: error.response?.data?.error?.message || 'Hệ thống đang bảo trì',
        type: 'error',
      })
    }
  }

  useEffect(() => {
    reset({
      fullName: auth.fullName || '',
      phone: auth.phone || '',
      isBlacklist: auth.isBlacklist ?? false,
      email: auth.email || '',
      birthDate: auth.birthDate || moment().toDate(),
    })
  }, [auth, reset])

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        maxWidth="500px"
        mx="auto"
        mt={4}
        sx={{
          '& .MuiFormControl-root': {
            '&:not(:last-child)': {
              marginBottom: (theme) => theme.spacing(3),
            },
          },
        }}
      >
        <Typography variant="h3" component="h1" sx={{ marginBottom: (theme) => theme.spacing(3) }} textAlign="center">
          Cập nhật thông tin
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
              disabled
              label="Số điện thoại"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              label="Email"
              variant="outlined"
              {...field}
            />
          )}
        />
        <Controller
          name="birthDate"
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
                  label="Ngày sinh"
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
              control={<Checkbox disabled {...field} checked={field.value} sx={{ transform: 'scale(1.5)' }} />}
            />
          )}
        />

        <Box textAlign="center" mt={3}>
          <Button
            variant="contained"
            type="submit"
            sx={{ fontWeight: 700, fontSize: '1.8rem', padding: '1.2rem 2rem' }}
          >
            Cập nhật
          </Button>
        </Box>
      </Box>
      <MessageNoti
        open={toastOpt.open}
        onClose={() => setToastOpt((state) => ({ ...state, open: false }))}
        message={toastOpt.message}
        type={toastOpt.type as any}
      />
    </>
  )
}

ProfilePage.Layout = MainLayout

export default ProfilePage
