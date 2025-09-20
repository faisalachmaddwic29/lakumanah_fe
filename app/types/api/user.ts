export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  email_verified_at: string | null; // ISO date string
  phone_verified_at: string | null; // ISO date string
}
