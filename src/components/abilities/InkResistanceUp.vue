<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import { getAll } from "@/services/abilities/inkResistanceUp";
import AbilitySelection from "./headers/AbilitySelection.vue";

const abilityImg = "OpInkEffect_Reduction.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);

onMounted(() => {
    getAll().then((x) => (effectData.value = x));
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>

<template>
    <section>
        <AbilitySelection :ability-img="abilityImg" @ap-changed="onApChanged"></AbilitySelection>
        <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
    </section>
</template>