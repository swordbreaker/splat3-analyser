<script setup lang="ts">
import { computed, ref } from "vue";
import { getAll } from "@/services/abilities/runSpeed";
import { Splat3Weapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "./headers/AbilityWithWeaponSelection.vue";
import type StatsGrid from "../StatsGrid.vue";
import Toggle from "../Toggle.vue";
import { getAbilityImage } from "@/services/util";
import { SkillImage } from "@/models/skill";
import { maxAp } from "@/services/calculate";

const props = defineProps<{
    weapon: string | undefined,
}>();

const ap = ref(0);
const apTotal = computed(() => {
    let total = ap.value;
    total += Number(hasOpenGambit.value) * 30;
    total += Number(hasComeback.value) * 10;
    total += Number(hasDropRoller.value) * 30;
    return Math.min(total, maxAp);
});
const stats = ref<EffectAndTitleData[]>([]);

const hasOpenGambit = ref(false);
const hasComeback = ref(false);
const hasDropRoller = ref(false);

function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if (weapon != undefined) {
        getAll(weapon)
            .then(x => stats.value = x);
    }
    else {
        stats.value = [];
    }
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>
<template>
    <AbilityWithWeaponSelection :weapon="props.weapon" :ability-img="SkillImage.RunSpeed" effect-name="runSpeed"
        @weapon-changed="onWeaponChanged" @ap-changed="onApChanged">
    </AbilityWithWeaponSelection>
    <div class="toggle-container">
        <Toggle name="Opening Gambit" :img="getAbilityImage(SkillImage.OpeningGambit)" @change="v => hasOpenGambit = v">
        </Toggle>
        <Toggle :img="getAbilityImage(SkillImage.Comeback)" name="Opening Gambit" @change="v => hasComeback = v"></Toggle>
        <Toggle :img="getAbilityImage(SkillImage.DropRoller)" name="Drop Roller" @change="v => hasDropRoller = v"></Toggle>
    </div>
    <StatsGrid :ap="apTotal" :stats="stats"></StatsGrid>
</template>