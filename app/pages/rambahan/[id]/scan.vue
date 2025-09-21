<template>
  <div class="w-full min-h-screen bg-black flex flex-col justify-between items-center p-4 relative">
    <!-- Tombol X -->
    <button
      class="absolute top-4 right-4 bg-white/50 hover:bg-white/80 hover:text-red-500 text-white rounded-full p-2 cursor-pointer size-[32px] flex items-center"
      @click="$router.back()"
    >
      <Icon name="material-symbols:close" class="w-6 h-6" />
    </button>

    <!-- Header -->
    <div class="flex flex-col items-center mt-8">
      <div class="flex items-center gap-3">
        <NuxtImg src="/images/logo.png" alt="logo" class="w-12 h-12" />
        <p class="text-white text-2xl font-bold font-lato">Lakumanah</p>
      </div>
      <p class="text-white mt-4">
        {{ activeTab === 'scan' ? 'Arahkan kamera ke QR peserta' : 'Masukkan nomor target' }}
      </p>
    </div>

    <!-- Content -->
    <div class="relative flex justify-center items-center flex-1 w-full">
      <!-- Scan QR -->
      <template v-if="activeTab === 'scan'">
        <!-- Kamera -->
        <StreamBarcodeReader class="w-full h-full object-cover rounded-xl" />

        <!-- Overlay Scanner -->
        <div class="absolute inset-0 flex justify-center items-center">
          <div class="w-74 h-72 border-2 border-transparent relative">
            <!-- Corner borders -->
            <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg" />
            <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg" />
            <div class="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg" />
            <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg" />
          </div>
        </div>
      </template>

      <!-- Input Manual -->
      <template v-else>
        <form class="w-full max-w-md bg-white p-6 rounded-xl shadow-md" @submit="onSubmit">
          <FormInput
            id="no_target"
            v-model="no_target"
            label-text="Nomor Target"
            :is-required-label="true"
            type="text"
            name="no_target"
            placeholder="Masukkan Nomor Target"
            :error="errors.no_target"
          />
          <Button class="w-full mt-4" type="submit" :disabled="!isFormFull">{{ isLoading ? 'Loading...' : 'Submit' }}</Button>
        </form>
      </template>
    </div>

    <!-- Bottom Navigation -->
    <div class="w-full bg-white flex justify-around items-center py-3 rounded-2xl">
      <button
        class="flex flex-col items-center font-semibold cursor-pointer flex-1"
        :class="activeTab === 'scan' ? 'text-primary' : 'text-gray-400'"
        @click="changeTab('scan')"
      >
        <Icon name="heroicons:viewfinder-circle" class="text-2xl" />
        <span class="text-sm">Scan QR</span>
      </button>

      <button
        class="flex flex-col items-center font-semibold cursor-pointer flex-1"
        :class="activeTab === 'manual' ? 'text-primary' : 'text-gray-400'"
        @click="changeTab('manual')"
      >
        <Icon name="material-symbols:confirmation-number-outline" class="text-2xl" />
        <span class="text-sm">Input Manual</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StreamBarcodeReader } from "vue-barcode-reader"
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const activeTab = ref<'scan' | 'manual'>('scan')
const changeTab = (tab: 'scan' | 'manual') => {
  resetForm({
      values: {
        no_target: ''
      }
    })

  activeTab.value = tab
}

const route = useRoute()
const rambahanId = computed(() => route.params.id)
const loadingStore = useLoadingStore()
const router = useRouter()
const isLoading = ref(false)


// Input Manual
const schema = z.object({
	no_target: z.string()
		.min(1, 'Nomor Target harus diisi')
})

// Setup vee-validate dengan zod schema
const { defineField, values, handleSubmit, errors, setErrors, resetForm } = useForm({
	validationSchema: toTypedSchema(schema),
	initialValues: {
		no_target: ''
	}
})

const isFormFull = computed(() => {
  return values.no_target
})

const [no_target] = defineField('no_target')

const onSubmit = handleSubmit(async (values) => {

  router.push(`/rambahan/${rambahanId.value}/scoring`);
	loadingStore.start();
	isLoading.value = true

	try {
		const response = await apiLakumanah.post(urlAuthLogin, {
			"no_target": values.no_target,
		});

		const { data , message } = response;
    console.log(data);

		  // Simpan token ke cookie dan state


		notify.success(message);

		await router.replace('/');

	} catch (error: unknown) {
		handleValidationError(error, setErrors)

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
		loadingStore.stop();
	}
});


</script>
