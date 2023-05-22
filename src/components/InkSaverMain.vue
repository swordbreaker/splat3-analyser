<script setup lang="ts">
import { computed,  ref } from "vue";
import WeaponList from "@/components/WeaponList.vue";
import EffectCard from "./EffectCard.vue";
import router from "@/router";
import { EffectData, MaxShotWithFullTankData, getInksaverMainData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import StatsCard from "./StatsCard.vue";
import PlotCard from "./PlotCard.vue";

const props = defineProps({
    weapon: String,
});

const selectedWeapon = ref<Splat3Weapon | null>(null);
const effectData = ref<EffectData>();
const effect = ref(1);
const ap = ref(0);
const shotsWithFullTankData = ref<MaxShotWithFullTankData>();

const shotsWithFullTank = computed(() => {
    console.log(selectedWeapon.value?.mainParams.GameParameters.WeaponParam);
    if (selectedWeapon.value?.mainParams.GameParameters.WeaponParam == null) {
        return null;
    }
    return 1 / (selectedWeapon.value?.mainParams.GameParameters.WeaponParam.InkConsume * effect.value);
});

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    router.push({ name: "inkSaverMain", params: { weapon: weapon.mainInfo.__RowId } });
    const data = await getInksaverMainData();
    effectData.value = data;
    shotsWithFullTankData.value = new MaxShotWithFullTankData(effectData.value, weapon);

    selectedWeapon.value = weapon;
}

function onEffectChanged(newEffect: number, newAp: number) {
    effect.value = newEffect;
    ap.value = newAp;
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
            effect-img="/splat3/images/skill/MainInk_Save.png">
        </EffectCard>

        <div>
            <StatsCard
                v-if="shotsWithFullTank != null"
                :value="shotsWithFullTank"
                title="Number of shot with full Tank"
                :biggerIsBetter="true"></StatsCard>
            <PlotCard
                v-if="shotsWithFullTankData != null"
                effect-name="Number of shot with full Tank"
                :ap="ap"
                :effect-data="shotsWithFullTankData"></PlotCard>
        </div>
    </section>
</template>
