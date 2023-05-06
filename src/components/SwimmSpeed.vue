<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from "vue";
import WeaponList from "@/components/WeaponList.vue";
import router from "@/router";
import { SwimmSpeedData, getSwimmSpeedData } from "@/services/calculate";
import { Splat3Weapon, getWeapon } from "@/services/weapons";
import Plotly from "plotly.js-dist-min";

const props = defineProps({
    weapon: String,
});

const selectedWeapon = ref<Splat3Weapon | null>(null);
const swimmSpeedData = ref<SwimmSpeedData>();
const ap = ref(0);
const velocity = computed(() => swimmSpeedData.value?.getEffect(ap.value)[0]);
const plotData = [] as Plotly.Data[];

if (props.weapon != null) {
    getWeapon(props.weapon).then((w) => onWeaponChanged(w));
}

onMounted(() => {
    plotData.push({
        x: swimmSpeedData.value?.aps,
        y: swimmSpeedData.value?.effect,
    } as Plotly.ScatterData);
    plotData.push({
        x: [ap.value],
        y: [velocity.value ?? 0],
        mode: "markers",
        marker: {
            size: 10,
            symbol: "diamond-open-dot",
        },
    });

    const layout: Plotly.Layout = {
        width: 600,
        height: 400,
        xaxis: { title: "AP" },
        yaxis: { title: "Swim Velocity" },
    };
    Plotly.newPlot("gd", plotData, layout);
});

function updatePlot() {
    plotData[0]["x"] = swimmSpeedData.value?.aps;
    plotData[0]["y"] = swimmSpeedData.value?.effect;

    plotData[1]["x"] = [ap.value];
    plotData[1]["y"] = [velocity.value];

    Plotly.redraw("gd");
}

async function onWeaponChanged(weapon: Splat3Weapon) {
    router.push({ name: "swimmSpeed", params: { weapon: weapon.mainInfo.__RowId } });
    const data = await getSwimmSpeedData(weapon);
    swimmSpeedData.value = data;
    updatePlot();
    // var line = { x: data.aps, y: data.effect };
    // var point = { x: [ap.value], y: [velocity.value]};
    // const layout = {
    //         width: 600,
    //         height: 400,
    //         xaxis: { title: "AP" },
    //         yaxis: { title: "Swim Velocity" },
    //     };

    // await Plotly.newPlot("gd", [line, point],layout);

    selectedWeapon.value = weapon;
}

function mainChanged(event: any) {
    const sing = event.target.checked ? 1 : -1;
    ap.value += 10 * sing;
    updatePlot();
}

function subChanged(event: any) {
    const sing = event.target.checked ? 1 : -1;
    ap.value += 3 * sing;
    updatePlot();
}
</script>

<template>
    <el-row>
        <el-col :span="24">
            <WeaponList @change="onWeaponChanged" :selected-weapon="selectedWeapon"></WeaponList>
        </el-col>
    </el-row>

    <el-row>
        <el-col :span="12">
            <span>AP: {{ ap }}</span>
            <span>Velocity: {{ velocity?.toFixed(4) }}</span>

            <div class="abillity-container" v-for="i in 3">
                <label class="ability main" @change="mainChanged">
                    <input type="checkbox" />
                    <img src="/splat3/images/skill/SquidMove_Up.png" />
                </label>
                <label class="ability sub">
                    <input type="checkbox" @change="subChanged" />
                    <img src="/splat3/images/skill/SquidMove_Up.png" />
                </label>
                <label class="ability sub">
                    <input type="checkbox" @change="subChanged" />
                    <img src="/splat3/images/skill/SquidMove_Up.png" />
                </label>
                <label class="ability sub">
                    <input type="checkbox" @change="subChanged" />
                    <img src="/splat3/images/skill/SquidMove_Up.png" />
                </label>
            </div>
        </el-col>
        <el-col :span="12">
            <div id="gd"></div>
        </el-col>
    </el-row>
</template>

<style scoped lang="scss">
.abillity-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}

.main [type="checkbox"] + img {
    width: 70px;
}

.sub [type="checkbox"] + img {
    width: 50px;
}

.ability {
    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    [type="checkbox"] + img {
        background-color: gray;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.5;
    }

    [type="checkbox"]:checked + img {
        opacity: 1;
    }
}
</style>
