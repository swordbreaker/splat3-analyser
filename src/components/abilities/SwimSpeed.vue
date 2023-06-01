<script setup lang="ts">
import { ref } from "vue";
import { getAll } from "@/services/abilities/swimSpeed";
import { Splat3Weapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "@/components/abilities/headers/AbilityWithWeaponSelection.vue";

const abilityImg = "SquidMove_Up.png";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        const data = await getAll(weapon);
        effectData.value = data;
    }
    else {
        effectData.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>
<template>
    <section>
        <AbilityWithWeaponSelection :ability-img="abilityImg" :weapon="props.weapon" effect-name="swimSpeed"
            @weapon-changed="onWeaponChanged" @ap-changed="onApChanged">
        </AbilityWithWeaponSelection>
        <StatsGrid :stats="effectData" :ap="ap"> </StatsGrid>
    </section>
</template>