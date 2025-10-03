<template>
  <div class="relative content-participants p-4">
    <header
      class="fixed z-1 inset-x-0 w-full top-0 left-0 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.05)] h-[56px] max-h-[56px] filter backdrop-blur"
    >
      <AppContainer>
        <div class="flex items-center h-full justify-between">
          <div class="flex items-center gap-5">
            <AppButtonBack />
          </div>
          <div class="flex gap-2 items-center">
            <NuxtImg src="/images/logo-primary.png" alt="logo" class="size-9" />
            <div class="text-base font-bold font-lato">Scoring Sheet</div>
          </div>
          <div />
        </div>
      </AppContainer>
    </header>

    <!-- Body -->
    <div class="relative flex-1 w-full">
      <!-- Detail Scoring Community -->
      <div class="content-detail-scoring relative rounded-md overflow-hidden border">
        <NuxtImg
          src="/images/bg-scoring.png"
          alt="background"
          class="absolute w-full h-full object-fill -z-1 inset-0"
        />

        <div class="p-4 flex flex-col gap-2.5 font-lato">
          <h5 class="font-bold text-base text-white">{{ event_info?.name }}</h5>
          <ClientOnly>
            <div
              class="shadow bg-black/10 py-2 px-3 rounded-md flex flex-col gap-[5px] text-white"
            >
              <p class="text-xs font-bold opacity-80">Petugas Scoring</p>
              <p class="text-base font-bold">{{ user?.name }}</p>
              <p class="text-sm">{{ user?.email }}</p>
            </div>

            <div class="shadow bg-white py-2 px-3 rounded-md flex flex-col gap-[5px]">
              <p class="text-xs font-bold opacity-80 text-[#94A3B8]">Peserta</p>
              <p class="text-base font-bold">{{ participant?.name }}</p>
              <p class="text-sm">{{ participant?.nik }}</p>
            </div>
          </ClientOnly>

          <div
            class="shadow bg-white py-2 px-3 rounded-md flex flex-col items-center gap-[5px]"
          >
            <p class="text-base font-bold text-[#627086] text-center">
              Rambahan ke <span class="text-black font-extrabold">{{ rambahanId }}</span>
            </p>
          </div>
        </div>
      </div>

      <!-- List Scoring -->
      <div class="content-list-scoring mt-5 text-[#627086] font-lato">
        <!-- header -->
        <div class="flex justify-between">
          <p class="text-base">Scoring Panah</p>
          <div
            class="flex gap-1 text-red-500 items-center cursor-pointer"
            @click="clearAll"
          >
            <Icon name="ic:outline-refresh" class="text-2xl" />
            <span>Clear All</span>
          </div>
        </div>

        <!-- Body -->
        <form class="flex flex-col gap-2.5 mt-3">
          <!-- Panah 1 -->
          <div class="shadow-sm bg-white p-3 rounded-xl flex flex-col gap-2">
            <p class="text-sm font-bold text-black-gladhen">Panah 1</p>

            <div class="w-full">
              <div class="panahOne grid grid-cols-4 gap-3">
                <FormRadioArrow
                  v-model="panahOne"
                  :options="[
                    { value: '3', label: 'Head/Molo' },
                    { value: '2', label: 'Neck/Jangga' },
                    { value: '1', label: 'Body/Awak' },
                    { value: '-1', label: 'Buttock/Bol' },
                  ]"
                />
                <!-- Error message for panahOne -->
                <FormMessageError
                  v-if="errors.panahOne && panahOneTouched"
                  :message="errors.panahOne"
                />
              </div>
            </div>
          </div>

          <!-- Panah 2 -->
          <div class="shadow-sm bg-white p-3 rounded-xl flex flex-col gap-2">
            <p class="text-sm font-bold text-black-gladhen">Panah 2</p>

            <div class="w-full">
              <div class="panahTwo grid grid-cols-4 gap-3">
                <FormRadioArrow
                  v-model="panahTwo"
                  :options="[
                    { value: '3', label: 'Head/Molo' },
                    { value: '2', label: 'Neck/Jangga' },
                    { value: '1', label: 'Body/Awak' },
                    { value: '-1', label: 'Buttock/Bol' },
                  ]"
                />
                <!-- Error message for panahTwo -->
                <FormMessageError
                  v-if="errors.panahTwo && panahTwoTouched"
                  :message="errors.panahTwo"
                />
              </div>
            </div>
          </div>

          <!-- Panah 3 -->
          <div class="shadow-sm bg-white p-3 rounded-xl flex flex-col gap-2">
            <p class="text-sm font-bold text-black-gladhen">Panah 3</p>

            <div class="w-full">
              <div class="panahThree grid grid-cols-4 gap-3">
                <FormRadioArrow
                  v-model="panahThree"
                  :options="[
                    { value: '3', label: 'Head/Molo' },
                    { value: '2', label: 'Neck/Jangga' },
                    { value: '1', label: 'Body/Awak' },
                    { value: '-1', label: 'Buttock/Bol' },
                  ]"
                />
                <!-- Error message for panahThree -->
                <FormMessageError
                  v-if="errors.panahThree && panahThreeTouched"
                  :message="errors.panahThree"
                />
              </div>
            </div>
          </div>

          <!-- Panah 4 -->
          <div class="shadow-sm bg-white p-3 rounded-xl flex flex-col gap-2">
            <p class="text-sm font-bold text-black-gladhen">Panah 4</p>

            <div class="w-full">
              <div class="panahFour grid grid-cols-4 gap-3">
                <FormRadioArrow
                  v-model="panahFour"
                  :options="[
                    { value: '3', label: 'Head/Molo' },
                    { value: '2', label: 'Neck/Jangga' },
                    { value: '1', label: 'Body/Awak' },
                    { value: '-1', label: 'Buttock/Bol' },
                  ]"
                />
                <!-- Error message for panahFour -->
                <FormMessageError
                  v-if="errors.panahFour && panahFourTouched"
                  :message="errors.panahFour"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="fixed w-full z-10 bottom-0 left-0 bg-grey py-4">
      <Dialog v-model:open="sureOpen">
        <DialogTrigger as-child>
          <AppContainer>
            <Button class="w-full flex items-center gap-1" type="button">
              <span>Simpan Score</span>
            </Button>
          </AppContainer>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px] p-4 text-center">
          <DialogHeader>
            <DialogDescription>
              <p class="text-center text-lg font-bold mb-2 mt-3 text-black">
                Simpan Data Scoring?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter class="mt-1">
            <div
              class="flex items-center justify-between gap-4 w-full overflow-hidden !ring-none"
            >
              <DialogClose
                as-child
                class="flex-1 w-full focus-visible:ring-0 focus-visible:outline-none"
              >
                <Button variant="outline" class="w-full">Batal</Button>
              </DialogClose>
              <Button
                class="flex-1 w-full focus-visible:ring-0 focus-visible:outline-none"
                @click="submit"
                >Ya</Button
              >
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <Transition name="fade">
			<ToastScoring v-if="showSuccessAddScoring" @close="showSuccessAddScoring = false" @confirm="handleConfirm" />
		</Transition>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

