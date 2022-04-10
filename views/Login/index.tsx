import AuthForm, { AuthFormData } from '@Components/common/AuthForm'
import { MainLayout } from '@Layouts'
import { NextPageWithLayout } from '@Model'
import { Box } from '@mui/material'
import * as React from 'react'

export interface LoginPageProps {}

const LoginPage: NextPageWithLayout = (_: LoginPageProps) => {
  const _onSubmit = (data: AuthFormData) => console.log(data)

  return (
    <Box maxWidth={500} mx="auto" my={6}>
      <AuthForm type="LOGIN" onSubmit={_onSubmit} />
    </Box>
  )
}

LoginPage.Layout = MainLayout

export default LoginPage
