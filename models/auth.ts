import { User } from '@Model'

export type Auth = User & {
  accessToken: string
}
