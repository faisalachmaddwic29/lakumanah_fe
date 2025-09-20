// Protect guest pages (e.g. /auth)
export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (import.meta.server) return // cegah loop SSR

  if (!authStore.isHydrated) return // jangan redirect sebelum store siap

  if (authStore.isLoggedIn && !authStore.isTokenExpired) {
    return navigateTo("/") // setelah login, masuk ke home/dashboard
  }
})
