import { BaseEntity } from '@Model'

export type User = BaseEntity & {
  fullName?: string
  phone: string
  isAdmin: boolean
}
