<template>
	<h2 class="flex text-lg md:text-xl font-bold text-title" :class="isWhite ? 'text-white' : 'text-primary'">
		{{ title }}
	</h2>
</template>


<script lang="ts" setup>

defineProps({
	isWhite: {
		type: Boolean,
		default: false
	},
	isBackground: {
		type: Boolean,
		default: false
	},
	title: {
		type: String,
		default: ''
	}
})

</script>
