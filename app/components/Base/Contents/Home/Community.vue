<template>
  <div class="w-full mx-auto">
    <div class="relative bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-md">
      <!-- Icon kiri atas -->
      <div class="flex items-center justify-between gap-x-3">
        <!-- <div class="shrink-0">
          <PhotoCommunity class="w-full" :image-url="props.community?.logo" />
        </div> -->

        <!-- Label kanan atas -->
        <div class="flex flex-col gap-y-2.5 w-full">
          <h3 class="font-bold text-lg leading-tight">{{ props.community?.name ?? '-' }}</h3>

          <LabelIcon class="w-full items-start text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/map-pin.svg" alt="location" class="size-6 mt-0.5" />
            </template>
            <template #label>
                <div class="flex flex-col gap-y-0.5">
                  <h3 class="font-semibold text-sm tracking-wide">{{ props.community?.location?.domicile?.city_type ?? '-' }} {{ props.community?.location?.domicile?.city_name ?? '-' }}</h3>
                  <p class="text-xs text-gray-400">{{ props.community?.address ?? '-' }}</p>
                </div>
            </template>
          </LabelIcon>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/user-group.svg" alt="user-group" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                {{ props.community?.total_participants }} Peserta
              </div>
            </template>
          </LabelIcon>

          <LabelIcon class="w-full items-center text-dark-grey">
            <template #icon>
              <NuxtImg src="/icons/calendar-days.svg" alt="calendar-days" class="size-6 mt-0.5" />
            </template>
            <template #label>
              <div class="text-sm font-medium">
                {{ formatDate(props.community?.updated_at!).full_long_date }}
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
import type { Community } from '~/types/api';


const props = withDefaults(defineProps<{
  community?: Community | null
}>(), {
  community: null
});

</script>
