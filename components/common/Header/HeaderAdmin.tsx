import { AppBar, Container, Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { ROUTES_ADMIN } from './routesAdmin'

export default function HeaderAdmin() {
  return (
    <AppBar position="relative" sx={{ height: '100%', backgroundColor: '#eee' }}>
      <Container>
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" py={2}>
          {ROUTES_ADMIN.map((route) => (
            <Link href={route.path} key={route.path} passHref>
              <MuiLink mb={4} sx={{ display: 'inline-block' }}>
                {route.text}
              </MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </AppBar>
  )
}
