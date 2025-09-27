export interface EventInfo {
  name: string;
  location: string;
  total_participant: number;
  date: string; // atau Date kalau mau parsing
}

export interface EventCategory {
  id: number | string;
  name: string;
  total_participant: number;
}


export type Rambahan = number[];

export type EventResponse = {
  event_info: EventInfo;
  rambahan: Rambahan;
  message: string;
  status: number;
};


export type EventCategories = EventCategory[];

export type EventLeaderboardResponse = {
  event_info: EventInfo;
  categories: EventCategories;
  message: string;
  status: number;
};
