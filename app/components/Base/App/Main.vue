<template>
  <main
    class="relative z-0 w-full h-fit flex-1"
    :class="{
      'pb-[76px] pt-[56px]': props.clean,
      'pb-[76px]': props.bottom,
      'pt-[56px]': props.top,
    }"
  >
    <div class="max-w-container mx-auto relative">
      <div class="relative z-10">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  clean: {
    type: Boolean,
    default: false,
  },
  bottom: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false,
  },
});
</script>
