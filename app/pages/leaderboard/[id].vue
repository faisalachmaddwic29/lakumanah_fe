<template>
  <div class="relative content-leaderboards py-4">

    <header class="fixed z-1 inset-x-0 w-full top-0 left-0 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] h-[56px] max-h-[56px] filter backdrop-blur">
      <AppContainer>
        <div class="flex items-center h-full justify-between">
          <div class="flex items-center gap-5">
            <AppButtonBack />
          </div>
          <div class="flex gap-2 items-center">
            <NuxtImg src="/images/logo-primary.png" alt="logo" class="size-9" />
            <div class=" text-base font-bold font-lato">Leaderboard</div>
          </div>
          <div class="w-6"/>
        </div>
      </AppContainer>
    </header>

    <div class="flex flex-col gap-y-5 w-full px-4">
      <!-- content -->
      <div class="w-full relative rounded-2xl overflow-hidden p-4">
        <div class="absolute -z-1 inset-0 aspect-5/2 curved overflow-clip">
          <NuxtImg src="/images/bg-leaderboard.png" alt="background" class="w-full h-full object-fill" />
        </div>

        <div class="flex gap-1 justify-between items-start">
          <div class="flex flex-col gap-1 text-white font-lato">
            <p class="text-sm font-semibold">{{ event_name }}</p>
            <p class="text-2xl font-extrabold">{{ category_name }}</p>
            <div class="flex gap-1.5 items-center text">
              <NuxtImg src="/icons/user-group-white.svg" alt="user-group" class="size-5" />
              {{ total_participant }} Peserta
            </div>
          </div>
          <div>
            <Icon name="material-symbols:refresh" class="text-2xl text-white cursor-pointer" @click="handleRefresh" />
          </div>
        </div>
      </div>

      <!-- List -->
      <div v-if="leaderboards.length" class="w-full mx-auto">
        <div
          v-for="(leaderboard) in leaderboards"
          :key="leaderboard.participant_id"
          class="flex items-center justify-between p-4 border-b last:border-b-0"
        >
          <!-- peserta -->
          <div class="flex items-center gap-[10px]">
            <!-- <div class="w-6 font-bold text-2xl text-center">{{ leaderboard.ranking }}</div> -->
            <div class="w-6 text-center">
              <!-- ranking 1 -->
              <NuxtImg
                v-if="leaderboard.ranking === 1"
                src="/images/ranks/1.png"
                alt="Ranking 1"
                class="w-6 h-6"
              />
              <!-- ranking 2 -->
              <NuxtImg
                v-else-if="leaderboard.ranking === 2"
                src="/images/ranks/2.png"
                alt="Ranking 2"
                class="w-6 h-6"
              />
              <!-- ranking 3 -->
              <NuxtImg
                v-else-if="leaderboard.ranking === 3"
                src="/images/ranks/3.png"
                alt="Ranking 3"
                class="w-6 h-6"
              />
              <!-- ranking lain -->
              <span v-else class="font-bold text-2xl">{{ leaderboard.ranking }}</span>
            </div>
            <div class="flex flex-col gap-[5px]">
              <p class="text-sm font-bold">{{ leaderboard.participant_name }}</p>
              <p class="text-sm text-[#92949C]">Laki-laki</p>
            </div>
          </div>
          <!-- point -->
          <div class="flex flex-col gap-[5px] items-end">
            <p class="text-xs text-[#94A3B8]"><span class="text-primary font-bold text-base">{{ leaderboard.total_score }}</span> Poin</p>
            <div class="flex space-x-2 text-xs">
              <div class="flex gap-0.5 items-center">
                <div class="w-2 h-2 rounded-full bg-[#FF0000] border border-[#D1D1D6]"/>
                <p>{{ leaderboard.total_molo }}</p>
              </div>
              <div class="flex gap-0.5 items-center">
                <div class="w-2 h-2 rounded-full bg-[#FFFF00] border border-[#D1D1D6]"/>
                <p>{{ leaderboard.total_neck }}</p>
              </div>
              <div class="flex gap-0.5 items-center">
                <div class="w-2 h-2 rounded-full bg-white border border-[#D1D1D6]"/>
                <p>{{ leaderboard.total_body }}</p>
              </div>
              <div class="flex gap-0.5 items-center">
                <div class="w-2 h-2 rounded-full bg-black border border-[#D1D1D6]"/>
                <p>{{ leaderboard.total_buttock }}</p>
              </div>
            </div>
          </div>
        </div>


        <!-- Trigger untuk observer - HANYA tampil jika belum last page dan tidak loading -->
        <div
          v-if="!isLastPage && !isLoading"
          ref="loadMoreTrigger"
          class="h-4"
        />

        <!-- Loading indicator -->
        <div v-if="isLoading" class="text-center py-4">
          <div class="inline-flex items-center gap-2">
            <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span class="text-sm text-gray-600">Memuat...</span>
          </div>
        </div>

        <!-- Sudah habis -->
        <div v-if="isLastPage && !isLoading" class="text-center text-sm py-3 text-gray-400">
          Tidak ada lagi peserta
        </div>
      </div>

      <!-- Empty state -->
      <div v-else-if="!isFirstLoading && leaderboards.length === 0" class="text-center py-0">
        <p class="text-gray-500 text-sm">Belum ada peserta</p>
      </div>

      <!-- Initial loading -->
      <div v-if="isFirstLoading" class="divide-y divide-gray-200">
        <div v-for="n in 3" :key="n" class="grid grid-cols-[2fr_1.2fr_auto] items-center py-3 animate-pulse">
          <div class="flex items-center gap-[10px]">
          <div class="w-6 h-6 bg-gray-300 rounded-full"/>
          <div class="flex flex-col gap-[5px]">
            <div class="h-4 w-24 bg-gray-300 rounded"/>
            <div class="h-3 w-16 bg-gray-200 rounded"/>
          </div>
        </div>

        <!-- point skeleton -->
        <div class="flex flex-col gap-[5px] items-end">
          <div class="h-4 w-20 bg-gray-300 rounded"/>
          <div class="flex space-x-2 text-xs">
            <div class="w-6 h-3 bg-gray-200 rounded"/>
            <div class="w-6 h-3 bg-gray-200 rounded"/>
            <div class="w-6 h-3 bg-gray-200 rounded"/>
            <div class="w-6 h-3 bg-gray-200 rounded"/>
          </div>
        </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import type { LeaderboardItem, LeaderboardsResponse } from '~/types/api/leaderboard';


