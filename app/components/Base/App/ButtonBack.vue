<template>
	<button class="h-6 w-6 inline-block cursor-pointer" @click="handleBack">
    <div :class="isWhite ? 'text-white' : 'text-primary'">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-[1.7em] h-[1.7em]">
        <path d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z"/>
      </svg>
    </div>
		<!-- <Icon name="material-symbols:arrow-back-rounded" class="text-2xl"  /> -->
	</button>
</template>

<script lang="ts" setup>

defineProps({
	isWhite: {
		type: Boolean,
		default: false
	},
})

const router = useRouter();

// Handle back navigation dengan reset state
const handleBack = () => {
  // Kalau history panjang (bisa balik), jalanin back()
  if (window.history.length > 1) {
    router.back()
  } else {
    // Kalau nggak ada history sebelumnya, ke homepage
    router.replace('/')
  }
}
</script>
