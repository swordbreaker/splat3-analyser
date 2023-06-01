<script setup lang="ts">
import { ref } from "vue";
import { getAll } from "@/services/abilities/runSpeed";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import type StatsGrid from "../StatsGrid.vue";
import Toggle from "../Toggle.vue";
import { getAbilityImage } from "@/services/util";

const abilityImg = "HumanMove_Up.png";

const props = defineProps<{
    weapon: string | undefined,
}>();

const ap = ref(0);
const stats = ref<EffectAndTitleData[]>([]);
const hasOpenGambit = ref(false);

function onWeaponChanged(weapon: Splat3Weapon) {
    getAll(weapon)
        .then(x => stats.value = x);
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}

function onOpenGambitChanged(value: boolean) {
    ap.value = ap.value + (value ? 30 : -30);
}

</script>
<template>
    <AbilityWithWeaponSelection
        :weapon="props.weapon"
        :ability-img="abilityImg"
        effect-name="runSpeed"
        @weapon-changed="onWeaponChanged"
        @ap-changed="onApChanged">
    </AbilityWithWeaponSelection>
    <Toggle name="Opening Gambit" :img="getAbilityImage('StartAllUp.png')" @change="onOpenGambitChanged"></Toggle>

    <StatsGrid :ap="ap" :stats="stats"></StatsGrid>
</template>