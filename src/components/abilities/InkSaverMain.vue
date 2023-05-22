<script setup lang="ts">
import { computed, ref } from "vue";
import { EffectData, MaxShotWithFullTankData, getInksaverMainData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import StatsWithPlot from "../StatsWithPlot.vue";
import BaseAbility from "./BaseAbility.vue";

const props = defineProps<{
    weapon: string | undefined;
}>();

const effectData = ref<EffectData>();
const effect = ref(1);
const ap = ref(0);
const shotsWithFullTankData = ref<MaxShotWithFullTankData>();
const selectedWeapon = ref<Splat3Weapon>();

const shotsWithFullTank = computed(() => {
    if (selectedWeapon.value?.mainParams.GameParameters.WeaponParam == null) {
        return null;
    }
    return 1 / (selectedWeapon.value?.mainParams.GameParameters.WeaponParam.InkConsume * effect.value);
});

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
    effect.value = newEffectValue;
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
        <el-col :md="24" :lg="12" v-if="shotsWithFullTankData != null && shotsWithFullTank != null">
            <StatsWithPlot
                title="Number of shot with full Tank"
                :effect="shotsWithFullTank"
                :ap="ap"
                :effect-data="shotsWithFullTankData">
            </StatsWithPlot>
        </el-col>
    </BaseAbility>
</template>
