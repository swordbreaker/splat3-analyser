<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import AbilitySelector from "../AbilitySelector.vue";
import { baseUrl } from "@/services/util";
import StatsGrid from "../StatsGrid.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import {
    getArmorHpData,
    getDamageLimitData,
    getDamagePerFrameData,
    getJumpVelocityData,
    getMoveVelocityData,
    getMoveVelocityShootingData,
    getMoveVelocityShootingKData,
} from "@/services/abilities/inkResistanceUp";

const abilityImg = "OpInkEffect_Reduction.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<EffectAndTitleData[]>([]);

onMounted(() => {
    const stats = [
        getArmorHpData(),
        getDamageLimitData(),
        getDamagePerFrameData(),
        getJumpVelocityData(),
        getMoveVelocityData(),
        getMoveVelocityShootingData(),
        getMoveVelocityShootingKData(),
    ];

    Promise.all(stats).then((x) => {
        x.forEach(x => {
            effectData.value.push(x);
        });
    });
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}
</script>

<template>
    <section>
        <el-row>
            <el-col :md="24" :lg="24">
                <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
                <AbilitySelector
                    :image="`${baseUrl}splat3/images/skill/${abilityImg}`"
                    @changed="onApChanged"></AbilitySelector>
            </el-col>
        </el-row>

        <StatsGrid :stats="effectData" :ap="ap"> </StatsGrid>
    </section>
</template>
