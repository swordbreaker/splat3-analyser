<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAll, getShotSpreadAir } from "@/services/abilities/intensifyAction";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import type { Splat3Weapon } from "@/services/weapons";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import { onVersionChanged } from "@/services/version";

const abilityImg = "Action_Up.png";

const props = defineProps<{
    weapon: string,
}>();

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);
let jumpSpreadId = 0;

onMounted(() => {
    loadData();
});

onVersionChanged(() => {
    loadData();
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}

async function onWeaponChanges(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        effectData.value[jumpSpreadId] = await getShotSpreadAir(weapon);
    }
    else {
        if (effectData.value.length > jumpSpreadId) {
            effectData.value.pop();
        }
    }
}

function loadData() {
    getAll().then((x) => {
        x.forEach((data) => {
            effectData.value.push(data);
        });
        jumpSpreadId = effectData.value.length;
    });
}
</script>

<template>
    <section>
        <AbilityWithWeaponSelection :weapon="props.weapon" :ability-img="abilityImg" effect-name="intensifyAction"
            @weapon-changed="onWeaponChanges" @ap-changed="onApChanged"></AbilityWithWeaponSelection>
        <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
    </section>
</template>