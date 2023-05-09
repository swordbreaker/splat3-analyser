<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
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

function onApChanged(newAp: number) {
    ap.value = newAp;
    if (effectData.value != null) {
        effect.value = effectData.value.getEffect(ap.value)[0];
    }
}
</script>

<template>
    <section>
        <el-row>
            <el-col :md="24" :lg="12">
                <WeaponList @change="onWeaponChanged" :selected-weapon="selectedWeapon"></WeaponList>
            </el-col>
            <el-col :md="24" :lg="12">
                <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
                <div class="ability-selector">
                    <AbilitySelector image="/splat3/images/skill/MainInk_Save.png" @changed="onApChanged"></AbilitySelector>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="24" :lg="12" v-if="effectData != null">
                <StatsCard title="Consumption Rate Main" :value="effect" :bigger-is-better="false"></StatsCard>
                <PlotCard effect-name="Number of shot with full Tank" :ap="ap" :effect-data="effectData"></PlotCard>
            </el-col>
            <el-col :md="24" :lg="12" v-if="shotsWithFullTankData != null && shotsWithFullTank != null">
                <StatsCard :value="shotsWithFullTank" title="Number of shot with full Tank"
                    :biggerIsBetter="true"></StatsCard>
                <PlotCard effect-name="Number of shot with full Tank" :ap="ap" :effect-data="shotsWithFullTankData">
                </PlotCard>
            </el-col>
        </el-row>
    </section>
</template>

<style scoped>
.ability-selector {
    margin: 10px;
    margin: auto;
    width: 100%;
}
</style>