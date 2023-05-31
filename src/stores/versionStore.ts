import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useVersion = defineStore('version', () => {
    const version = ref<string>("400");
    return {version};
});