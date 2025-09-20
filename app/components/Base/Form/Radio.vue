<template>
  <div class="flex flex-wrap gap-4">
    <label
      v-for="option in props?.options"
      :key="option.value"
      class="flex items-center text-sm md:text-base font-normal justify-center px-4 py-2 border rounded-full cursor-pointer transition-all"
      :class="{
        'border-[#C5C5C5] dark:border-[rgba(197,197,197,0.2)] text-[#C5C5C5]': props?.modelValue !== option.value,
        'border-primary text-primary': props?.modelValue === option.value,
      }"
    >
      <input
        type="radio"
        :value="option.value"
        :checked="props?.modelValue === option.value"
        class="hidden"
        @change="$emit('update:modelValue', option.value)"
      >
      {{ option.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array as () => { value: string | number; label: string }[],
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Tambahkan styling tambahan jika perlu */
</style>
