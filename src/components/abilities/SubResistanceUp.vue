<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAll, getSubInfos } from "@/services/abilities/subResistanceUp";
import StatsGrid from "../StatsGrid.vue";
import AbilitySelection from "./headers/AbilitySelection.vue";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import { SplatSub } from "@/services/subs";

const abilityImg = "SubEffect_Reduction.png";

const props = defineProps({
    weapon: String,
});

const ap = ref(0);
const stats = ref<EffectAndTitleData[]>([]);
const subs = ref<SplatSub[]>([]);
const activeSubs = ref<Set<SplatSub>>(new Set<SplatSub>());

onMounted(() => {
    getSubInfos().then((x) => {
        subs.value = x;
    });
});

function onApChanged(newAp: number) {
    ap.value = newAp;
}

function onSubChecked(event: any, sub: SplatSub) {
    const checked = event.target.checked as boolean;
    if (checked) {
        activeSubs.value.add(sub);
    } else {
        activeSubs.value.delete(sub);
    }

    getAll(Array.from(activeSubs.value)).then((x) => (stats.value = x));
}
</script>

<template>
    <h1>Sub Resistance Up</h1>
    <section>
        <AbilitySelection :ability-img="abilityImg" @ap-changed="onApChanged"> </AbilitySelection>
        <div class="sub-container">
            <label class="sub" v-for="sub in subs">
                <input type="checkbox" @change="($e) => onSubChecked($e, sub)" />
                <img :src="sub.imageSrc" />
            </label>
            <el-tooltip placement="bottom" content="Sprinkler is also effected from Sub Resistance Up but I found no damage data for the Sprinkler.">
                <el-icon style="margin-left: 4px" :size="12">
                    <InfoFilled></InfoFilled>
                </el-icon>
            </el-tooltip>
        </div>
        <StatsGrid :stats="stats" :ap="ap"></StatsGrid>
    </section>
</template>

<style scoped lang="scss">
.sub-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}
.sub {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    background-color: gray;
    border-radius: 50%;

    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    img {
        width: 30px;
    }

    [type="checkbox"] + img {
        cursor: pointer;
        opacity: 0.5;
        margin: auto;
    }

    [type="checkbox"] {
        width: 40px;
    }

    [type="checkbox"]:checked + img {
        opacity: 1;
    }
}
</style>
