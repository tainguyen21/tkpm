import { AppBar, Box, Button, Container, Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { ROUTES } from './routes'

export default function HeaderDesktop() {
  return (
    <Box display={{ xs: 'none', lg: 'block' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'primary.dark' }}>
        <Container>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} py={2} height={80}>
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
    </Box>
  )
}
