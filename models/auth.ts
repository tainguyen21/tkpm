import { BaseEntity } from './baseEntity'

export type Auth = BaseEntity & {
  fullName?: string
  phone: string
  password: string
  isAdmin: boolean
  accessToken: string
}
