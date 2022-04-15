import { clientRequest } from '@Configs'
import { Rule } from '@Model'

export const getRules = () => {
  return clientRequest.get('/api/rule')
}

export const createRule = (data: Rule) => {
  return clientRequest.post('/api/rule', data)
}

export const updateRule = (id: Rule['_id'], data: Rule) => {
  return clientRequest.put(`/api/rule/${id}`, data)
}

export const deleteRule = (id: Rule['_id']) => {
  return clientRequest.delete(`/api/rule/${id}`)
}
