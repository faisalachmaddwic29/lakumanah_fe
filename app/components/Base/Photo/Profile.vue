<script setup lang="ts">

const props = defineProps<{
  imageUrl?: string | null; // Optional URL foto profil
  width?: number; // Optional width
  height?: number; // Optional height
}>();


// Buat inisial nama
// const initials = computed(() => initialName(props.name));

// Set default width dan height jika tidak diberikan
const imgWidth = props.width ?? 80;
const imgHeight = props.height ?? 80;
</script>

<template>
  <div
		class="aspect-square rounded-full border dark:border-blue-950 overflow-hidden flex justify-center items-center m-auto relative shadow-sm"
		:style="{ width: `${imgWidth}px`, height: `${imgHeight}px` }"
  >
    <template v-if="props?.imageUrl">
			<NuxtImg
				:src="imageUrl ?? ''"
				alt="User profile"
				class="object-fill w-full h-full"
			/>
    </template>
    <template v-else>
      <svg class="w-[1.7em] h-[1.7em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><!-- Icon from HeroIcons by Refactoring UI Inc - https://github.com/tailwindlabs/heroicons/blob/master/LICENSE --><path fill="currentColor" fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0a4.5 4.5 0 0 1-9 0M3.751 20.105a8.25 8.25 0 0 1 16.498 0a.75.75 0 0 1-.437.695A18.7 18.7 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695" clip-rule="evenodd"/></svg>
      <!-- <Icon name="heroicons:user-solid" class="text-8xl text-primary" /> -->
			<!-- <NuxtImg
				src="/images/icons/user_default.svg"
				alt="User profile"
				class="rounded-full object-cover w-full"
			/> -->
    </template>
  </div>
</template>
