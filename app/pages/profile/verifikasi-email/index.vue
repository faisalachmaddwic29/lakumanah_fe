<template>
  <div class="w-full text-center p-4">
    <NuxtImg src="/images/mail.svg" alt="popup" class="size-[100px] mx-auto" />

    <!-- TITTLE -->
    <div class="pt-4 flex flex-col gap-4">
      <h4 class="text-lg font-bold font-nunito-sans">Hai {{ user?.name }},</h4>
      <p class="text-sm font-nunito-sans text-center">Verifikasi email Anda lewat tautan yang dikirim ke <span class="font-bold">{{ user?.email }}</span>  </p>

      <Button type="button" variant="outline-primary" class="w-full" @click="verify">Kirim Ulang Verifikasi</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>

const title = 'Verifikasi Email';

definePageMeta({
	layout: 'detail',
	isPaddingTop: true,
	isPaddingBottom: true,
	title: title,
})

useSeoMeta({
	title: title
});


const authStore = useAuthStore();

// Ambil data user dari store
const user = computed(() => authStore.user);

// Jalankan logika untuk memuat data pengguna
onMounted(() => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
});


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
