<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8">

		<NuxtImg src="/images/auth/icon_expired.svg" alt="verification-email-failed" class="size-[200px]" />

		<div class="text-center pt-10 pb-8">
			<h5 class="text-sm md:text-base font-bold mt-5.5 mb-2.5">Email Anda gagal diverifikasi.</h5>
			<p class="text-xs md:text-sm text-[#171717] mb-5.5">Terima kasih atas percobaan Anda. Sayangnya, proses verifikasi email belum berhasil diselesaikan.</p>
		</div>

		<div class="flex flex-col gap-5 w-full">
      <Button type="button" variant="default" class="w-full" @click="$router.replace('/')">Oke</Button>
      <Button type="button" variant="outline-primary" class="w-full" @click="verify">Verifikasi Ulang</Button>
    </div>

	</div>
</template>

<script lang="ts" setup>

const loadingStore = useLoadingStore();

const props = defineProps<{
  id: string
}>();

const verify = async () => {
  loadingStore.isLoading = true
	try {
    const response = await apiLakumanah.post(urlAuthVerifyMail + '/' + props.id, {});

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
