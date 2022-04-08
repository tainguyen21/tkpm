import Header from '@Components/common/Header'
import { LayoutProps } from '@Model'
import { Stack } from '@mui/material'
import * as React from 'react'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />
      {children}
    </Stack>
  )
}
