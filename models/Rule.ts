import { BaseEntity } from '@Model'

export interface Rule extends BaseEntity {
  maxBook: number
  maxDate: number
  maxCardDate: number
}
