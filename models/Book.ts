import { Category, Language, Publisher } from '@Model'
import { BaseEntity } from './baseEntity'

export interface Book extends BaseEntity {
  name: string
  category: Category['_id'][] | Category[]
  publishDate: Date
  authorName: string
  description: string
  stock: number
  language: Language['_id'] | Language
  publisher: Publisher['_id'] | Publisher
  url: string
}
