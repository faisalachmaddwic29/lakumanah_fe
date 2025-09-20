<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-8">
      <!-- Skeleton Image -->
      <Skeleton class="size-[200px] rounded-full" />

      <!-- Skeleton Text -->
      <div class="text-center pt-10 pb-8 w-full flex flex-col items-center">
        <Skeleton class="h-4 w-48 mb-4" />
        <Skeleton class="h-3 w-64 mb-3" />
        <Skeleton class="h-3 w-52" />
      </div>

      <!-- Skeleton Buttons -->
      <div class="flex flex-col gap-5 w-full">
        <Skeleton class="h-10 w-full rounded-sm" />
        <Skeleton class="h-10 w-full rounded-sm" />
      </div>
    </div>
</template>
