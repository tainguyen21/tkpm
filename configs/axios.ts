import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectAllAuths } from 'redux/auth'

const clientRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

axios.interceptors.request.use(
  (config) => {
    const auth = useSelector(selectAllAuths)
    const accessToken = auth[0].accessToken

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export { clientRequest }
