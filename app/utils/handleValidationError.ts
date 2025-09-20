// utils/errorHandler.ts
export function handleValidationError(
  error: any,
  setErrors?: (errors: Record<string, string>) => void
): void {
  const route = useRoute();

  if (error.code === 403 || error.code === 400) {
    if (Array.isArray(error?.message) && error.message.length === 0) {
      notify.error(error.errors[0].title);
    } else {
      notify.error(error.message);
    }
  }

  if (error.code === 401) {
    useAuthStore().clearAuthData();
    notify.error(error.message);
    if (route.path === '/login') {
      return;
    } else {
      navigateTo("/auth", { replace: true });
    }
  }

  if (error.code === 500 || error.code === 404) {
    notify.error(error.message);
  }

  if (error.code === 422 && Array.isArray(error.errors)) {
    const validationErrors: Record<string, string> = {};

    error.errors.forEach((err: any) => {
      const field = err.source?.pointer?.replace('/', '').replace('metadata/', '');
      if (field) {
        validationErrors[field] = err.detail;
      }
    });

    // ✅ kalau setErrors ada baru dipanggil
    if (setErrors) {
      setErrors(validationErrors);
    }
  } else {
    console.error('Unexpected error:', error);
  }
}
