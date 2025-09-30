<template>
  <div class="relative content-participants py-5">

    <header class="fixed z-1 inset-x-0 w-full top-0 left-0 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] h-[56px] max-h-[56px] filter backdrop-blur">
      <AppContainer>
        <div class="flex items-center h-full justify-between">
          <div class="flex items-center gap-5">
            <AppButtonBack />
          </div>
          <div class="flex gap-2 items-center">
            <NuxtImg src="/images/logo-primary.png" alt="logo" class="size-9" />
            <div class=" text-base font-bold font-lato">Lakumanah</div>
          </div>
          <div/>
        </div>
      </AppContainer>
    </header>

    <div class="flex flex-col gap-y-3 w-full px-4">
      <p class="font-bold text-xl">Rambahan ke-{{ rambahanId }}</p>

      <NuxtImg src="/images/illustration/scanner-failed.png" alt="rambahan" class="w-full mt-20 px-6" />

      <div class="text-center mt-5">
        <h3 class="mb-2.5 text-xl font-bold">Terjadi Kesalahan</h3>
        <p class="text-base font-light">{{ messageError || "Silakan coba lagi beberapa saat lagi." }}</p>
      </div>
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-grey py-4">
      <AppContainer>
        <Button class="w-full flex items-center gap-1" type="button" @click="router.replace(`/rambahan/${rambahanId}/scan`) ">
          <Icon name="heroicons:viewfinder-circle" class="text-2xl" />
          <span>Scan Ulang Peserta</span>
        </Button>
      </AppContainer>
    </div>
  </div>
</template>


<script setup lang="ts">
const route = useRoute()
const router = useRouter()

// bikin computed biar reactive
const rambahanId = computed(() => route.params.id)
const messageError = computed(() => route.query.message)

const title = computed(() => `Detail Rambahan ke-${rambahanId.value}`)

definePageMeta({
  layout: "default",
  isPaddingTop: true,
  isPaddingBottom: true,
  middleware: ["auth"],
})

useSeoMeta({
  title: title.value,
})

console.log("ID Rambahan:", rambahanId.value)
</script>
