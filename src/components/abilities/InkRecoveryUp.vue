<script setup lang="ts">
import { onMounted, ref } from "vue";
import { EffectData, getInkRecoveryUpSwimming, getInkRecoveryUpStanding } from "@/services/calculate";
import EffectCard from "../EffectCard.vue";
import { baseUrl } from "@/services/util";

const swimmingData = ref<EffectData>();
const standingData = ref<EffectData>();

const swimmEffect = ref(0);
const standEffect = ref(0);

const ap = ref(0);
const abilityImg = "InkRecovery_Up.png";

onMounted(() => {
    loadData();
});

async function loadData() {
    swimmingData.value = await getInkRecoveryUpSwimming();
    standingData.value = await getInkRecoveryUpStanding();

    swimmEffect.value = swimmingData.value.getEffect(0)[0];
    standEffect.value = standingData.value.getEffect(0)[0];
}

function onApChanged(newAp: number) {
    ap.value = newAp;
    if (swimmingData.value != null) {
        swimmEffect.value = swimmingData.value.getEffect(newAp)[0];
    }
    if (standingData.value != null) {
        standEffect.value = standingData.value.getEffect(newAp)[0];
    }
}
</script>

<template>
    <section>
        <el-row>
            <el-col :md="24" :lg="24">
                <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
                <div class="ability-selector">
                    <AbilitySelector
                        :image="`${baseUrl}splat3/images/skill/${abilityImg}`"
                        @changed="onApChanged"></AbilitySelector>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :md="24" :lg="12" v-if="swimmingData != null">
                <EffectCard title="Ink Recovery Frames - Swimming" :ap="ap" :effect-data="swimmingData"></EffectCard>
            </el-col>
            <el-col :md="24" :lg="12" v-if="standingData != null">
                <EffectCard title="Ink Recovery Frames - Standing" :ap="ap" :effect-data="standingData"></EffectCard>
            </el-col>
            <slot />
        </el-row>
    </section>
</template>
