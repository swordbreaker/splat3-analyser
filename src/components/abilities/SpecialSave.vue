<script setup lang="ts">
import { defineProps, ref } from "vue";
import { getSpecialSaveData, EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectData>();
const selectedWeapon = ref<Splat3Weapon | null>(null);

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    effectData.value = await getSpecialSaveData();
    selectedWeapon.value = weapon;
}

</script>
<template>
    <BaseAbility
        :weapon="props.weapon"
        :effect-data="effectData"
        :effect-default="1"
        effect-name="specialSave"
        effect-display-name="Special Gauge Rate After Respawn"
        ability-img="RespawnSpecialGauge_Save.png"
        @weapon-changed="onWeaponChanged">
    </BaseAbility>
</template>