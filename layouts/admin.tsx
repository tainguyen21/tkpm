import HeaderAdmin from '@Components/common/Header/HeaderAdmin'
import { LayoutProps } from '@Model'
import { Box } from '@mui/material'
import * as React from 'react'

export function AdminLayout({ children }: LayoutProps) {
  return (
    <Box>
      <Box position="fixed" width="300px" height="100vh">
        <HeaderAdmin />
      </Box>

      <Box padding={3} marginLeft="300px">
        {children}
      </Box>
    </Box>
  )
}
