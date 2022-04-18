import { AppBar, Box, Container, Link as MuiLink, Stack, Typography } from '@mui/material'
import { useAppSelector } from 'hooks'
import Link from 'next/link'
import * as React from 'react'
import Logo from '@Publics/logo.png'
import Image from 'next/image'

export default function HeaderDesktop() {
  const auth = useAppSelector((state) => state.auth)

  return (
    <Box display={{ xs: 'none', lg: 'block' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
        <Container>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} py={2} height={80}>
            <Link href="/">
              <a>
                <Image src={Logo} alt="Logo" height={60} width={120} />
              </a>
            </Link>
            {auth.accessToken ? (
              <Box>
                <Link href="/profile" passHref>
                  <MuiLink sx={{ display: 'inline-block' }} mx={3}>
                    Cập nhật thông tin
                  </MuiLink>
                </Link>
                <Link href="/orders" passHref>
                  <MuiLink sx={{ display: 'inline-block' }} mx={3}>
                    Quản lí mượn sách
                  </MuiLink>
                </Link>
                <Typography component="span" color="primary" fontSize="1.6rem" ml={3}>
                  {auth.fullName || auth.phone}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Link href="/login" passHref>
                  <MuiLink sx={{ display: 'inline-block' }} mx={3}>
                    Đăng nhập
                  </MuiLink>
                </Link>
                <Link href="/register" passHref>
                  <MuiLink sx={{ display: 'inline-block' }} mx={3}>
                    Đăng ký
                  </MuiLink>
                </Link>
              </Box>
            )}
          </Stack>
        </Container>
      </AppBar>
    </Box>
  )
}
