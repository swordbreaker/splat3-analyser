<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { getAll, getShotSpreadAir } from "@/services/abilities/intensifyAction";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import type { Splat3Weapon } from "@/services/weapons";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";

const abilityImg = "Action_Up.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);
let jumpSpreadId = 0;

onMounted(() => {
    getAll().then((x) => {
        x.forEach((data) => {
            effectData.value.push(data);
        });
        jumpSpreadId = effectData.value.length;
    });
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}

async function onWeaponChanges(weapon: Splat3Weapon) {
    effectData.value[jumpSpreadId] = await getShotSpreadAir(weapon);
}
</script>

<template>
    <section>
        <AbilityWithWeaponSelection
            :weapon="props.weapon"
            :ability-img="abilityImg"
            effect-name="intensifyAction"
            @weapon-changed="onWeaponChanges"
            @ap-changed="onApChanged"></AbilityWithWeaponSelection>
        <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
    </section>
</template>