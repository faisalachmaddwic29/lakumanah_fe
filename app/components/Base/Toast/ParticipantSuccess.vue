<template>
  <AppBackgroundDark @click.self="emit('close')">
		<div
			class="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg w-[90%] max-w-sm border p-4"
		>
			<div class="flex flex-col justify-start">

				<div class="flex justify-between items-center mb-3">
					<!-- Icon Success -->
					<div class="text-green-600 rounded-full w-6 h-6">
						<Icon name="material-symbols:check-circle-rounded" class="text-2xl" />
					</div>

					<!-- Tombol Close -->
					<button
            type="button"
						class="text-[#737373] hover:text-danger cursor-pointer"
						@click="emit('close')"
					>
						<Icon name="material-symbols:close-rounded" class="text-2xl" />
					</button>
				</div>

				<!-- Title -->
				<p class="text-base font-medium">
					Peserta Berhasil ditambahkan
				</p>

				<!-- Subtitle -->
				<p class="text-sm text-gray-500 mt-1">
            Peserta berhasil masuk ke dalam komunitas. Kamu bisa lanjut menambahkan peserta lainnya.
				</p>
			</div>
		</div>
	</AppBackgroundDark>
</template>


<script setup lang="ts">
const emit = defineEmits(['close'])
</script>
