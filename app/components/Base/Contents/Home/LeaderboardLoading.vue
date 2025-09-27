<template>
  <div class="bg-primary rounded-xl shadow-xl overflow-hidden">
    <!-- skeleton image -->
    <Skeleton class="w-full h-22.5" />

    <div class="content-community flex flex-col gap-2.5 px-3 pt-7 pb-4 bg-white">
      <!-- title -->
      <Skeleton class="h-6 w-2/3 rounded-md" />

      <!-- location -->
      <div class="flex items-center gap-2">
        <Skeleton class="size-6 rounded-md" />
        <Skeleton class="h-4 w-1/2 rounded-md" />
      </div>

      <!-- total participant -->
      <div class="flex items-center gap-2">
        <Skeleton class="size-6 rounded-md" />
        <Skeleton class="h-4 w-1/3 rounded-md" />
      </div>

      <!-- date -->
      <div class="flex items-center gap-2">
        <Skeleton class="size-6 rounded-md" />
        <Skeleton class="h-4 w-1/4 rounded-md" />
      </div>

      <!-- powered by -->
      <Skeleton class="w-full h-[29px] rounded-md" />
    </div>
  </div>
</template>
