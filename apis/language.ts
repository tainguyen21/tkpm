import { clientRequest } from '@Configs'
import { Language } from '@Model'

export const getLanguages = () => {
  return clientRequest.get('/api/languages')
}

export const createLanguage = (data: Language) => {
  return clientRequest.post('/api/languages', data)
}

export const updateLanguage = (id: Language['_id'], data: Language) => {
  return clientRequest.put(`/api/languages/${id}`, data)
}

export const deleteLanguage = (id: Language['_id']) => {
  return clientRequest.delete(`/api/languages/${id}`)
}
