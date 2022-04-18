import { Auth, LayoutProps } from '@Model'
import CryptoJS from 'crypto-js'
import { useAppDispatch, useAppSelector } from 'hooks'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'
import { updateAuth } from 'redux/auth'

export function AuthProvider({ children }: LayoutProps) {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const router = useRouter()

  const pathName = router.pathname

  useEffect(() => {
    const hash = localStorage.getItem('auth')

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
        dispatch(updateAuth(auth))
      }
    }

    dispatch(updateAuth({ isLoaded: true }))
  }, [dispatch])

  useEffect(() => {
    if (pathName.slice(1).split('/')[0] === 'admin' && !auth.isAdmin && auth.isLoaded) router.push('/')
  })

  if (pathName.slice(1).split('/')[0] === 'admin' && !auth.isAdmin && auth.isLoaded) return null

  return <div>{children}</div>
}
