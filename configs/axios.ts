import axios from 'axios'
import { useAppSelector } from 'hooks'

const clientRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axios.interceptors.request.use(
  (config) => {
    const auth = useAppSelector((state) => state.auth)
    const accessToken = auth.accessToken

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export { clientRequest }
