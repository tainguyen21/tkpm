import Footer from '@Components/common/Footer'
import Header from '@Components/common/Header'
import { LayoutProps } from '@Model'
import { Box, Stack } from '@mui/material'
import * as React from 'react'

export function MainLayout({ children }: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />

      <Box component="main" marginTop={10}>
        {children}
      </Box>

      <Footer />
    </Stack>
  )
}
