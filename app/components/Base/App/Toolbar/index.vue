<template>
	<header
		v-if="!custom"
		class="fixed z-1 inset-x-0 w-full top-0 left-0 bg-white/80 shadow-[0px_2px_4px_rgba(0,0,0,0.05)] h-[56px] max-h-[56px] filter backdrop-blur" :class="className">
		<AppContainer>
			<slot />
		</AppContainer>
	</header>
	<header
		v-else
		class="w-full h-[56px] max-h-[56px]">
		<AppContainer>
			<slot />
		</AppContainer>
	</header>
</template>

<script setup lang="ts">
	defineProps({
		custom: {
			type: Boolean,
			default: false
		},
    className: {
      type: String,
      default: ''
    }
	})
</script>
