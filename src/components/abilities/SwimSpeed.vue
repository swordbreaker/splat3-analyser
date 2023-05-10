<script setup lang="ts">
import { defineProps, ref } from "vue";
import WeaponList from "@/components/WeaponSelector.vue";
import router from "@/router";
import { getSwimSpeedData, EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";

const props = defineProps({
    weapon: String,
});

const selectedWeapon = ref<Splat3Weapon | null>(null);
const swimmSpeedData = ref<EffectData>();

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    router.push({ name: "swimmSpeed", params: { weapon: weapon.mainInfo.__RowId } });
    const data = await getSwimSpeedData(weapon);
    swimmSpeedData.value = data;
    selectedWeapon.value = weapon;
}
</script>

<template>
    <section>
        <WeaponList @change="onWeaponChanged" :selected-weapon="selectedWeapon"></WeaponList>

        <EffectCard
            v-if="selectedWeapon != null"
            :effect-data="swimmSpeedData"
            effect-name="Swimm Velocity"
            effect-img="/splat3/images/skill/SquidMove_Up.png"
            :bigger-is-better="true"></EffectCard>
    </section>
</template>