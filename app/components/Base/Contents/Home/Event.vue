<template>
  <div class="w-full mx-auto">
    <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-md">
      <!-- Icon kiri atas -->
      <div class="flex items-center justify-between gap-x-3">
        <!-- <div class="shrink-0">
          <PhotoCommunity class="w-full" :image-url="props.event?.logo" />
        </div> -->

        <!-- Label kanan atas -->
        <div class="flex flex-col gap-y-2.5 w-full">
          <h3 class="font-bold text-lg leading-tight">{{ props.event?.name ?? '-' }}</h3>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/map-pin.svg" alt="location" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                  {{ props.event?.location }}
              </div>
            </template>
          </LabelIcon>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/user-group.svg" alt="user-group" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                {{ props.event?.total_participant }} Peserta
              </div>
            </template>
          </LabelIcon>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/calendar-days.svg" alt="calendar-days" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                {{ formatDate(props.event?.date!).full_long_date }}
              </div>
            </template>
          </LabelIcon>
        </div>

      </div>
      <NuxtImg src="/images/powered-by-grey.svg" alt="line" class="w-full h-[24px] mx-auto mt-2" />
    </div>
  </div>
</template>


<script lang="ts" setup>
import type { EventInfo } from '~/types/api';


const props = withDefaults(defineProps<{
  event?: EventInfo | null
}>(), {
  event: null
});

</script>
