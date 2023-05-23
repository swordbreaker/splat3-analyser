<script setup lang="ts">
import { defineProps, ref } from "vue";
import { getSwimSpeedData, EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectData>();
const selectedWeapon = ref<Splat3Weapon | null>(null);

if (props.weapon != null && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    effectData.value = await getSwimSpeedData(weapon);
    selectedWeapon.value = weapon;
}
</script>

<template>
    <BaseAbility
        :weapon="props.weapon"
        :effect-data="effectData"
        :effect-default="1"
        effect-name="swimSpeed"
        effect-display-name="Swimm Velocity"
        ability-img="SquidMove_Up.png"
        @weapon-changed="onWeaponChanged">
    </BaseAbility>
</template>