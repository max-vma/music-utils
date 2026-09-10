import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useNeckStore = defineStore('neck', () => {
  const fretsCount = ref<number>(12);

  return {
    fretsCount,
  };
});
