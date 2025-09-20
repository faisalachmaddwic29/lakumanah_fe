import type { Location } from "./location";

import type { User } from "./user";

export interface Community {
  id: number;
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  user: User;
  total_participants: string | number;
  location: Location;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}


export type CommunityResponse = {
  community: Community
  message: string;
  status: number;
};
