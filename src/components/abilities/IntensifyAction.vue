<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import AbilitySelector from "../AbilitySelector.vue";
import { baseUrl } from "@/services/util";
import { getAll, getShotSpreadAir } from "@/services/abilities/intensifyAction";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import WeaponSelector from "../WeaponSelector.vue";
import type { Splat3Weapon } from "@/services/weapons";
import { getSuperJumpAirFramesData } from "@/services/abilities/superJump";

const abilityImg = "Action_Up.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);
let jumpSpreadId = 0;

onMounted(() => {
    getAll().then((x) => {
        x.forEach((data) => {
            effectData.value.push(data);
        });
        jumpSpreadId = effectData.value.length;
    });
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}

async function onWeaponChanges(weapon: Splat3Weapon) {
    effectData.value[jumpSpreadId] = await getShotSpreadAir(weapon);
}
</script>

<template>
    <section>
        <el-row>
            <el-col :md="24" :lg="12">
                <WeaponSelector :selectedWeapon="props.weapon" @change="onWeaponChanges"></WeaponSelector>
            </el-col>
            <el-col :md="24" :lg="12">
                <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
                <AbilitySelector
                    :image="`${baseUrl}splat3/images/skill/${abilityImg}`"
                    @changed="onApChanged"></AbilitySelector>
            </el-col>
        </el-row>

        <StatsGrid :stats="effectData" :ap="ap"></StatsGrid>
    </section>
</template>
