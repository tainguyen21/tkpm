import { Auth, LayoutProps } from '@Model'
import { useAppDispatch, useAppSelector } from 'hooks'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'
import { setAuth } from 'redux/auth'
import jwtDecode from 'jwt-decode'
import CryptoJS from 'crypto-js'

export function AuthProvider({ children }: LayoutProps) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const router = useRouter()

  const pathName = router.pathname

  useEffect(() => {
    const hash = localStorage.getItem('auth')

    console.log({ hash })

    if (hash) {
      const bytes = CryptoJS.AES.decrypt(hash, process.env.NEXT_PUBLIC_SECRET_KEY!)
      const text = bytes.toString(CryptoJS.enc.Utf8)

      const auth: Auth = JSON.parse(text)

      //Check expired token
      const accessToken = jwtDecode(auth.accessToken)

      //Expired
      if ((accessToken as any).exp < Date.now() / 1000) {
        localStorage.removeItem('auth')
      } else {
        dispatch(setAuth(auth))
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (pathName[0] === 'admin' && !auth.isAdmin) router.push('/')
  })

  if (pathName[0] === 'admin' && !auth.isAdmin) return null

  return <div>{children}</div>
}
