<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { type PlotData } from "@/services/calculate";
import Plotly from "plotly.js-dist-min";

const props = defineProps<{
    effectData: PlotData
    effectName: string,
    ap: number,
}>();

const effect = ref(0);
const plotData = [] as Plotly.Data[];
const guid = crypto.randomUUID();
const plotName = computed(() => "gd" + guid);

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
    } as Plotly.ScatterData);
    plotData.push({
        x: [props.ap],
        y: [effect.value],
        mode: "markers",
        marker: {
            size: 10,
            color: "red",
            symbol: "diamond-open-dot",
            line: {
                width: 2,
            },
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
        showlegend: false,
    };
    Plotly.newPlot(plotName.value, plotData, layout, { responsive: true });
});

function updatePlot() {
    // @ts-ignore
    plotData[0]["x"] = props.effectData?.aps;
    // @ts-ignore
    plotData[0]["y"] = props.effectData?.effect;

    // @ts-ignore
    plotData[1]["x"] = [props.ap];
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

    Plotly.redraw(plotName.value);
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
</template>