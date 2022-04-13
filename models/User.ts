import { BaseEntity } from '@Model'

export interface User extends BaseEntity {
  fullName?: string
  phone: string
  isAdmin: boolean
}