// bikin computed biar reactive
const participantStore = useParticipantStore();
const authStore = useAuthStore();
const rambahanId = computed(() => route.params.id);
const user = computed(() => authStore.user);
const participant = computed(() => participantStore.participant);
const event_info = computed(() => participantStore.event_info);
const isLoading = ref(false);
const sureOpen = ref(false)
const loadingStore = useLoadingStore();
const showSuccessAddScoring = ref(false)


const title = computed(() => `Detail Rambahan ke-${rambahanId.value}`);

definePageMeta({
  layout: "default",
  isPaddingTop: true,
  isPaddingBottom: true,
  middleware: ["auth"],
});

useSeoMeta({
  title: title.value,
});

const panahOne = ref("");
const panahOneTouched = ref(false);
const panahTwo = ref("");
const panahTwoTouched = ref(false);
const panahThree = ref("");
const panahThreeTouched = ref(false);
const panahFour = ref("");
const panahFourTouched = ref(false);
const errors = reactive({
  panahOne: "",
  panahTwo: "",
  panahThree: "",
  panahFour: "",
});

const clearAll = () => {
  panahOne.value = "";
  panahOneTouched.value = false;
  panahTwo.value = "";
  panahTwoTouched.value = false;
  panahThree.value = "";
  panahThreeTouched.value = false;
  panahFour.value = "";
  panahFourTouched.value = false;
};

// ✅ Tambahkan handler untuk mencegah refresh tanpa konfirmasi
onMounted(() => {
  if (!authStore.user) {
    authStore.getUser();
  }

  const handler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue =
      "Apakah Anda yakin ingin merefresh halaman ini? Karena jika di refresh datanya akan dianggap sudah di submit.";
  };
  window.addEventListener("beforeunload", handler);

  // tambahan: kalau user beneran confirm refresh → redirect ke scan peserta
  window.addEventListener("unload", () => {
    participantStore.reset();
    router.replace("/");
  });

  onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handler);
  });
});

const storeScore = async () => {
  loadingStore.start();
	isLoading.value = true

	try {
    const response = await apiLakumanah.post(urlApiScoringInput, {
      "arrow_id": participant.value?.arrow_id,
      "rambahan": rambahanId.value,
      "arrow1": panahOne?.value ?? 0,
      "arrow2": panahTwo?.value ?? 0,
      "arrow3": panahThree?.value ?? 0,
      "arrow4": panahFour?.value ?? 0

		});

		const { message } = response;

		notify.success(message);
    clearAll();
    sureOpen.value = false
    showSuccessAddScoring.value = true

	} catch (error: unknown) {
    participantStore.reset();
    clearAll();
    handleValidationError(error)
    // router.replace("/")


		// Handle error (bisa tambahkan toast/notification)
	} finally {
		isLoading.value = false
		loadingStore.stop();
	}

};

const submit = () => {
  storeScore()
};


function handleConfirm(value: string) {
  if (value === "peserta") {
    router.replace("/rambahan/" + rambahanId.value + "/scan")
  } else if (value === "rambahan") {
    router.replace("/")
  }
}
</script>
