import type { PaginateData } from "./base"
import type { Category } from "./category"
import type { Community } from "./community"

export interface Participant {
  id: number
  name: string
  nik: string
  birth_date: string // format YYYY-MM-DD
  gender: "L" | "P" // L = Laki-laki, P = Perempuan
  community: Community
  category: Category
  no_target: string | null
  created_at: string // ISO datetime string
  updated_at: string // ISO datetime string
}

export type Participants = Participant[];

export type ParticipantsResponse = PaginateData<Participant, 'participants'> & {
  message: string;
  status: number;
};
