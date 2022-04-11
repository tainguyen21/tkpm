import { AuthFormData } from '@Components/common/AuthForm'
import { clientRequest } from '@Configs'

export const login = async (data: AuthFormData) => {
  return clientRequest.post('/api/login', data)
}

export const register = async (data: AuthFormData) => {
  return clientRequest.post('/api/register', data)
}
