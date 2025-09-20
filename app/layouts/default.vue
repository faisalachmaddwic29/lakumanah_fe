<template>
  <AppWrapper>
    <AppMain :top="layoutData?.isPaddingTop ?? false" :bottom="layoutData?.isPaddingBottom ?? false">
      <slot />
    </AppMain>
  </AppWrapper>
</template>


<script setup lang="ts">
import type { LayoutData } from '~/types/component';

const layoutData = useState('layoutData', (): LayoutData => ({
    isPaddingTop: false,
    isPaddingBottom: false,
    noPadding: false,
    title: null,
}));
</script>

