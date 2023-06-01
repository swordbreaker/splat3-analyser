<script setup lang="ts">
import { ref } from "vue";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import { getSubPowerUpData } from "@/services/abilities/subPowerUp";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";

const abilityImg = "SubSpec_Up.png";

const props = defineProps<{
    weapon: string,
}>();

const effectData = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        const statsData = await getSubPowerUpData(weapon);
        effectData.value = statsData;
    }
    else {
        effectData.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>
<template>
    <AbilityWithWeaponSelection :weapon="props.weapon" :ability-img="abilityImg" effect-name="subPowerUp"
        @weapon-changed="onWeaponChanged" @ap-changed="onApChanged"></AbilityWithWeaponSelection>
    <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
</template>