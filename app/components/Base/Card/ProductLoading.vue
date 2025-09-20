<template>
		<div v-for="i in length" :key="i" class="group flex flex-col justify-between font-inter rounded-md p-2.5 border border-[#ededed] w-full">
			<div class="w-full pt-2 space-y-4">
				<Skeleton class="h-4 rounded"/>
				<Skeleton class="h-4 rounded w-2/3"/>
				<Skeleton class="h-4 rounded w-1/3"/>
			</div>
		</div>
</template>

<script setup lang="ts">
	defineProps({
		length: {
			type: Number,
			default: 1
		}
	})
</script>