import { clientRequest } from '@Configs'
import { Publisher } from '@Model'

export const getPublishers = () => {
  return clientRequest.get('/api/publisher')
}

export const createPublisher = (data: Publisher) => {
  return clientRequest.post('/api/publisher', data)
}

export const updatePublisher = (id: Publisher['_id'], data: Publisher) => {
  return clientRequest.put(`/api/publisher/${id}`, data)
}

export const deletePublisher = (id: Publisher['_id']) => {
  return clientRequest.delete(`/api/publisher/${id}`)
}
