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

const effects = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        getAll(weapon).then((x) => (effects.value = x));
    }
    else {
        effects.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>

<template>
    <AbilityWithWeaponSelection :weapon="props.weapon" effect-name="inkSaverSub" ability-img="SubInk_Save.png"
        @ap-changed="onApChanged" @weapon-changed="onWeaponChanged">
    </AbilityWithWeaponSelection>
    <StatsGrid :ap="ap" :stats="effects"></StatsGrid>
</template>