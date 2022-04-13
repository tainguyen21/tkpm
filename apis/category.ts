import { Category } from './../models/Category'
import { clientRequest } from '@Configs'

export const getCategories = () => {
  return clientRequest.get('/api/categories')
}

export const createCategory = (data: Category) => {
  return clientRequest.post('/api/categories', data)
}

export const updateCategory = (id: Category['_id'], data: Category) => {
  return clientRequest.put(`/api/categories/${id}`, data)
}

export const deleteCategory = (id: Category['_id']) => {
  return clientRequest.delete(`/api/categories/${id}`)
}
