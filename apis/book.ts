import { clientRequest } from '@Configs'

export const getBooks = () => {
  return clientRequest.get('/api/books')
}

export const getBook = () => {
  return clientRequest.post('/api/books/:id')
}
