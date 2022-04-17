import { AppBar, Box, Button, Container, Link as MuiLink, Stack } from '@mui/material'
import { useAppSelector } from 'hooks'
import Link from 'next/link'
import * as React from 'react'

export default function HeaderDesktop() {
  const auth = useAppSelector((state) => state.auth)

  return (
    <Box display={{ xs: 'none', lg: 'block' }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'primary.dark' }}>
        <Container>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} py={2} height={80}>
            {auth.accessToken ? (
              <>
                <Button variant="contained">{auth.fullName || auth.phone}</Button>
                <Link href="/profile" passHref>
                  <MuiLink>
                    <Button variant="contained">Cập nhật thông tin</Button>
                  </MuiLink>
                </Link>
                <Link href="/orders" passHref>
                  <MuiLink>
                    <Button variant="contained">Quản lí mượn sách</Button>
                  </MuiLink>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <MuiLink>
                    <Button variant="contained">Đăng nhập</Button>
                  </MuiLink>
                </Link>
                <Link href="/register" passHref>
                  <MuiLink>
                    <Button variant="contained">Đăng ký</Button>
                  </MuiLink>
                </Link>
              </>
            )}
          </Stack>
        </Container>
      </AppBar>
    </Box>
  )
}
