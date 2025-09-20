import type { User } from "../api"


export interface TypeAuthToken {
  token?: string
  token_refresh?: string
  token_type?: string
  expires_at?: Date,
  user: User
}
