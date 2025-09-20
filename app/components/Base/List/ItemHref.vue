<template>
  <component
    :is="asTag"
    :href="href"
    :target="target"
    class="flex items-center justify-between w-full gap-7 cursor-pointer"
    @click="$emit('click')"
  >
    <slot v-if="isIcon">
      <Icon :name="leftIcon" class="text-3xl size-6" :class="isRed ? 'text-red-500' : 'text-[#808187]'" />
    </slot>
    <slot v-else name="icon" />

    <div class="flex justify-between items-center w-full py-3.5 border-b border-separator">
      <p class="text-sm md:text-base" :class="isRed ? 'text-red-500' : ''">{{ label }}</p>
      <Icon :name="rightIcon" class="text-2xl size-6" :class="isRed ? 'text-red-500' : ''" />
    </div>
  </component>
</template>

<script setup>
const props = defineProps({
  label: String,
  isRed: { type: Boolean, default: false },
  isIcon: { type: Boolean, default: false },
  leftIcon: { type: String, default: "famicons:information-circle-outline" },
  rightIcon: { type: String, default: "ion:chevron-forward-outline" },
  as: { type: String, default: "div" },
  href: String,
  target: String,
});

defineEmits(["click"]);

const asTag = props.as || "div";
</script>
