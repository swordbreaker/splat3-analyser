<script setup lang="ts">
import { ref } from "vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import type { Splat3Weapon } from "@/services/weapons";
import { getAll } from "@/services/abilities/inkSaverSub";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import StatsGrid from "../StatsGrid.vue";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

async function onWeaponChanged(weapon: Splat3Weapon) {
    getAll(weapon).then((x) => (effectData.value = x));
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>

<template>
    <AbilityWithWeaponSelection
        :weapon="props.weapon"
        effect-name="inkSaverSub"
        ability-img="SubInk_Save.png"
        @on-ap-changed="onApChanged"
        @on-weapon-changed="onWeaponChanged">
    </AbilityWithWeaponSelection>
    <StatsGrid :ap="ap" :stats="effectData"></StatsGrid>
</template>