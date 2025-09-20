<template>
	<NuxtImg src="/images/logo/text-orange.svg" alt="Logo-text-orange" class="h-[32px] w-32 cursor-pointer" @click="handleHome" />
</template>

<script lang="ts" setup>
	const router = useRouter();


	const handleHome = () => {
		router.push('/');
	}
</script>
