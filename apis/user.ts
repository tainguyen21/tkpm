import { clientRequest } from '@Configs'
import { User } from '@Model'

export const getUsers = () => {
  return clientRequest.get('/api/users')
}

export const updateUser = (id: User['_id'], data: User) => {
  return clientRequest.put(`/api/users/${id}`, data)
}

export const deleteUser = (id: User['_id']) => {
  return clientRequest.delete(`/api/users/${id}`)
}
