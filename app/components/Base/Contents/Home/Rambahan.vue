<template>
  <div class="flex flex-col gap-y-3 w-full">
    <h3 class="font-bold text-lg leading-tight">List Rambahan</h3>

    <div class="flex flex-col gap-y-4 w-full">
      <CardRambahan v-for="n in 40" :key="n" :title="'Rambahan ke-' + n" @click="handleRambahan(n)" />
    </div>
  </div>
</template>

<script setup lang="ts">

const router = useRouter();
const handleRambahan = (id: number) => {
  router.push('/rambahan/' + id);
}
</script>
