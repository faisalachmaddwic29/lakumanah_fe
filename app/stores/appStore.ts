import { defineStore } from 'pinia'
import type { Categories, CategoriesResponse, Community, CommunityResponse, Locations, LocationsResponse } from '~/types/api';

export const useAppStore = defineStore("app", {
  state: () => ({
    community: null as Community | null,
    locations: [] as Locations,
    categories: [] as Categories,
    isCommunityLoaded: false,
    isLocationsLoaded: false,
    isCategoriesLoaded: false,
  }),
  actions: {
    async fetchCommunity() {
      if (this.isCommunityLoaded) return;

      try {
        const { data } = await apiLakumanah.get<CommunityResponse>(urlApiCommunity);
        this.community = data?.community ?? [];
      } catch (error: unknown) {
        this.community = null;
        console.error(error);
      } finally {
        this.isCommunityLoaded = true;
      }
    },
    async fetchLocations() {
      if (this.isLocationsLoaded) return;

      const { data } = await apiLakumanah.get<LocationsResponse>(urlApiLocations);
      this.locations = data?.locations ?? [];
      this.isLocationsLoaded = true;
    },
    async fetchCategories() {
      if (this.isCategoriesLoaded) return;

      const { data } = await apiLakumanah.get<CategoriesResponse>(urlApiCategories);
      this.categories = data?.categories ?? [];
      this.isCategoriesLoaded = true;
    },
    // Optional reset, useful for full refresh / logout
    reset() {
      this.community = null;
      this.locations = [];
      this.categories = [];
      this.isCommunityLoaded = false;
      this.isLocationsLoaded = false;
      this.isCategoriesLoaded = false;

    }
  },
});
