<script setup lang="ts">
import { ref, watch } from "vue";
import { Splat3Weapon } from "@/services/weapons";
import { getSpecialUpData } from "@/services/abilities/specialUp";
import { onVersionChanged } from "@/services/version";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import StatsGrid from "../StatsGrid.vue";

const props = defineProps({
    weapon: String,
});

const effects = ref<EffectAndTitleData[]>([]);
const ap = ref(0);
const selectedWeapon = ref<Splat3Weapon | null>(null);

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        const statsData = await getSpecialUpData(weapon);
        effects.value = statsData;
        selectedWeapon.value = weapon;
    }
    else {
        effects.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}

onVersionChanged(v => {
    if (selectedWeapon.value != null) {
        onWeaponChanged(selectedWeapon.value);
    }
});
</script>
<template>
    <AbilityWithWeaponSelection :weapon="props.weapon" ability-img="SpecialSpec_Up.png" effect-name="specialSpecUp"
        @weapon-changed="onWeaponChanged" @ap-changed="onApChanged">
    </AbilityWithWeaponSelection>
    <StatsGrid :ap="ap" :stats="effects"></StatsGrid>
</template>