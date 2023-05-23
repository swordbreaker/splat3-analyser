<script setup lang="ts">
import { defineProps, ref } from "vue";
import { getSpecialChargeUpData, EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import { getSpecialUpData, type StatsData } from "@/services/specialUp";
import EffectCard from "../EffectCard.vue";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectData>();
const title = ref<string>();
const ap = ref(0);
const selectedWeapon = ref<Splat3Weapon | null>(null);
const additionalStatsData = ref<StatsData[]>();

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    const statsData = await getSpecialUpData(weapon);
    effectData.value = statsData[0].effectData;
    title.value = statsData[0].title;
    selectedWeapon.value = weapon;
    additionalStatsData.value = statsData.slice(1);
}

function onApChanged(newAp: number, _newEffectValue: number) {
    ap.value = newAp;
}
</script>
<template>
    <BaseAbility
        :weapon="props.weapon"
        :effect-data="effectData"
        :effect-default="1"
        effect-name="specialSpecUp"
        :effect-display-name="title"
        ability-img="SpecialSpec_Up.png"
        @weapon-changed="onWeaponChanged"
        @ap-changed="onApChanged">
        <el-col :md="24" :lg="12" v-for="data in additionalStatsData">
            <EffectCard :title="data.title" :effect-data="data.effectData" :ap="ap"> </EffectCard>
        </el-col>
    </BaseAbility>
</template>
