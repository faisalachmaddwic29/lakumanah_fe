<template>
  <div class="relative content-participants py-4">

    <header class="fixed z-1 inset-x-0 w-full top-0 left-0 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] h-[56px] max-h-[56px] filter backdrop-blur">
      <AppContainer>
        <div class="flex items-center h-full justify-between">
          <div class="flex items-center gap-5">
            <!-- <AppButtonBack /> -->
          </div>
          <div class="flex gap-2 items-center">
            <NuxtImg src="/images/logo-primary.png" alt="logo" class="size-9" />
            <div class=" text-base font-bold font-lato">Leaderboard</div>
          </div>
          <div/>
        </div>
      </AppContainer>
    </header>

    <div class="flex flex-col gap-y-5 w-full px-4">
      <!-- Community -->
      <div class="bg-primary rounded-xl shadow-xl overflow-hidden">
        <NuxtImg src="/images/auth/cities.png" alt="line" class="w-full pt-3" />

        <div class="content-community flex flex-col gap-2.5 p-3 bg-white">
          <h3 class="font-bold text-lg leading-tight">Gladhen Kulonprogo 2025</h3>

          <LabelIcon class="w-full items-start text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/map-pin.svg" alt="location" class="size-6 mt-0.5" />
            </template>
            <template #label>
                <div class="flex flex-col gap-y-0.5">
                  <h3 class="font-semibold text-sm tracking-wide">Gladhen Kulonprogo 2025</h3>
                  <p class="text-xs text-gray-400">Jl Faisal</p>
                </div>
            </template>
          </LabelIcon>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/user-group.svg" alt="user-group" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                324 Peserta
              </div>
            </template>
          </LabelIcon>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/calendar-days.svg" alt="calendar-days" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                2 September 2025
              </div>
            </template>
          </LabelIcon>

          <NuxtImg src="/images/powered-by-grey.svg" alt="line" class="w-full h-[29px] mx-auto" />

        </div>
      </div>

      <!-- List Categories -->
      <div class="flex flex-col gap-y-2.5 w-full text-[#627086] font-lato">
        <p class="text-base font-bold">Kategori</p>

        <!-- Listnya -->
        <div class="flex flex-col gap-y-2.5 w-full">
          <div
            v-for="item in data_categories"
            :key="item.id"
            class="w-full h-full border border-[#DFDFDF] p-3 rounded-lg cursor-pointer flex items-center justify-between"
            @click="handleCategories(1)">
            <div class="flex flex-col gap-1">
              <p class="font-bold text-black">{{ item.name }}</p>
              <LabelIcon class="w-full items-center text-dark-grey">
                <template #icon>
                  <NuxtImg src="/icons/user-group.svg" alt="user-group" class="size-5" />
                </template>
                <template #label>
                  <div class="text-xs font-normal">
                    {{ item.total }} Peserta
                  </div>
                </template>
              </LabelIcon>
            </div>
            <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const title = "Leaderboard";

definePageMeta({
  layout: "default",
  isPaddingTop: true,
  isPaddingBottom: true,
  title: title,
})

useSeoMeta({
  title: title,
})

const handleCategories = (id: number) => {
  console.log("ID Kategori:", id)
}

const data_categories = [
  {
    id: 1,
    name: "Dewasa - Putra",
    total: 32
  },
  {
    id: 2,
    name: "Dewasa - Putri",
    total: 14
  },
  {
    id: 3,
    name: "Anak - Putra",
    total: 63
  },
  {
    id: 4,
    name: "Anak - Putri",
    total: 21
  },
  {
    id: 5,
    name: "Gagrag Mataram",
    total: 12
  }
]

</script>
