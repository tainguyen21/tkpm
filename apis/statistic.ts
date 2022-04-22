import { clientRequest } from '@Configs'

export const getBookOrdered = (params: any = {}) => {
  return clientRequest.get('/api/orders/statistic', { params })
}

export const getBookStatistic = (params: any = {}) => {
  return clientRequest.get('/api/statistic/books', { params })
}

export const getUserStatistic = (params: any = {}) => {
  return clientRequest.get('/api/statistic/users', { params })
}
