<template>
  <!-- Root container dengan background full dan scrollable -->
  <div class="relative w-full min-h-screen">
    <NuxtImg src="/images/auth/background.png" alt="bg-auth" class="absolute inset-0 -z-1 w-full h-full object-cover" />
    <!-- Konten utama scrollable -->
    <div class="pt-[118px] pb-10 flex flex-col items-center text-center">
      <NuxtImg src="/images/auth/logo-white.png" alt="logo" class="size-[275px] mx-auto" />
      <!-- <NuxtImg src="/images/logo.png" alt="logo" class="w-[240px] mx-auto" /> -->

      <div class="w-full text-white pt-[57px] flex flex-col gap-2.5 px-4 items-center">
        <h3 class="text-2xl font-light font-nunito-sans">Selamat datang di<br>akses web Admin Scoring</h3>

        <h1 class="text-[28px] font-semibold font-nunito-sans border-b border-white">
          Acara Jemparing Kulonprogo
        </h1>

        <Button
          variant="default"
          size="lg"
          class="w-full mt-10 cursor-pointer bg-white text-primary hover:bg-slate-300"
          @click="router.push('/login')"
        >
          Masuk
        </Button>

        <NuxtImg src="/images/powered-by-white.svg" alt="line" class="w-full h-[29px] mx-auto mt-[20px]" />

      </div>
    </div>

    <div class="absolute z-[1] bottom-0 w-full">
      <NuxtImg src="/images/auth/cities.png" alt="line" class="w-full" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const title = "Authentication";

definePageMeta({
  layout: "default",
  middleware: ['guest'],
  title: title,
});

useSeoMeta({
  title: title,
});

const router = useRouter();
</script>

<style>
/* Pastikan html dan body bisa scroll */
html, body, #__nuxt {
  height: 100%;
  overflow: auto;
}
</style>
