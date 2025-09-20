<template>
	<div id="menu-items" class="relative w-[80px]">
			<div class="flex flex-col justify-center items-center cursor-pointer">
					<div class="size-[60px] bg-[rgba(0,0,0,0.03)] flex items-center justify-center rounded-2xl">
							<NuxtImg :src="props.icon" :alt="props.label" class="size-10" />
					</div>
					<p class="text-xs mt-3 text-center font-normal">{{ props.label }}</p>
			</div>
			<div v-if="isDevelopment" class="absolute top-[60px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1A73E8] rounded-4xl text-center py-0.5 px-1.5">
					<p class="text-[10px] tracking-wide font-semibold text-white">SOON</p>
			</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	icon : {
		type: String,
		required: true,
	},
	label : {
		type: String,
		required: true
	},
	isDevelopment : {
		type: Boolean,
		default: false
	},
})
</script>