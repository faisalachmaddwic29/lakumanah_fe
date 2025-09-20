<template>
  <div class="w-full mx-auto">
    <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-md">
      <!-- Konten utama -->
      <div class="text-left flex flex-col gap-y-1.5">
        <h3 class="font-bold text-base leading-tight">Belum Ada Acara</h3>
        <p class="text-xs text-gray-400">Anda belum memiliki Acara. Mari mulai dengan mendaftarkan Acaramu!</p>
      </div>

      <!-- footer -->
      <Button type="button" variant="default" class="w-full mt-3 cursor-pointer" @click="$router.push('/community/add')">
        <Icon name="material-symbols:add" class="text-md" />
        <span class="text-sm">Buat Acara</span>
      </Button>

      <NuxtImg src="/images/powered-by-grey.svg" alt="line" class="w-full h-[24px] mx-auto mt-2" />
    </div>

  </div>
</template>
