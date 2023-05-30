<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { type PlotData } from "@/services/calculate";
import Plotly, { type PlotlyHTMLElement } from "plotly.js-dist-min";

const props = defineProps<{
    effectData: PlotData
    effectName: string,
    ap: number,
}>();

const effect = ref(0);
const useLog = ref(false);

const plotData = [] as Plotly.Data[];
const guid = crypto.randomUUID();
const plotName = computed(() => "gd" + guid);
const defaultLayout: Partial<Plotly.Layout> = {
        xaxis: { title: "AP" },
        yaxis: { title: props.effectName },
        showlegend: false,
    };

watch(useLog,
    (newVal, _) => {
        updatePlot();
    },
);

watch(
    () => props.effectData,
    async (newVal, _) => {
        if (newVal == null) return;
        updatePlot();
    },
);

onMounted(() => {
    effect.value = props.effectData.getEffect(props.ap);

    plotData.push({
        x: props.effectData.aps,
        y: props.effectData.effect,
        mode: "lines+markers",
        hovertemplate: `AP: %{x}, Effect: %{y}`,
        name: "",
    } as Plotly.ScatterData);
    plotData.push({
        x: [props.ap],
        y: [effect.value],
        mode: "markers",
        hoverinfo: "none",
        marker: {
            size: 10,
            color: "red",
            symbol: "diamond-open-dot",
            line: {
                width: 2,
            },
        },
    });
    Plotly.newPlot(plotName.value, plotData, defaultLayout, { responsive: true, });
});

function updatePlot() {
    const scatterData = plotData[0] as Plotly.ScatterData;
    const markerData = plotData[1] as Plotly.PlotData;

    scatterData["x"] = props.effectData?.aps;
    scatterData["y"] = props.effectData?.effect;

    markerData["x"] = [props.ap];
    markerData["y"] = [effect.value];

    let layout = defaultLayout;
    layout['yaxis']!["type"] = useLog.value ? "log" : "linear";

    Plotly.redraw(plotName.value);
    Plotly.relayout(plotName.value, layout);
}

watch(() => props.ap, (newValue, _) => {
    if (props.effectData != null && newValue != null) {
        effect.value = props.effectData.getEffect(newValue);
        updatePlot();
    }
});

watch(() => props.effectData, (newData, _) => {
    effect.value = newData.getEffect(props.ap);
    updatePlot();
});
</script>

<template>
    <div :id="plotName"></div>
    <el-switch v-model="useLog" active-text="Log" inactive-text="Linear"></el-switch>
</template>