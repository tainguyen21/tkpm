import axios from 'axios'
import { store } from '@Configs'

const clientRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

clientRequest.interceptors.request.use(
  (config) => {
    const auth = store.getState().auth
    const accessToken = auth.accessToken

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export { clientRequest }
