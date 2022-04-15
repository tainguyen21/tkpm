import { clientRequest } from '@Configs'
import { Book } from '@Model'

export const getBooks = () => {
  return clientRequest.get('/api/books')
}

export const createBook = (data: Book) => {
  return clientRequest.post('/api/books', data)
}

export const updateBook = (id: Book['_id'], data: Book) => {
  return clientRequest.put(`/api/books/${id}`, data)
}

export const deleteBook = (id: Book['_id']) => {
  return clientRequest.delete(`/api/books/${id}`)
}
