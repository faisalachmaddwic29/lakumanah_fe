<template>
  <div class="relative flex flex-col">
    <label v-if="labelText" :for="id" class="mb-1 font-bold text-sm text-[#1E293B]">
      {{ labelText }}<span v-if="isRequiredLabel" class="text-red-500 ms-1">*</span>
    </label>

    <div class="relative">
      <!-- Input readonly -->
      <input
        :id="id"
        :name="name"
        type="text"
        :placeholder="placeholder"
        :value="displayValue"
        :class="computedClasses"
        readonly
        @click="togglePicker"
      >

      <div
        v-if="isIcon"
        :class="[
          'absolute top-1/2 mt-0.5 transform -translate-y-1/2 text-xl text-subtle pointer-events-none',
          iconPosition === 'left' ? 'left-3' : 'right-3',
        ]"
      >
        <slot name="icon">{{ icon }}</slot>
      </div>

      <!-- DatePicker -->
      <div v-if="showPicker" class="absolute z-50 mt-2 bg-white shadow-lg rounded-lg">
        <VueDatePicker
          v-model="selectedDate"
          :format="'dd-MM-yyyy'"
          inline
          auto-apply
          :enable-time-picker="isTimePicker"
          @update:model-value="onDateSelected"
          @closed="closePicker"
        />
      </div>
    </div>

    <!-- Overlay to close picker when clicking outside -->
    <div
      v-if="showPicker && !isTimePicker"
      class="fixed inset-0 z-40"
      @click="closePicker"
    />

    <FormMessageError v-if="error" :message="error" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: { type: String as () => string | null, default: null }, // <-- support null
  labelText: { type: String, default: "" },
  error: { type: String, default: undefined },
  id: { type: String, default: "" },
  name: { type: String, default: "" },
  placeholder: { type: String, default: "dd-mm-yyyy" },
  isRequiredLabel: { type: Boolean, default: false },
  isIcon: { type: Boolean, default: false },
  icon: { type: String, default: "" },
  iconPosition: { type: String, default: "left" },
  className: { type: String, default: "" },
  isTimePicker: { type: Boolean, default: false },
})

const emit = defineEmits(["update:modelValue"])

const showPicker = ref(false)
const selectedDate = ref(props.modelValue ? new Date(props.modelValue) : null)

const displayValue = computed(() => {
  if (!selectedDate.value) return ""
  const d = selectedDate.value
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
})

const togglePicker = () => {
  showPicker.value = !showPicker.value
}

const closePicker = () => {
  showPicker.value = false
}

const onDateSelected = (val: Date | null) => {
  if (val) {
    selectedDate.value = val
    emit("update:modelValue", val.toISOString().split("T")[0]) // yyyy-mm-dd
    // Close picker immediately after selection
    closePicker()
  }
}

const baseClasses =
  "w-full font-manrope text-sm md:text-base ring-none placeholder-[#C5C5C5] border border-[#C5C5C5] transition duration-300 ease-in-out rounded-lg outline-none focus:border-[var(--primary)] px-4 py-3 appearance-none cursor-pointer"
const computedClasses = computed(() => {
  const classes = [
    baseClasses,
    props.isIcon && (props.iconPosition === "left" ? "pl-10" : "pr-10"),
    props.icon && (props.iconPosition === "left" ? "pl-10" : "pr-10"),
    props.error ? "!border-red-500 !focus:ring-red-200 !focus:border-red-500" : "",
    props.className,
  ]
  return classes.filter(Boolean).join(" ")
})
</script>
