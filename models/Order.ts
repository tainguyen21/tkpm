import { OrderDetail, User } from '@Model'
import { BaseEntity } from './baseEntity'

export const OrderStatusTranslate: { [key: string]: string } = {
  PENDING: 'Đang mượn',
  DONE: 'Đã trả',
  OVERDUE: 'Đã trả - Quá hạn',
}

export interface Order extends BaseEntity {
  user: User['_id'] | User
  expiredAt: Date
  status: 'PENDING' | 'DONE' | 'OVERDUE'
  details?: OrderDetail[]
}
