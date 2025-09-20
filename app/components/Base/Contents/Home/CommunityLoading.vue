<template>
  <div class="w-full mx-auto">
    <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-md animate-pulse">

      <!-- Skeleton Header (logo + info) -->
      <div class="flex items-center justify-between gap-x-3 mb-3">
        <div class="flex flex-col gap-y-2 w-full">
          <div class="h-5 bg-gray-200 rounded w-3/4"/><!-- name -->
          <div class="h-3 bg-gray-200 rounded w-1/2"/><!-- ketua -->
        </div>
      </div>

      <!-- Skeleton Konten utama (lokasi + alamat) -->
      <div class="flex flex-col gap-y-2 pt-2">
        <div class="h-4 bg-gray-200 rounded w-1/3"/><!-- lokasi -->
        <div class="h-3 bg-gray-200 rounded w-1/4"/><!-- alamat -->
      </div>

      <!-- Skeleton Footer (peserta + tombol edit) -->
      <div class="flex justify-between items-center pt-4 relative">
        <div class="h-4 bg-gray-200 rounded w-1/4"/><!-- peserta -->
      </div>
      <NuxtImg src="/images/powered-by-grey.svg" alt="line" class="w-full h-[24px] mx-auto mt-2" />
    </div>

  </div>
</template>
