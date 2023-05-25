<script setup lang="ts">
import { defineProps, ref } from "vue";
import { EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import EffectCard from "../EffectCard.vue";
import BaseAbility from "./BaseAbility.vue";
import { SubInfo } from "@/services/subs";
import { MaxSubsWithFullTankData, getInksaverSubData } from "@/services/abilities/inkSaverSub";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectData>();
const subInfo = ref<SubInfo>();
const ap = ref(0);
const subsWithFullTankData = ref<MaxSubsWithFullTankData>();
const selectedWeapon = ref<Splat3Weapon>();

if (props.weapon != null && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    effectData.value = await getInksaverSubData(weapon);
    subInfo.value = await weapon.getSubWeaponInfo();
    subsWithFullTankData.value = new MaxSubsWithFullTankData(effectData.value, subInfo.value);
    selectedWeapon.value = weapon;
}

function onApChanged(newAp: number, _newEffectValue: number){
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
        <el-col :md="24" :lg="12" v-if="subsWithFullTankData != null">
            <EffectCard
                title="Number of subs with full Tank"
                :ap="ap"
                :effect-data="subsWithFullTankData">
            </EffectCard>
        </el-col>
    </BaseAbility>
</template>