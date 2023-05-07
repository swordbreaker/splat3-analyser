<script setup lang="ts">
import { defineProps, ref } from "vue";
import WeaponList from "@/components/WeaponList.vue";
import EffectCard from "./EffectCard.vue";
import router from "@/router";
import { EffectData, getInksaverMainData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";

const props = defineProps({
    weapon: String,
});

const selectedWeapon = ref<Splat3Weapon | null>(null);
const effectData = ref<EffectData>();

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    router.push({ name: "inkSaverMain", params: { weapon: weapon.mainInfo.__RowId } });
    const data = await getInksaverMainData();
    effectData.value = data;
    selectedWeapon.value = weapon;
}
</script>

<template>
    <section>
        <WeaponList @change="onWeaponChanged" :selected-weapon="selectedWeapon"></WeaponList>

        <EffectCard
            v-if="selectedWeapon != null"
            :effect-data="effectData"
            effect-name="Consumption Rate Main"
            effect-img="/splat3/images/skill/MainInk_Save.png"></EffectCard>
    </section>
</template>