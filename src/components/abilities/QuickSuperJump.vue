<script setup lang="ts">
import { onMounted, ref } from "vue";
import StatsGrid from "../StatsGrid.vue";
import { getAll } from "@/services/abilities/superJump";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilitySelection from "./headers/AbilitySelection.vue";
import { onVersionChanged } from "@/services/version";

const abilityImg = "JumpTime_Save.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);

onMounted(() => {
    loadData();
});

onVersionChanged(v => {
    loadData();
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}

function loadData() {
    getAll()
        .then(x => effectData.value = x);
}
</script>

<template>
    <section>
        <AbilitySelection :ability-img="abilityImg" @ap-changed="onApChanged"></AbilitySelection>
        <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
    </section>
</template>
