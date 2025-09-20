import type { LayoutData } from "~/types/component/index";

export default defineNuxtRouteMiddleware((to) => {
  const layoutData = useState('layoutData', (): LayoutData => ({
    isPaddingTop: false,
    isPaddingBottom: false,
    noPadding: false,
    title: null,
  }));

  // Cast meta properties to boolean
  if (to.meta) {
    layoutData.value = {
      isPaddingTop: Boolean((to.meta as Record<string, never>).isPaddingTop),
      isPaddingBottom: Boolean((to.meta as Record<string, never>).isPaddingBottom),
      noPadding: Boolean((to.meta as Record<string, never>).noPadding),
      title: to.meta.title as string,

    };
  }
  // layoutData.value = {
  //   isPaddingTop: Boolean((to.meta as Record<string, never>).isPaddingTop),
  //   isPaddingBottom: Boolean((to.meta as Record<string, never>).isPaddingBottom),
  //   title: to.meta.title as string,
  // 	noToolbar: Boolean((to.meta as Record<string, never>).noToolbar)
  // };
});
