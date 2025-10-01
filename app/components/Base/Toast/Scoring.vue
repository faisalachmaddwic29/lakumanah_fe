<template>
  <AppBackgroundDark>
    <div
      class="fixed left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg w-[90%] max-w-sm z-50 border p-4"
    >
      <div class="flex flex-col justify-start items-center">

        <!-- Icon Success -->
        <div class="flex justify-center items-center mb-3">
          <div class="text-green-600 rounded-full size-[195px]">
            <svg width="197" height="197" viewBox="0 0 197 197" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle opacity="0.1" cx="98.5" cy="98.1487" r="98" fill="#2DD55B"/>
              <circle opacity="0.1" cx="98.5" cy="98.1487" r="75" fill="#2DD55B"/>
              <circle cx="98.5" cy="97.9999" r="50.3415" fill="#2DD55B"/>
              <path d="M126.917 78C125.25 76.3333 122.75 76.3333 121.083 78L89.8334 109.25L76.9167 96.3333C75.25 94.6667 72.75 94.6667 71.0834 96.3333C69.4167 98 69.4167 100.5 71.0834 102.167L86.9167 118C87.75 118.833 88.5834 119.25 89.8334 119.25C91.0834 119.25 91.9167 118.833 92.75 118L126.917 83.8333C128.583 82.1667 128.583 79.6667 126.917 78Z" fill="white"/>
            </svg>
          </div>
        </div>

        <!-- Title -->
        <p class="text-lg font-bold mb-1">
          Berhasil Disimpan
        </p>

        <!-- Options -->
        <div class="grid grid-cols-2 gap-3 w-full my-4 font-lato">
          <button
            class="border rounded-xl p-3 text-left flex flex-col gap-2 transition cursor-pointer"
            :class="selected === 'peserta' ? 'border-info bg-blue-50' : 'border-gray-300'"
            @click="selected = 'peserta'"
          >
            <p class="font-bold text-base leading-4.5">Peserta Selanjutnya</p>
            <p class="text-xs text-[#737373]">Pindai QR code peserta untuk menilai skor mereka.</p>
          </button>

          <button
            class="border rounded-xl p-3 text-left flex flex-col gap-2 transition cursor-pointer"
            :class="selected === 'rambahan' ? 'border-info bg-blue-50' : 'border-gray-300'"
            @click="selected = 'rambahan'"
          >
            <p class="font-bold text-base leading-4.5">Rambahan Selanjutnya</p>
            <p class="text-xs text-[#737373]">Pilih ke rambahan/ronde selanjutnya?</p>
          </button>
        </div>

        <!-- Action -->
        <Button type="button" variant="default" size="default" class="w-full" :disabled="!selected" @click="handleSubmit">Oke</Button>
      </div>
    </div>
  </AppBackgroundDark>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["close", "confirm"]);

const selected = ref<string | null>(null);

function handleSubmit() {
  if (selected.value) {
    emit("confirm", selected.value); // kirim pilihan ke parent
    emit("close");
  }
}
</script>
