import { Box, Container, Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { ROUTES } from './routes'

export default function HeaderDesktop() {
  return (
    <Box display={{ xs: 'none', lg: 'block' }}>
      <Container>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} py={2}>
          {ROUTES.map((route) => (
            <Link href={route.path} key={route.path} passHref>
              <MuiLink>{route.text}</MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}
