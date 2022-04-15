import { User } from '@Model'
import { BaseEntity } from './baseEntity'

export interface Card extends BaseEntity {
  user: User['_id'] | User
  expiredAt: Date
}
