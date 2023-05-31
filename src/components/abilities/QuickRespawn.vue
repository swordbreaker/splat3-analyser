<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getRawData, getQuickRespawnSecondsData } from "@/services/abilities/quickRespawn";
import StatsGrid from "../StatsGrid.vue";
import AbilitySelection from "./headers/AbilitySelection.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import { onVersionChanged } from "@/services/version";

const abilityImg = "RespawnTime_Save.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effects = computed(() => {
    if (rawEffects.value.length == 2) {
        const secondData = getQuickRespawnSecondsData(rawEffects.value[0].data, rawEffects.value[1].data, killedByRp.value, hasTacticooler.value, hasRp.value);
        return rawEffects.value.concat([secondData]);
    }
    return [];
});
const rawEffects = ref<EffectAndTitleData[]>([]);
const killedByRp = ref(false);
const hasTacticooler = ref(false);
const hasRp = ref(false);

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
    getRawData()
        .then(x => rawEffects.value = x);
}
</script>

<template>
    <section>
        <AbilitySelection :ability-img="abilityImg" @ap-changed="onApChanged">
        </AbilitySelection>
        <StatsGrid :stats="effects" :ap="ap"> </StatsGrid>
    </section>
</template>