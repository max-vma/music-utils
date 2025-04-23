import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { DefaultLayout, EmptyLayout } from '@/app';

export const useLayoutStore = defineStore('layout', () => {
  const layouts = {
    DefaultLayout,
    EmptyLayout,
  };

  const currentLayout = ref<keyof typeof layouts>('DefaultLayout');

  const CurrentLayoutComponent = computed(() => layouts[currentLayout.value]);

  const setLayout = (layoutName: keyof typeof layouts) => {
    currentLayout.value = layoutName;
  };

  return {
    currentLayout,
    CurrentLayoutComponent,
    setLayout,
  };
});
