<template>
  <div
    class="w-full min-h-screen bg-black flex flex-col justify-between items-center p-4 relative"
  >
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
        {{
          activeTab === "scan" ? "Arahkan kamera ke QR peserta" : "Masukkan nomor target"
        }}
      </p>
    </div>

    <!-- Content -->
    <div class="relative flex justify-center items-center flex-1 w-full">
      <!-- Scan QR -->
      <template v-if="activeTab === 'scan'">
        <div
          class="relative flex flex-col items-center justify-center w-full h-full py-6"
        >
          <!-- Kotak kamera -->
          <div class="relative w-96 h-96 rounded-lg">
            <QrcodeStream
              class="w-96 h-96 object-cover"
              @detect="onDetect"
              @init="onInit"
            />

            <!-- Corner borders -->
            <div
              class="absolute top-[-6px] left-[-6px] w-10 h-10 border-t-6 border-l-6 border-white rounded-tl"
            />
            <div
              class="absolute top-[-6px] right-[-6px] w-10 h-10 border-t-6 border-r-6 border-white rounded-tr"
            />
            <div
              class="absolute bottom-[-6px] left-[-6px] w-10 h-10 border-b-6 border-l-6 border-white rounded-bl"
            />
            <div
              class="absolute bottom-[-6px] right-[-6px] w-10 h-10 border-b-6 border-r-6 border-white rounded-br"
            />
          </div>

          <!-- Hasil scan -->
          <!-- <div
            v-if="result"
            class="mt-6 w-11/12 max-w-md p-3 bg-white rounded-lg shadow"
          >
            <p class="text-sm font-semibold">Hasil:</p>
            <p>{{ result }}</p>
          </div> -->
        </div>
      </template>

      <!-- Input Manual -->
      <template v-else>
        <form
          class="w-full max-w-md bg-white p-6 rounded-xl shadow-md"
          @submit="onSubmit"
        >
          <FormInput
            id="no_target"
            v-model="no_target"
            label-text="Nomor Target"
            :is-required-label="true"
            type="text"
            name="no_target"
            placeholder="Masukkan Nomor Target"
            :error="errors.no_target"
            @input="(e: Event) => no_target = (e.target as HTMLInputElement).value.toUpperCase()"
          />
          <Button class="w-full mt-4" type="submit" :disabled="!isFormFull">{{
            isLoading ? "Loading..." : "Submit"
          }}</Button>
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
// import { StreamBarcodeReader } from "vue-barcode-reader"
import { QrcodeStream, type DetectedBarcode } from "vue-qrcode-reader"
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

const hitApiScoring = async (arrow_id: string) => {
  loadingStore.start();
	isLoading.value = true

	try {
    const response = await apiLakumanah.post(urlApiScoringScan, {
      "arrow_id": arrow_id,
      "rambahan": rambahanId.value

		});

		const { data , message } = response;
    console.log(data);

		notify.success(message);
    navigateTo({
      path: '/rambahan/' + rambahanId.value + '/scoring',
      query: {
        arrow_id: arrow_id,
        rambaha: rambahanId.value
      },
      replace: true
    });
    // router.push(`/rambahan/${rambahanId.value}/scoring`);

	} catch (error: unknown) {
		handleValidationError(error, setErrors)

    navigateTo({
      path: '/rambahan/' + rambahanId.value + '/scan-error',
      query: {
        message: error.message,
      },
      replace: true
    });

		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
		loadingStore.stop();
	}
}

const onSubmit = handleSubmit(async (values) => {
  await hitApiScoring(values.no_target);
});

// dipanggil saat kamera berhasil diinisialisasi
function onInit(promise: Promise<void>): void {
  promise
    .then(() => {
      console.log("Kamera siap dipakai")
    })
    .catch((err: unknown) => {
      console.error("Gagal inisialisasi kamera:", err)
    })
}

// dipanggil saat QR code terdeteksi
async function onDetect(detectedCodes: DetectedBarcode[]): Promise<void> {
  if (!detectedCodes || detectedCodes.length === 0) return

  const [firstCode] = detectedCodes
  if (!firstCode) return

  const code: string = firstCode.rawValue

  await hitApiScoring(code);
}
</script>
