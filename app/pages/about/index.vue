<template>
  <div class="relative pb-4">
    <div class="bg-gray-400 h-[200px] w-full flex justify-center items-center">
      <NuxtImg src="/images/logo.png" alt="about-logo" class="size-[160px]" />
    </div>

    <div class="flex flex-col px-4">
      <h1 class="text-2xl font-extrabold mt-3 mb-5">Tentang Lakumanah</h1>

      <p class="text-sm text-justify">
        <span class="font-bold">Lakumanah</span> adalah aplikasi yang khusus dikembangkan untuk pengelolaan event tahunan Gladhen Jemparingan Hageng Tingkat Nasional dalam Rangka Hari Jadi Kabupaten Kulonprogo.
        <br>
        <br>
        <span class="font-bold">Lakumanah</span> adalah aplikasi kecil yang diharapkan dapat menginspirasi banyak komunitas seni tradisi khususnya seni tradisi jemparingan untuk berani memadukan tradisi dengan inovasi-inovasi digital. Memperluas jangkauan penyebaran informasi edukasi seni tradisi, nilai-nilai baik dalam kearifan lokal yang dititipkan serta ajakan untuk terus menjaga dan melestarikannya.

      </p>
    </div>
  </div>
</template>


<script lang="ts" setup>
const title = "Tentang Lakumanah";

definePageMeta({
  layout: "detail",
  isPaddingTop: true,
  title: title,
});

useSeoMeta({
  title: title,
});
</script>
