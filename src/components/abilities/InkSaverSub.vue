<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { EffectData, MaxSubsWithFullTankData, getInksaverSubData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import StatsWithPlot from "../StatsWithPlot.vue";
import BaseAbility from "./BaseAbility.vue";
import { SubInfo } from "@/services/subs";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectData>();
const subInfo = ref<SubInfo>();
const effect = ref(1);
const ap = ref(0);
const subsWithFullTankData = ref<MaxSubsWithFullTankData>();
const selectedWeapon = ref<Splat3Weapon>();

const subsWithFullTank = computed(() => {
    if(subsWithFullTankData.value == null){
        return null;
    }
    return subsWithFullTankData.value.getEffect(ap.value)[0];
});

if (props.weapon != null && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    effectData.value = await getInksaverSubData(weapon);
    subInfo.value = await weapon.getSubWeaponInfo();
    subsWithFullTankData.value = new MaxSubsWithFullTankData(effectData.value, subInfo.value);
    selectedWeapon.value = weapon;
}

function onApChanged(newAp: number, newEffectValue: number){
    effect.value = newEffectValue;
    ap.value = newAp;
}
</script>

<template>
    <BaseAbility
        :weapon="props.weapon"
        :effect-data="effectData"
        effect-name="inkSaverSub"
        effect-display-name="Consumption Rate Sub"
        ability-img="SubInk_Save.png"
        @weapon-changed="onWeaponChanged"
        @ap-changed="onApChanged">
        <el-col :md="24" :lg="12" v-if="subsWithFullTankData != null && subsWithFullTank != null">
            <StatsWithPlot
                title="Number of subs with full Tank"
                :effect="subsWithFullTank"
                :ap="ap"
                :effect-data="subsWithFullTankData">
            </StatsWithPlot>
        </el-col>
    </BaseAbility>
</template>