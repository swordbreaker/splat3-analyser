import { defineStore } from 'pinia'
import { Splat3Weapon } from '@/services/weapons'
import { ref } from 'vue';

export const useSelectedWeaponStore = defineStore('selectedWeapon', () => {
    const weapon = ref<Splat3Weapon>();
    return weapon;
})