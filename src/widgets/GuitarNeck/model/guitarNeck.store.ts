import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNeckStore = defineStore('neck', () => {
	const fretsCount = ref<number>(12)

	return {
		fretsCount,
	}
})
