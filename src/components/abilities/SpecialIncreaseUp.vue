<script setup lang="ts">
import { ref } from "vue";
import { getSpecialChargeUpData, EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import { useVersion } from "@/stores/versionStore";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectData>();
const ap = ref(0);
const selectedWeapon = ref<Splat3Weapon | null>(null);

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    effectData.value = await getSpecialChargeUpData();
    selectedWeapon.value = weapon;
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
        effect-name="specialIncreaseUp"
        effect-display-name="Special Charge Up"
        ability-img="SpecialIncrease_Up.png"
        @weapon-changed="onWeaponChanged"
        @ap-changed="onApChanged">
    </BaseAbility>
</template>