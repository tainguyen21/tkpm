import { AppBar, Button, Container, Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { ROUTES } from './routes'

export default function HeaderAdmin() {
  return (
    <AppBar position="relative" sx={{ height: '100%', backgroundColor: 'primary.dark' }}>
      <Container>
        <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={2} py={2}>
          {ROUTES.map((route) => (
            <Link href={route.path} key={route.path} passHref>
              <MuiLink>
                <Button variant="contained">{route.text}</Button>
              </MuiLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </AppBar>
  )
}
