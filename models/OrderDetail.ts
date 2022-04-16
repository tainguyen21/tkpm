import { Book } from '@Model'
import { BaseEntity } from './baseEntity'

export const OrderDetailStatusTranslate: { [key: string]: string } = {
  PENDING: 'Đang mượn',
  DONE: 'Đã trả',
}

export interface OrderDetail extends BaseEntity {
  book: Book['_id'] | Book
  status: 'PENDING' | 'DONE'
  receivedDate?: Date
}
