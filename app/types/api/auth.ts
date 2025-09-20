import type { User } from "./user";

export interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
  user?: User;
}
