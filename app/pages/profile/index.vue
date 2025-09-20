<template>
  <div class="relative">
      <!-- Image -->
      <div class="absolute -z-1 inset-0 aspect-5/2 curved overflow-clip">
        <NuxtImg src="/images/bg-home.png" alt="background" class="w-full h-full object-fill" />
      </div>

      <header class="relative px-4 py-3.5 text-white flex items-center gap-5">
        <AppButtonBack :is-white="true" />
				<h3 class="text-xl font-extrabold font-manrope">Profile</h3>
			</header>

      <div class="relative mx-4 mt-8 flex flex-col space-y-5">
        <div class="bg-white w-full p-3 rounded-[15px] flex flex-col shadow-xl">

          <div class="flex flex-col gap-3">
            <ListItem label="Info Pribadi" :is-icon="false" @click="$router.push('/profile/info-pribadi')">
              <template #icon>
                <NuxtImg src="/images/items/user.svg" class="w-6 h-6" />
              </template>
            </ListItem>
          </div>

        </div>

        <div class="bg-white w-full p-3 rounded-[15px] shadow-xl mb-5 flex flex-col gap-3">
          <ListItem :is-icon="true" label="Tentang Lakumanah" @click="$router.push('/about')" />
          <ListItemHref
            as="a"
            label="Bantuan"
            :is-icon="false"
            href="https://wa.me/+628112550595?text=Hallo%20Lakumanah"
            target="_blank"
          >
            <template #icon>
              <NuxtImg src="/images/items/help-circle.svg" class="w-7 h-7" />
            </template>
          </ListItemHref>

          <Dialog>
            <DialogTrigger as-child>
              <ListItem label="Keluar akun" :is-icon="false" :is-red="true" >
                <template #icon>
                  <NuxtImg src="/images/items/logout.svg" class="w-6 h-6" />
                </template>
              </ListItem>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px] p-4 text-center">
              <DialogHeader>
                <DialogTitle class="mb-5 m-auto">
                    <div class="text-center inline-flex p-3.5 items-center justify-center shrink-0 size-15 rounded-full text-danger bg-danger-foreground">
                      <Icon name="solar:danger-triangle-outline" class="text-4xl" />
                    </div>
                </DialogTitle>
                <DialogDescription>
                  <p class="text-center text-lg font-bold mb-2 mt-3 text-black">Keluar dari Lakumanah</p>
                  <p class="text-center text-sm text-[#737373]">Apakah Kamu yakin ingin keluar?</p>
                </DialogDescription>
              </DialogHeader>
            <DialogFooter class="mt-8">
              <div class="flex items-center justify-between gap-4 w-full overflow-hidden !ring-none">
                <DialogClose as-child class="flex-1 w-full focus-visible:ring-0 focus-visible:outline-none">
                  <Button variant="outline" class="w-full">Batal</Button>
                </DialogClose>
                <Button class="flex-1 w-full focus-visible:ring-0 focus-visible:outline-none" @click="handleLogout">Keluar</Button>
              </div>
            </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

  </div>
</template>


<script lang="ts" setup>
const title = "Profile";

definePageMeta({
  layout: "default",
  title: title,
  middleware: "auth",
});

useSeoMeta({
  title: title,
});


// Ambil instance authStore
const authStore = useAuthStore();

// Ambil data user dari store
computed(() => authStore.user);

// Jalankan logika untuk memuat data pengguna
onMounted(() => {
  if (!authStore.user) {
    // Pulihkan user dari cookie jika hilang
    authStore.getUser();
  }
});

// const router = useRouter();

const handleLogout = () => {
  authStore.logout({ redirectTo: '/auth', callApi: true });
};

</script>
