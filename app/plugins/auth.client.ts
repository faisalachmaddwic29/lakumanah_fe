export default defineNuxtPlugin(async () => {
  if (import.meta.server) return;

  const auth = useAuthStore();
  await auth.hydrate(); // aman, cuma sekali
});
