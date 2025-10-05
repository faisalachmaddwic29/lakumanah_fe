<template>
  <label
    v-for="option in props.options"
    :key="option.value"
    class="flex flex-col w-full px-1.5 py-1 gap-0.5 border border-[#e6e6e6] rounded-md cursor-pointer transition-all"
  >
    <p class="text-[9px] text-gray-600 truncate">{{ option.label }}</p>
    <!-- Kolom teks -->
    <div class="flex flex-1 min-w-0 justify-between">
      <p class="text-base font-bold text-black">{{ option.value }}</p>
      <input
        type="radio"
        :value="option.value"
        :checked="props.modelValue === option.value"
        class="shrink-0 pb-4 size-6 cursor-pointer bg-info"
        @change="$emit('update:modelValue', option.value)"
      >
    </div>

    <!-- Radio -->
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array as () => { value: string | number; label: string }[],
    required: true,
  },
  modelValue: {
    type: String as () => string | null,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
/* Tambahkan styling tambahan jika perlu */
</style>
