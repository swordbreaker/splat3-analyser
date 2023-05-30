<script setup lang="ts">
import { ref } from "vue";
import { getAll } from "@/services/abilities/swimSpeed";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "@/components/abilities/headers/AbilityWithWeaponSelection.vue";

const abilityImg = "SquidMove_Up.png";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

// if (props.weapon != null && props.weapon != "") {
//     getWeapon(props.weapon)
//         .then(getSwimSpeedData)
//         .then(data => {effectData.value = data; });
// }

async function onWeaponChanged(weapon: Splat3Weapon) {
    const data = await getAll(weapon);
    effectData.value = data;
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>

<!-- effectName: string;
effectDisplayName: string;
weapon: string | undefined;
effectData: EffectData | undefined;
abilityImg: string; -->

<template>
    <section>
        <AbilityWithWeaponSelection
            :ability-img="abilityImg"
            :weapon="props.weapon"
            effect-name="swimSpeed"
            @weapon-changed="onWeaponChanged"
            @ap-changed="onApChanged">
        </AbilityWithWeaponSelection>
        <StatsGrid :stats="effectData" :ap="ap"> </StatsGrid>
    </section>
</template>
