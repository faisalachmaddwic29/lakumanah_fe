<template>
  <AppToolbar>
    <div
      class="flex items-center h-full gap-5"
      :class="title ? 'justify-start' : 'justify-between'"
    >
      <div class="flex items-center h-full gap-5 justify-between">
        <AppButtonBack :is-white="isWhite"/>

        <!-- Logo tengah -->
        <div v-if="!title && title === ''" class="flex justify-center">
          <NuxtImg
            src="/images/logo/text-orange.svg"
            alt="logo-text-orange"
            class="h-[30px]"
          />
        </div>

        <AppToolbarTitle v-else :title="title" :is-white="isWhite" />
        <!-- Kolom kanan kosong (buat balance) -->
      </div>
    </div>
  </AppToolbar>
</template>

<script setup>
// Define props
defineProps({
  title: {
    type: null,
    default: null,
  },
  isWhite: {
    type: Boolean,
    default: false,
  },
});
</script>
