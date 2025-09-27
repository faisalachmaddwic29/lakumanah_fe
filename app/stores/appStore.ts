import { defineStore } from 'pinia'
import type { EventCategories, EventInfo, EventLeaderboardResponse, EventResponse, Rambahan } from '~/types/api';

export const useAppStore = defineStore("app", {
  state: () => ({
    eventInfo: null as EventInfo | null,
    eventRambahan: [] as Rambahan,
    leaderboardEventInfo: null as EventInfo | null,
    leaderboardCategories: [] as EventCategories,
    isEventLoaded: false,
    isLeaderboardLoaded: false,
  }),
  actions: {
    async fetchEvents() {
      if (this.isEventLoaded) return;

      try {
        const { data } = await apiLakumanah.get<EventResponse>(urlApiScoringRambahan);
        this.eventInfo = data?.event_info ?? null;
        this.eventRambahan = data?.rambahan ?? [];
      } catch (error: unknown) {
        this.eventInfo = null;
        this.eventRambahan = [];
        console.error(error);
      } finally {
        this.isEventLoaded = true;
      }
    },
    async fetchLeaderboards() {
      if (this.isLeaderboardLoaded) return;

      try {
        const { data } = await apiLakumanah.get<EventLeaderboardResponse>(urlApiLeaderboard);
        this.leaderboardEventInfo = data?.event_info ?? null;
        this.leaderboardCategories = data?.categories ?? [];
      } catch (error: unknown) {
        this.leaderboardEventInfo = null;
        this.leaderboardCategories = [];
        console.error(error);
      } finally {
        this.isLeaderboardLoaded = true;
      }
    },
    // Optional reset, useful for full refresh / logout
    reset() {
      this.eventInfo = null;
      this.eventRambahan = [];
      this.leaderboardEventInfo = null;
      this.leaderboardCategories = [];
      this.isEventLoaded = false;
      this.isLeaderboardLoaded = false;

    }
  },
});
