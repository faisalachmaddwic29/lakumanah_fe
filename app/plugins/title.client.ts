import { defineNuxtPlugin, useHead } from "nuxt/app";

export default defineNuxtPlugin(() => {
  useHead({
    titleTemplate: (titleChunk) => { // ✅ Function bisa di plugin
      return titleChunk ? `Lakumanah - ${titleChunk}` : 'Lakumanah';
    }
  });
});
