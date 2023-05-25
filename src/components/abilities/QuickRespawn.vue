<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { EffectData, getQuickRespawnKillCameraData, getQuickRespawnYourCameraData } from "@/services/calculate";
import AbilitySelector from "../AbilitySelector.vue";
import { baseUrl } from "@/services/util";
import { QuickRespawnSecondsData } from "@/services/abilities/quickRespawn";
import StatsGrid from "../StatsGrid.vue";
const abilityImg = "RespawnTime_Save.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const effectData = ref<{ title: string; data: EffectData }[]>([]);

onMounted(() => {
    const a = getQuickRespawnKillCameraData().then((x) => {
        effectData.value.push({ title: "watching the splat cam frames", data: x });
        return x;
    });

    const b = getQuickRespawnYourCameraData().then((x) => {
        effectData.value.push({ title: "respawn animation frames", data: x });
        return x;
    });

    Promise.all([a, b]).then((x) => {
        effectData.value.push({
            title: "respawn time in seconds",
            data: new QuickRespawnSecondsData(x[0], x[1]),
        });
        effectData.value.push({
            title: "respawn time splatted by Respawn Punisher",
            data: new QuickRespawnSecondsData(x[0], x[1], true),
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