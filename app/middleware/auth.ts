// Protect private pages
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (import.meta.server) return // cegah loop SSR

  if (!authStore.isHydrated) return // jangan redirect sebelum store siap

  if (!authStore.isLoggedIn || authStore.isTokenExpired) {
    return navigateTo({
      path: "/auth",
      query: { redirect: to.fullPath }, // biar abis login balik lagi
    })
  }
})
