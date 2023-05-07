<script setup lang="ts">
import { computed, defineProps, defineEmits, onMounted, ref, watch } from "vue";
import AbilitySelecter from "./AbilitySelecter.vue";
import { EffectData } from "@/services/calculate";
import Plotly from "plotly.js-dist-min";

const props = defineProps({
    effectData: EffectData,
    effectName: String,
    effectImg: String,
});

const emit = defineEmits<{
    (e: "changed", effect: number): void
}>();

const prevAp = ref(0);
const ap = ref(0);
const apChange = computed(() => ap.value - prevAp.value);
const effect = ref(0);
const prevEffect = ref(0);
const effectChange = computed(() => effect.value - prevEffect.value);
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
    prevEffect.value = effect.value;
    ap.value = abilityPoint;

    if(props.effectData != null){
        effect.value = props.effectData.getEffect(ap.value)[0];
        updatePlot();
        emit("changed", effect.value);
    }
}
</script>

<template>
    <div class="row">
        <div>
            <el-row>
                <el-col :span="12">
                    <div class="statistic-card">
                        <el-statistic title="AP" :value="ap">
                            <template #suffix>
                                <span :class="{statsSufix: true, green: apChange > 0, red: apChange < 0}">
                                    {{ apChange }}
                                    <el-icon>
                                        <CaretTop v-if="apChange > 0" />
                                        <CaretBottom v-if="apChange < 0" />
                                    </el-icon>
                                </span>
                            </template>
                        </el-statistic>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="statistic-card">
                        <el-statistic :title="props.effectName" :value="effect.toFixed(4)">
                            <template #suffix>
                                <span :class="{statsSufix: true, green: effectChange > 0, red: effectChange < 0}">
                                    {{ effectChange.toFixed(4) }}
                                    <el-icon>
                                        <CaretTop v-if="effectChange > 0" />
                                        <CaretBottom v-if="effectChange < 0" />
                                    </el-icon>
                                </span>
                            </template>
                        </el-statistic>
                    </div>
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

.statistic-card {
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-top: 16px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}
.red {
    color: var(--el-color-error);
}

.statsSufix{
    font-size: 0.6em;
}
</style>