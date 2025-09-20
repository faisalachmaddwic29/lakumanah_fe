<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-8">

		<NuxtImg src="/images/auth/icon_success.svg" alt="verification-email-success" class="size-[200px]" />

		<div class="text-center pt-10 pb-8">
			<h5 class="text-sm md:text-base font-bold mt-5.5 mb-2.5">Email Anda berhasil diverifikasi.</h5>
			<p class="text-xs md:text-sm text-[#171717] mb-5.5">Terima kasih, email Anda telah berhasil diverifikasi. Anda sekarang dapat menggunakan semua fitur yang tersedia.</p>
		</div>

		<Button type="button" variant="default" class="w-full" @click="$router.replace('/')">Oke</Button>

	</div>
</template>
