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
      <ContentsHomeLeaderboardLoading v-if="!appStore.isLeaderboardLoaded" />

      <ContentsHomeLeaderboard v-else :event="appStore.leaderboardEventInfo" />

      <!-- List Categories -->
      <div class="flex flex-col gap-y-2.5 w-full text-[#627086] font-lato">
        <p class="text-base font-bold">Kategori</p>

        <!-- Listnya -->
        <CardListLoading v-if="!appStore.isLeaderboardLoaded" :length="5"  />
        <div v-else class="flex flex-col gap-y-2.5 w-full">
          <div
            v-for="item in appStore.leaderboardCategories"
            :key="item.id"
            class="w-full h-full border border-[#DFDFDF] p-3 rounded-lg cursor-pointer flex items-center justify-between"
            @click="handleCategories(item.id, item.name, item.total_participant)">
            <div class="flex flex-col gap-1">
              <p class="font-bold text-black">{{ item.name }}</p>
              <LabelIcon class="w-full items-center text-dark-grey">
                <template #icon>
                  <NuxtImg src="/icons/user-group.svg" alt="user-group" class="size-5" />
                </template>
                <template #label>
                  <div class="text-xs font-normal">
                    {{ item.total_participant }} Peserta
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
  title: title,
})

useSeoMeta({
  title: title,
})

const appStore = useAppStore();

onMounted(() => {
    appStore.fetchLeaderboards();
})

const handleCategories = (id: number | string, name?: string, total_participant?: number | string) => {
  navigateTo({
    path: '/leaderboard/' + id,
    query: {
      event_name: appStore.leaderboardEventInfo?.name,
      category_name: name,
      total_participant: total_participant
    },
  });
}

</script>
