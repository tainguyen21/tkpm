import { LayoutProps } from '@Model'
import * as React from 'react'

export function AuthProvider({ children }: LayoutProps) {
  // useEffect(() => {
  //   if (pathName[0] === 'admin' && !auth.isAdmin) router.push('/')
  // })

  // if (pathName[0] === 'admin' && !auth.isAdmin) return null

  return <div>{children}</div>
}
