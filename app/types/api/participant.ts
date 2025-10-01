import type { PaginateData } from "./base"
import type { Category } from "./category"
import type { Community } from "./community"
import type { EventInfo } from "./event"

export interface Participant {
  id: number
  name: string
  nik: string | null
  birth_date: string // format YYYY-MM-DD
  gender: "L" | "P" // L = Laki-laki, P = Perempuan
  community: Community
  category: Category
  arrow_id: string | null
  created_at: string // ISO datetime string
  updated_at: string // ISO datetime string
}

export type Participants = Participant[];

export type ParticipantsResponse = PaginateData<Participant, 'participants'> & {
  message: string;
  status: number;
};

export type ScanResponse = {
  event_info: EventInfo;
  participant: Participant;
  message: string;
  status: number;
};
