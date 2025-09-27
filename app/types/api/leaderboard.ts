import type { PaginateData } from "./base";

export interface LeaderboardItem {
  participant_id: number | string;
  participant_name: string;
  total_score: number;
  total_sandang2: number;
  total_sandang3: number;
  total_sandang4: number;
  total_molo: number;
  total_neck: number;
  total_body: number;
  total_buttock: number;
  ranking: number;
}

export type Leaderboard = LeaderboardItem[];

export type LeaderboardsResponse = PaginateData<LeaderboardItem, 'leaderboard'> & {
  message: string;
  status: number;
};