const title = "Detail Kategori";
definePageMeta({
  layout: "default",
  isPaddingTop: true,
  title: title,
});

useSeoMeta({
  title: title,
});


const route = useRoute();
const event_name = route.query.event_name as string
const category_name = route.query.category_name as string
const total_participant = route.query.total_participant as string


const buildParams = () => {
  const params = new URLSearchParams();
  params.append('page', String(page.value));
  params.append('per_page', '3');
  params.append('sort', '-created_at');

  return params.toString();
};

const leaderboards = ref<LeaderboardItem[]>([]);
const page = ref(1);
const isLoading = ref(false);
const isFirstLoading = ref(true);
const isLastPage = ref(false);
const loadMoreTrigger = ref<HTMLElement | null>(null);


const fetchLeaderboards = async () => {
  // Proteksi ganda untuk mencegah multiple request
  if (isLoading.value || isLastPage.value) {
    // console.log('Fetch dibatalkan - isLoading:', isLoading.value, 'isLastPage:', isLastPage.value);
    return;
  }

  isLoading.value = true;

  try {
    const { data } = await apiLakumanah.get<LeaderboardsResponse>(
      `${urlApiLeaderboard}/${route.params.id}?${buildParams()}`
    );

    console.log('Leaderboard data:', data);
    if (data.leaderboard && data.leaderboard.length > 0) {
      leaderboards.value.push(...data.leaderboard);

      // Update page untuk next request
      page.value++;

      // Check apakah sudah last page
      if (data.meta && data.meta.current_page >= data.meta.last_page) {
        isLastPage.value = true;
        // console.log('Reached last page');
      }
    } else {
      // Jika tidak ada data, tandai sebagai last page
      isLastPage.value = true;
      // console.log('No more data available');
    }
  } catch (error) {
    console.error('Error fetching leaderboards:', error);
    // Jangan set isLastPage true saat error, biar bisa retry
  } finally {
    isLoading.value = false;
    isFirstLoading.value = false;
  }
};


// ✅ Observer infinite scroll dengan proteksi lebih ketat
const { stop: stopObserver } = useIntersectionObserver(
  loadMoreTrigger,
  ([entry]) => {
    if (
      entry?.isIntersecting &&
      !isLoading.value &&
      !isLastPage.value &&
      !isFirstLoading.value
    ) {
      // console.log('Intersection triggered, fetching more...');
      fetchLeaderboards();
    }
  },
  {
    rootMargin: '100px', // Kasih jarak lebih besar
    threshold: 0.1
  }
);

// ✅ Cleanup observer saat component unmount
onUnmounted(() => {
  stopObserver();
});

// ✅ Initial load
onMounted(async () => {
  // console.log('Component mounted, initial fetch...');
  await fetchLeaderboards();
});

const resetLeaderboard = () => {
  leaderboards.value = [];
  page.value = 1;
  isLastPage.value = false;
  isLoading.value = false;
};

const handleRefresh = () => {
  resetLeaderboard();
  fetchLeaderboards();
};

</script>
