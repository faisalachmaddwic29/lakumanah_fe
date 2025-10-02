<template>
  <div class="bg-primary rounded-xl shadow-xl overflow-hidden">
    <NuxtImg src="/images/auth/cities.png" alt="line" class="w-full pt-3" />

      <div class="content-community flex flex-col gap-2.5 p-3 bg-white">
        <h3 v-if="props.event" class="font-bold text-lg leading-tight">{{ props.event?.name }}</h3>

        <LabelIcon v-if="props.event" class="w-full items-center text-dark-grey">
          <template #icon>
            <NuxtImg src="/icons/map-pin.svg" alt="location" class="size-6 mt-0.5" />
          </template>
          <template #label>
            <div class="text-sm font-medium">
                {{ props.event?.location }}
            </div>
          </template>
        </LabelIcon>

        <LabelIcon v-if="props.event" class="w-full items-center text-dark-grey">
          <template #icon>
            <NuxtImg src="/icons/user-group.svg" alt="user-group" class="size-6 mt-0.5" />
          </template>
          <template #label>
            <div class="text-sm font-medium">
              {{ props.event?.total_participant }} Peserta
            </div>
          </template>
        </LabelIcon>

        <LabelIcon v-if="props.event" class="w-full items-center text-dark-grey">
          <template #icon>
            <NuxtImg src="/icons/calendar-days.svg" alt="calendar-days" class="size-6 mt-0.5" />
          </template>
          <template #label>
            <div class="text-sm font-medium">
              {{ props.event?.date }}
            </div>
          </template>
        </LabelIcon>

        <NuxtImg src="/images/powered-by-grey.svg" alt="line" class="w-full h-[29px] mx-auto" />

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
