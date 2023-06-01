<script setup lang="ts">
import { ref } from "vue";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import { getAll } from "@/services/abilities/specialChargeUp";

const props = defineProps({
    weapon: String,
});

const stats = ref<EffectAndTitleData[]>([]);
const ap = ref(0);
const selectedWeapon = ref<Splat3Weapon | null>(null);

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if(weapon != undefined){
        const data = await getAll(weapon);
        stats.value = data;
        selectedWeapon.value = weapon;
    }
    else{
        stats.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>
<template>
    <AbilityWithWeaponSelection
        :weapon="props.weapon"
        effect-name="specialIncreaseUp"
        ability-img="SpecialIncrease_Up.png"
        @weapon-changed="onWeaponChanged"
        @ap-changed="onApChanged">
    </AbilityWithWeaponSelection>
    <StatsGrid :stats="stats" :ap="ap"></StatsGrid>
</template>