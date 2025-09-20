<template>
  <div class="w-full h-full shadow p-3 rounded-lg cursor-pointer flex justify-between">
    <p>{{ props.title }}</p>
    <!-- <Icon name="material-symbols:arrow-forward-ios-rounded" class="text-2xl" /> -->
    <Button type="button" variant="link" class="text-sm !p-0 !m-0 h-full hover:no-underline">Lihat</Button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>
