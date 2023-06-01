<script setup lang="ts">
import { onMounted, ref } from "vue";
import AbilitySelection from "./headers/AbilitySelection.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import StatsGrid from "../StatsGrid.vue";
import { getAll } from "@/services/abilities/inkRecoveryUp";
import { onVersionChanged } from "@/services/version";

const effectData = ref<EffectAndTitleData[]>([]);
const ap = ref(0);
const abilityImg = "InkRecovery_Up.png";

onMounted(() => {
    loadData();
});

onVersionChanged(x => {
    loadData();
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}

function loadData(){
    getAll()
        .then(x => effectData.value = x);
}
</script>

<template>
    <h1>Ink Recovery Up</h1>
    <section>
        <AbilitySelection :ability-img="abilityImg" @ap-changed="onApChanged"></AbilitySelection>
        <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
    </section>
</template>