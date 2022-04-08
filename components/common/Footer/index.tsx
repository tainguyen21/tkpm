import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

export interface FooterProps {}

export default function Footer(_: FooterProps) {
  return (
    <Box component="footer" bgcolor="primary.dark" py={2} textAlign="center">
      <Typography variant="h4" component="h3" color="#fff">
        19CLC - TKPM
      </Typography>
    </Box>
  )
}
