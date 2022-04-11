import AuthForm, { AuthFormData } from '@Components/common/AuthForm'
import { MainLayout } from '@Layouts'
import { NextPageWithLayout } from '@Model'
import { Alert, Box, Snackbar } from '@mui/material'
import { login } from 'apis/auth'
import { useAppDispatch } from 'hooks'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useState } from 'react'
import { addOneAuth, removeAllAuth } from 'redux/auth'

export interface LoginPageProps {}

const LoginPage: NextPageWithLayout = (_: LoginPageProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const _onSubmit = async (data: AuthFormData) => {
    try {
      const res = await login(data)

      console.log(res.data)

      dispatch(removeAllAuth())
      dispatch(
        addOneAuth({
          ...res.data.user,
          accessToken: res.data.accessToken,
        })
      )

      router.push('/')
    } catch (error: any) {
      setToastOpt((state) => ({
        ...state,
        open: true,
        message: error.response.data.error.message,
      }))
    }
  }

  const [toastOpt, setToastOpt] = useState({
    open: false,
    message: '123123123',
    duration: 3000,
  })

  return (
    <Box maxWidth={500} mx="auto" my={6}>
      <AuthForm type="LOGIN" onSubmit={_onSubmit} />
      <Snackbar
        open={toastOpt.open}
        autoHideDuration={toastOpt.duration}
        onClose={() => setToastOpt((state) => ({ ...state, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          '& .MuiPaper-root': {
            alignItems: 'center',
          },
        }}
      >
        <Alert severity="error" sx={{ fontSize: '1.4rem' }}>
          {toastOpt.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

LoginPage.Layout = MainLayout

export default LoginPage
