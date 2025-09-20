<script setup lang="ts">
import { usePwaInstall } from '~/composables/usePwaInstall'

const { isInstallable, promptInstall } = usePwaInstall()
const showAlert = ref(false)

// kalau installable berubah jadi true → tampilkan alert
watch(isInstallable, (val) => {
  if (val) showAlert.value = true
})
</script>

<template>
	<!-- Alert Install -->
	<div
		v-if="showAlert"
		class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-white border shadow-lg rounded-xl p-4 flex justify-between items-center"
	>
		<div>
			<h2 class="font-semibold">Install Lakumanah</h2>
			<p class="text-sm text-gray-500">Tambahkan ke home screen untuk akses cepat 🚀</p>
		</div>
		<div class="flex gap-2">
			<button
				class="px-3 py-1 bg-gray-200 rounded-lg text-sm"
				@click="showAlert = false"
			>
				Nanti
			</button>
			<Button
				size="sm"
				variant="default"
				@click="() => { promptInstall(); showAlert = false }"
			>
				Install
			</Button>
		</div>
	</div>
</template>
