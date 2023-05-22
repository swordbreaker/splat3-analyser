<script setup lang="ts">
import { defineProps, ref } from "vue";
import { getRunSpeedData, EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";

const props = defineProps<{
    weapon: string | undefined,
}>();

const effectData = ref<EffectData>();
const selectedWeapon = ref<Splat3Weapon | null>(null);

if (props.weapon != undefined && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    effectData.value = await getRunSpeedData(weapon);
    selectedWeapon.value = weapon;
}

</script>
<template>
    <BaseAbility
        v-if="effectData != null"
        :weapon="props.weapon"
        :effect-data="effectData"
        effect-name="runSpeed"
        effect-display-name="Move Velocity Rate"
        ability-img="HumanMove_Up.png"
        @weapon-changed="onWeaponChanged">
    </BaseAbility>
</template>