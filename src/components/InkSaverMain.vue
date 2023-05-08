<script setup lang="ts">
import { computed, defineProps, effect, ref } from "vue";
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
const effect = ref(1);

const shotsWithFullTank = computed(() => {
    console.log(selectedWeapon.value?.mainParams.GameParameters.WeaponParam);
    if(selectedWeapon.value?.mainParams.GameParameters.WeaponParam == null){
        return null;
    }
    return 1 / (selectedWeapon.value?.mainParams.GameParameters.WeaponParam.InkConsume * effect.value)});

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    router.push({ name: "inkSaverMain", params: { weapon: weapon.mainInfo.__RowId } });
    const data = await getInksaverMainData();
    effectData.value = data;
    selectedWeapon.value = weapon;
}

function onEffectChanged(newEffect: number){
    effect.value = newEffect;
}
</script>

<template>
    <section>
        <WeaponList @change="onWeaponChanged" :selected-weapon="selectedWeapon"></WeaponList>

        <EffectCard
            v-if="selectedWeapon != null"
            @changed="onEffectChanged"
            :effect-data="effectData"
            effect-name="Consumption Rate Main"
            effect-img="/splat3/images/skill/MainInk_Save.png"></EffectCard>

            <div>
                {{ shotsWithFullTank }}
            </div>
    </section>
</template>