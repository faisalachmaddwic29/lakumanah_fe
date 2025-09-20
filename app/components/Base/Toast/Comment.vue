<template>
  <AppBackgroundDark @click.self="emit('close')">
		<div
			class="fixed top-1/2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg w-[90%] max-w-sm z-50 border p-4"
		>
			<div class="flex flex-col justify-start">

				<div class="flex justify-between items-center mb-3">
					<!-- Icon Success -->
					<div class="text-green-600 rounded-full w-6 h-6">
						<Icon name="material-symbols:check-circle-rounded" class="text-2xl" />
					</div>

					<!-- Tombol Close -->
					<button
						class="text-[#737373] hover:text-danger cursor-pointer"
						@click="emit('close')"
					>
						<Icon name="material-symbols:close-rounded" class="text-2xl" />
					</button>
				</div>

				<!-- Title -->
				<p class="text-base font-medium">
					Komentar Anda Berhasil diupload
				</p>

				<!-- Subtitle -->
				<p class="text-sm text-gray-500 mt-1">
					Perlu beberapa waktu untuk muncul pada kolom komentar
				</p>
			</div>
		</div>
	</AppBackgroundDark>
</template>


<script setup lang="ts">
const emit = defineEmits(['close'])
</script>