import { clientRequest } from '@Configs'
import { Card } from '@Model'

export const getCards = () => {
  return clientRequest.get('/api/card')
}

export const createCard = (data: Card) => {
  return clientRequest.post('/api/card', data)
}

export const updateCard = (id: Card['_id'], data: Card) => {
  return clientRequest.put(`/api/card/${id}`, data)
}

export const deleteCard = (id: Card['_id']) => {
  return clientRequest.delete(`/api/card/${id}`)
}
