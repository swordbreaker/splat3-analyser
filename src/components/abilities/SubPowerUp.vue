<script setup lang="ts">
import { defineProps, ref } from "vue";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import { getSubPowerUpData } from "@/services/abilities/subPowerUp";
import EffectCard from "../EffectCard.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import {baseUrl} from "@/services/util";

const abilityImg = "SubSpec_Up.png";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectAndTitleData[]>([]);
const ap = ref(0);

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    const statsData = await getSubPowerUpData(weapon);
    effectData.value = statsData;
}

function onApChanged(newAp: number, _newEffectValue: number) {
    ap.value = newAp;
}
</script>
<template>
    <el-row>
        <el-col :md="24" :lg="12">
            <WeaponSelector :selectedWeapon="props.weapon" @change="onWeaponChanged"></WeaponSelector>
        </el-col>
        <el-col :md="24" :lg="12">
            <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
            <AbilitySelector
                :image="`${baseUrl}splat3/images/skill/${abilityImg}`"
                @changed="onApChanged"></AbilitySelector>
        </el-col>
    </el-row>

    <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
</template>