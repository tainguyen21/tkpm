import AuthForm, { AuthFormData } from '@Components/common/AuthForm'
import { MainLayout } from '@Layouts'
import { NextPageWithLayout } from '@Model'
import { Box } from '@mui/material'
import * as React from 'react'

export interface RegisterPageProps {}

const RegisterPage: NextPageWithLayout = (_: RegisterPageProps) => {
  const _onSubmit = (data: AuthFormData) => console.log(data)

  return (
    <Box maxWidth={500} mx="auto" my={6}>
      <AuthForm type="REGISTER" onSubmit={_onSubmit} />
    </Box>
  )
}

RegisterPage.Layout = MainLayout

export default RegisterPage
