<template>
  <teleport v-if="isPopup && user?.email_verified_at == null" to="body">
    <div class="fixed inset-0 z-[100] bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
      <div class="relative w-full max-w-sm mx-8 bg-white rounded-sm p-4 text-center">
        <!-- GAMBAR -->
        <NuxtImg src="/images/mail.svg" alt="popup" class="size-[100px] mx-auto" />
        <!-- TOMBOL CLOSE -->
        <div
          class="absolute -top-3 -right-3 shadow-xl border bg-white rounded-full size-8 flex items-center justify-center p-1 cursor-pointer"
          @click="closePopup"
        >
          <Icon name="line-md:close" class="text-2xl cursor-pointer text-red-500" />
        </div>

        <!-- TITTLE -->
        <div class="pt-4 flex flex-col gap-4">
          <h4 class="text-lg font-bold font-nunito-sans">Hai {{ user?.name }},</h4>
          <p class="text-sm font-nunito-sans text-center">Verifikasi email Anda lewat tautan yang dikirim ke <span class="font-bold">{{ user?.email }}</span>  </p>

          <Button type="button" variant="outline-primary" class="w-full" @click="verify">Kirim Ulang Verifikasi</Button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">

const authStore = useAuthStore();
const isPopup = ref(true);

// Ambil data user dari store
const user = computed(() => authStore.user);

// Jalankan logika untuk memuat data pengguna
onMounted(() => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
});

const closePopup = () => {
  isPopup.value = false
};

const loadingStore = useLoadingStore();

const verify = async () => {
  loadingStore.isLoading = true
	try {
    const response = await apiLakumanah.post(urlAuthVerifyMail, {});

		const { message } = response;
		notify.success(message);

	} catch (error) {
		handleValidationError(error)
		// Handle error (bisa tambahkan toast/notification)
	} finally {
    loadingStore.isLoading = false
  }
};
</script>
