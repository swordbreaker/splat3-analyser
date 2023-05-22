<script setup lang="ts">
import { ref, watch } from "vue";
import WeaponList from "@/components/WeaponSelector.vue";
import router from "@/router";
import { EffectData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import StatsCard from "@/components/StatsCard.vue";
import StatsWithPlot from "../StatsWithPlot.vue";

const props = defineProps<{
    effectName: string,
    effectDisplayName: string,
    weapon: string | undefined;
    effectData: EffectData | null,
    abilityImg: string
}>();

const emit = defineEmits<{
    (e: "WeaponChanged", weapon: Splat3Weapon): void;
    (e: "ApChanged", ap: number, effect: number): void;
}>();

const selectedWeapon = ref<Splat3Weapon | undefined>(undefined);
const effect = ref(props.effectData?.getEffect(0)[0]);
const ap = ref(0);

if (props.weapon != undefined && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    router.push({ name: props.effectName, params: { weapon: weapon.mainInfo.__RowId } });
    selectedWeapon.value = weapon;
    emit("WeaponChanged", weapon);
}

watch(() => props.effectData, (newData: EffectData | null, _) => {
    if(newData != null){
        effect.value = newData.getEffect(ap.value)[0];
    }
});

function onApChanged(newAp: number) {
    ap.value = newAp;
    if(props.effectData != null){
        effect.value = props.effectData.getEffect(ap.value)[0];
        emit("ApChanged", newAp, effect.value);
    }
}
</script>

<template>
    <section>
        <el-row>
            <el-col :md="24" :lg="12">
                <WeaponList @change="onWeaponChanged" :selected-weapon="selectedWeapon"></WeaponList>
            </el-col>
            <el-col :md="24" :lg="12" v-if="selectedWeapon != null">
                <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
                <div class="ability-selector">
                    <AbilitySelector
                        :image="`/splat3/images/skill/${props.abilityImg}`"
                        @changed="onApChanged"></AbilitySelector>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="24" :lg="12" v-if="props.effectData != null && effect != null">
                <StatsWithPlot :title="props.effectDisplayName" :effect="effect" :ap="ap" :effect-data="props.effectData">
                </StatsWithPlot>
            </el-col>
            <slot />
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
