<script setup lang="ts">
import { ref } from "vue";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import { getAll } from "@/services/abilities/inkSaverMain";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import StatsGrid from "../StatsGrid.vue";

const props = defineProps<{
    weapon: string | undefined;
}>();

const effects = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        getAll(weapon)
            .then(x => effects.value = x);
    }
    else{
        effects.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>

<template>
    <AbilityWithWeaponSelection :weapon="props.weapon" ability-img="MainInk_Save.png" effect-name="inkSaverMain"
        @weapon-changed="onWeaponChanged" @ap-changed="onApChanged">
    </AbilityWithWeaponSelection>

    <StatsGrid :ap="ap" :stats="effects"></StatsGrid>
</template>