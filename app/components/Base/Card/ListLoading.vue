<script setup lang="ts">
defineProps({
  length: {
    type: Number,
    default: 1,
  },
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="space-y-3">
      <div
        v-for="i in length"
        :key="i"
        class="flex items-center justify-between border rounded-xl p-3"
      >
        <div class="flex flex-col gap-2">
          <!-- nama kategori -->
          <Skeleton class="h-6 w-40 rounded-md" />
          <!-- total peserta -->
          <Skeleton class="h-3 w-24 rounded-md" />
        </div>
        <!-- icon panah -->
        <Skeleton class="h-6 w-6 rounded-md" />
      </div>
    </div>
  </div>
</template>
