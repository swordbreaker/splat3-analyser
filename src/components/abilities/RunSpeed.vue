<script setup lang="ts">
import { ref } from "vue";
import { getAll } from "@/services/abilities/runSpeed";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import type StatsGrid from "../StatsGrid.vue";

const abilityImg = "HumanMove_Up.png";

const props = defineProps<{
    weapon: string | undefined,
}>();

const ap = ref(0);
const stats = ref<EffectAndTitleData[]>([]);

function onWeaponChanged(weapon: Splat3Weapon) {
    getAll(weapon)
        .then(x => stats.value = x);
}

async function onApChanged(newAp:number) {
    ap.value = newAp;
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
    <StatsGrid :ap="ap" :stats="stats"></StatsGrid>
</template>