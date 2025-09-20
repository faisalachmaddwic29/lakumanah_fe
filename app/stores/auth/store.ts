import { defineStore } from "pinia";
import { useCookie, navigateTo } from "#app";
import type { AuthToken, User } from "~/types/api";
import { cookieName, cookieUser, urlAuthLogout, urlAuthProfile } from "~/constants";
import type { UserResponse } from "~/types/auth/user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "" as string,
    expiresIn: 0 as number,
    tokenType: "" as string,
    user: null as User | null,
    isHydrated: false,
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.accessToken && Date.now() < state.expiresIn),
    authHeader: (state) => state.accessToken ? `${state.tokenType} ${state.accessToken}` : "",
    isTokenExpired: (state) => state.expiresIn ? Date.now() > state.expiresIn : false,
  },

  actions: {
    async saveToken(data: AuthToken) {
      const expirationTimestamp = Date.now() + data.expires_in * 1000;

      const appAuth = useCookie<{
        access_token: string;
        expires_in: number;
        token_type: string;
      }>(cookieName, {
        maxAge: data.expires_in,
        secure: process.env.NUXT_ENV_MODE === "production",
        sameSite: "strict",
      });

      appAuth.value = {
        access_token: data.access_token,
        expires_in: expirationTimestamp,
        token_type: data.token_type,
      };

      this.accessToken = data.access_token;
      this.expiresIn = expirationTimestamp;
      this.tokenType = data.token_type;
      this.user = data.user ?? null;

      await this.getProfile();
    },

    loadToken() {
      const cookie = useCookie<{
        access_token: string;
        expires_in: number;
        token_type: string;
      } | null>(cookieName);

      if (cookie.value) {
        this.accessToken = cookie.value.access_token;
        this.expiresIn = cookie.value.expires_in;
        this.tokenType = cookie.value.token_type;
      }
    },

    async logout(options: { redirectTo?: string; callApi?: boolean } = {}) {
      const loadingStore = useLoadingStore();
      try {
        loadingStore.start();
        if (options.callApi && this.accessToken) {
          const response = await apiLakumanah.post(urlAuthLogout, {});
          notify.success(response.message ?? "-");
        }
      } catch (error) {
        console.error("Logout API error:", error);
      } finally {
        loadingStore.stop();
        this.clearAuthData();
        await navigateTo(options.redirectTo || "/auth");
      }
    },

    async getProfile() {
      const loadingStore = useLoadingStore();
      try {
        loadingStore.start();
        const response = await apiLakumanah.get<UserResponse>(urlAuthProfile);
        this.setUser(response.data?.user ?? null);
      } catch (error) {
        console.error("Get Profile API error:", error);
      } finally {
        loadingStore.stop();
      }
    },

    setUser(user: User | null) {
      this.user = user;
      const userCookie = useCookie<User | null>(cookieUser, {
        maxAge: Math.floor((this.expiresIn - Date.now()) / 1000),
        secure: process.env.NUXT_ENV_MODE === "production",
        sameSite: "strict",
      });
      userCookie.value = user;
    },

    getUser() {
      const userCookie = useCookie<User | null>(cookieUser);
      this.user = userCookie.value ?? null;
      return this.user;
    },

    clearAuthData() {
      useCookie(cookieName).value = null;
      useCookie(cookieUser).value = null;
      this.accessToken = "";
      this.expiresIn = 0;
      this.tokenType = "";
      this.user = null;
      this.isHydrated = false
    },

    async refreshToken() {
      try {
        // TODO: implement refresh token
        return true;
      } catch (error) {
        console.error("Token refresh failed:", error);
        await this.logout({ redirectTo: "/auth" });
        return false;
      }
    },

    checkTokenExpiration() {
      if (this.isTokenExpired) {
        this.logout({ redirectTo: "/auth" });
      }
    },

    async hydrate() {
      if (this.isHydrated) return;

      // step 1: ambil token dari cookie
      this.loadToken();

      // step 2: kalau ada token baru fetch profile
      if (this.accessToken) {
        try {
          await this.getProfile();
        } catch (err) {
          console.error("Hydrate profile error:", err);
          this.clearAuthData(); // token invalid → clear
        }
      }

      // step 3: tandain hydrated
      this.isHydrated = true;
    }
  },
});
