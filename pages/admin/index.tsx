import { NextPageWithLayout } from '@Model'
import { useAppSelector } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HomeAdmin: NextPageWithLayout = () => {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (auth.isAdmin) router.push('/admin/books')
    else router.push('/')
  })

  return null
}

export default HomeAdmin
