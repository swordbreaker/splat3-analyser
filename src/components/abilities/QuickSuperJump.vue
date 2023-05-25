<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { EffectData, getQuickRespawnYourCameraData } from "@/services/calculate";
import AbilitySelector from "../AbilitySelector.vue";
import { baseUrl } from "@/services/util";
import StatsGrid from "../StatsGrid.vue";
import {
    SuperJumpTotalTimeData,
    getSuperJumpChargeFramesData,
    getSuperJumpAirFramesData,
} from "@/services/abilities/superJump";
const abilityImg = "JumpTime_Save.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<{ title: string; data: EffectData }[]>([]);

onMounted(() => {
    Promise.all([getSuperJumpChargeFramesData(), getSuperJumpAirFramesData()]).then((x) => {
        effectData.value.push({
            title: "total super jump time",
            data: new SuperJumpTotalTimeData(x[0], x[1]),
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
