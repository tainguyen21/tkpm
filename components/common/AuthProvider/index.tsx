import { LayoutProps } from '@Model'
import { useAppSelector } from 'hooks'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useEffect } from 'react'

export function AuthProvider({ children }: LayoutProps) {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)

  const pathName = router.pathname.slice(1).split('/')

  // useEffect(() => {
  //   if (pathName[0] === 'admin' && !auth.isAdmin) router.push('/')
  // })

  // if (pathName[0] === 'admin' && !auth.isAdmin) return null

  return <div>{children}</div>
}
