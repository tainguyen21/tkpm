import { OrderDetail } from './../models/OrderDetail'
import { clientRequest } from '@Configs'
import { Order } from '@Model'
import { OrderFormData } from '@Components/OrderForm'

export const getOrders = () => {
  return clientRequest.get('/api/orders')
}

export const createOrder = (data: OrderFormData) => {
  return clientRequest.post('/api/orders', data)
}

export const updateOrder = (id: Order['_id'], data: OrderFormData) => {
  return clientRequest.put(`/api/orders/${id}`, data)
}

export const doneOrderDetail = (id: Order['_id'], detailId: OrderDetail['_id']) => {
  return clientRequest.put(`/api/orders/${id}/detail/${detailId}`)
}
