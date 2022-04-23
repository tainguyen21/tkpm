import { BaseEntity } from '@Model'

export interface User extends BaseEntity {
  fullName?: string
  phone: string
  isBlacklist?: boolean
  isAdmin: boolean
  birthDate?: Date
  email?: string
}
