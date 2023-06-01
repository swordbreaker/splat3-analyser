<script setup lang="ts">
import { ref } from "vue";
import WeaponList from "@/components/WeaponSelector.vue";
import router from "@/router";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import StatsCard from "@/components/StatsCard.vue";
import { baseUrl } from "@/services/util";

const props = defineProps<{
    effectName: string;
    weapon: string | undefined;
    abilityImg: string;
}>();

const emit = defineEmits<{
    (e: "weapon-changed", weapon: Splat3Weapon | undefined): void;
    (e: "ap-changed", ap: number): void;
}>();

const selectedWeapon = ref<Splat3Weapon | undefined>(undefined);
const ap = ref(0);

if (props.weapon != undefined && props.weapon != "") {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    if(weapon != undefined){
        router.push({ name: props.effectName, params: { weapon: weapon.mainInfo.__RowId } });
    }
    selectedWeapon.value = weapon;
    emit("weapon-changed", weapon);
}

function onApChanged(newAp: number) {
    emit("ap-changed", newAp);
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
                <AbilitySelector
                    :image="`${baseUrl}splat3/images/skill/${props.abilityImg}`"
                    @changed="onApChanged"></AbilitySelector>
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