<script setup lang="ts">
import { ref } from "vue";
import { EffectData, MaxShotWithFullTankData, getInksaverMainData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import BaseAbility from "./BaseAbility.vue";
import EffectCard from "../EffectCard.vue";

const props = defineProps<{
    weapon: string | undefined;
}>();

const effectData = ref<EffectData>();
const ap = ref(0);
const shotsWithFullTankData = ref<MaxShotWithFullTankData>();
const selectedWeapon = ref<Splat3Weapon>();


if (props.weapon != null && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    if (effectData.value == null) {
        effectData.value = await getInksaverMainData();
    }
    shotsWithFullTankData.value = new MaxShotWithFullTankData(effectData.value, weapon);
    selectedWeapon.value = weapon;
}

function onApChanged(newAp: number, newEffectValue: number) {
    ap.value = newAp;
}
</script>

<template>
    <BaseAbility
        :weapon="props.weapon"
        :effect-data="effectData"
        effect-name="inkSaverMain"
        effect-display-name="Consumption Rate Main"
        ability-img="MainInk_Save.png"
        @weapon-changed="onWeaponChanged"
        @ap-changed="onApChanged">
        <el-col :md="24" :lg="12" v-if="shotsWithFullTankData != null">
            <EffectCard
                title="Number of shot with full Tank"
                :ap="ap"
                :effect-data="shotsWithFullTankData">
            </EffectCard>
        </el-col>
    </BaseAbility>
</template>