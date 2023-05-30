<script setup lang="ts">
import { onMounted, ref } from "vue";
import StatsGrid from "../StatsGrid.vue";
import { getAll } from "@/services/abilities/superJump";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilitySelection from "./headers/AbilitySelection.vue";

const abilityImg = "JumpTime_Save.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);

onMounted(() => {
    getAll()
        .then(x => effectData.value = x);
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
