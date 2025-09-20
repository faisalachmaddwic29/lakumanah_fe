<template>
  <div class="relative min-h-screen flex flex-col">
    <!-- <AppPopup /> -->
    <!-- Image -->
    <div class="absolute -z-1 inset-0 aspect-5/2 curved overflow-clip">
      <NuxtImg src="/images/bg-home.png" alt="background" class="w-full h-full object-fill" />
    </div>

    <!-- Toolbar -->
    <header class="relative px-4 py-2.5 text-white flex justify-between items-center">
      <div class="flex gap-2 items-center">
          <NuxtImg src="/images/logo.png" alt="logo" class="size-9" />
          <h3 class="text-xl font-extrabold font-lato">Lakumanah</h3>
      </div>
      <div class="size-9 bg-white rounded-full flex items-center justify-center cursor-pointer" @click="$router.push('/profile')">
        <Icon name="heroicons:user-solid" class="text-2xl text-primary" />
      </div>
    </header>

    <!-- Body -->
    <div class="relative flex-1 mt-4 w-full">
      <!-- Community -->
      <div class="content-community px-4">
        <ContentsHomeCommunityLoading v-if="!appStore.isCommunityLoaded" />

        <ContentsHomeCommunity v-else-if="appStore.community" :community="appStore.community" />
        <ContentsHomeNoCommunity v-else />
      </div>

      <!-- List Rambahan -->
      <div class="px-4 relative flex-1 my-4 w-full h-full">
        <ContentsHomeRambahan />
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>

const title = "Home";

definePageMeta({
  layout: "default",
  title: title,
  middleware: ['auth'],
});

useSeoMeta({
  title: title,
});

const appStore = useAppStore();

onMounted(() => {
    appStore.fetchCommunity();
})
</script>
