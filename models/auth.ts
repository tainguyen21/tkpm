import { User } from '@Model'

export interface Auth extends User {
  accessToken: string
}
