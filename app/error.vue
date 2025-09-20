<template>
  <AppWrapper>
    <AppToolbar :is-background="false">
      <div class="flex items-center px-4 h-full gap-5 justify-start">
        <button class="h-6 w-6 inline-block cursor-pointer" @click="handleBack">
          <div class="text-2xl text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/></svg>
          </div>
          <!-- <Icon name="material-symbols:arrow-back-rounded" class="text-2xl text-primary" /> -->
        </button>
      </div>
    </AppToolbar>

    <AppMain :top="true">
      <div
        class="px-10 flex flex-col items-center justify-center relative min-h-screen text-center"
      >
        <NuxtImg src="/images/404.png" alt="404" class="w-[318px] h-[201px]" />
        <p class="text-2xl font-semibold mt-5 mb-2">Halaman Kosong</p>
        <p class="text-[#737373] text-sm">halaman in sedang masih tahap pengembangan</p>
        <Button
          variant="default"
          size="lg"
          class="w-full mt-6 cursor-pointer"
          @click="handleBack"
          >Halaman Utama</Button
        >
      </div>
    </AppMain>
  </AppWrapper>
</template>

<script setup lang="ts">
const router = useRouter();
const handleBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.replace("/");
  }
};
</script>
