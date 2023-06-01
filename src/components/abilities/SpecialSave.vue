<script setup lang="ts">
import { ref } from "vue";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import { getAll } from "@/services/abilities/specialSave";

const props = defineProps<{
    weapon: string,
}>();

const stats = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        stats.value = await getAll();
    }
    else {
        stats.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>
<template>
    <AbilityWithWeaponSelection :weapon="props.weapon" effect-name="specialSave" ability-img="RespawnSpecialGauge_Save.png"
        @weapon-changed="onWeaponChanged" @ap-changed="onApChanged">
    </AbilityWithWeaponSelection>
    <StatsGrid :ap="ap" :stats="stats"></StatsGrid>
</template>