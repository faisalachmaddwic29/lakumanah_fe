<template>
  <div class="w-full min-h-screen bg-black flex flex-col justify-between items-center p-4">
    <!-- Tombol X -->
    <button
      class="absolute top-4 right-4 bg-white/50 hover:bg-white/80 hover:text-red-500 text-white rounded-full p-2 cursor-pointer size-[32px] flex items-center"
      @click="$router.back()"
    >
      <Icon name="material-symbols:close" class="w-6 h-6" />
    </button>

    <!-- Header -->
    <div class="flex flex-col items-center mt-8">
      <div class="flex items-center gap-3">
        <NuxtImg src="/images/logo.png" alt="logo" class="w-12 h-12" />
        <p class="text-white text-2xl font-bold font-lato">Lakumanah</p>
      </div>
      <p class="text-white mt-4">Arahkan kamera ke QR peserta</p>
    </div>

    <!-- Scanner Area -->
    <div class="relative flex justify-center items-center flex-1 w-full">
      <!-- Kamera -->
      <StreamBarcodeReader class="w-full max-w-md h-full object-cover rounded-xl" />

      <!-- Overlay Scanner -->
      <div class="absolute inset-0 flex justify-center items-center">
        <div class="w-72 h-72 border-2 border-transparent relative">
          <!-- Corner borders -->
          <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg"/>
          <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg"/>
          <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg"/>
          <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg"/>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="w-full bg-white flex justify-around items-center py-3 rounded-2xl">
      <button class="flex flex-col items-center text-green-700 font-semibold">
        <span class="material-icons text-2xl">qr_code_scanner</span>
        <span class="text-sm">Scan QR</span>
      </button>
      <button class="flex flex-col items-center text-gray-400">
        <span class="material-icons text-2xl">confirmation_number</span>
        <span class="text-sm">Input Manual</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StreamBarcodeReader } from "vue-barcode-reader"
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
