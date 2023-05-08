<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import AbilitySelecter from "./AbilitySelecter.vue";
import { EffectData } from "@/services/calculate";
import Plotly from "plotly.js-dist-min";
import StatsCard from "./StatsCard.vue";

const props = defineProps({
    effectData: EffectData,
    effectName: String,
    effectImg: String,
    biggerIsBetter: Boolean,
});

const emit = defineEmits<{
    (e: "changed", effect: number, ap: number): void
}>();

const prevAp = ref(0);
const ap = ref(0);
const effect = ref(0);
const plotData = [] as Plotly.Data[];

watch(() => props.effectData, async (_, newVal) =>{
    if(newVal == null) return;
    updatePlot();
});

onMounted(() => {
    plotData.push({
        x: props.effectData?.aps,
        y: props.effectData?.effect,
        mode: "lines+markers",
    } as Plotly.ScatterData);
    plotData.push({
        x: [ap.value],
        y: [effect.value ?? 0],
        mode: "markers",
        marker: {
            size: 10,
            color: 'red',
            symbol: "diamond-open-dot",
            line:{
                width: 2,
            }
        },
    });
    // plotData.push({
    //     x: props.effectData?.aps,
    //     y: props.effectData?.effect,
    //     mode: "lines+markers",
    // });

    // @ts-ignore
    const layout: Plotly.Layout = {
        xaxis: { title: "AP" },
        yaxis: { title: props.effectName },
    };
    Plotly.newPlot("gd", plotData, layout, { responsive: true });

    onApChanged(0);
});


function updatePlot() {
    // @ts-ignore
    plotData[0]["x"] = props.effectData?.aps;
    // @ts-ignore
    plotData[0]["y"] = props.effectData?.effect;

    // @ts-ignore
    plotData[1]["x"] = [ap.value];
    // @ts-ignore
    plotData[1]["y"] = [effect.value];

    // if (props.effectData != null) {
    //     const a: number[] = [];
    //     const aps = [];
    //     const effect = props.effectData.effect;
    //     for (let i = 1; i < effect.length - 1; i++) {
    //         a[i - 1] = effect[i] - effect[i - 1];
    //         aps[i] = props.effectData.aps[i];
    //     }

    //     // @ts-ignore
    //     plotData[2]["x"] = aps;
    //     // @ts-ignore
    //     plotData[2]["y"] = a;
    // }

    Plotly.redraw("gd");
}

function onApChanged(abilityPoint: number) {
    prevAp.value = ap.value;
    ap.value = abilityPoint;

    if(props.effectData != null){
        effect.value = props.effectData.getEffect(ap.value)[0];
        updatePlot();
        emit("changed", effect.value, ap.value);
    }
}
</script>

<template>
    <div class="row">
        <div>
            <el-row>
                <el-col :span="12">
                    <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
                </el-col>
                <el-col :span="12">
                    <StatsCard :title="props.effectName" :value="effect" :bigger-is-better="props.biggerIsBetter"></StatsCard>
                </el-col>
            </el-row>

            <AbilitySelecter :image="props.effectImg" @changed="onApChanged"></AbilitySelecter>
        </div>
        <div>
            <div id="gd"></div>
        </div>
    </div>
</template>

<style scoped>
.row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>