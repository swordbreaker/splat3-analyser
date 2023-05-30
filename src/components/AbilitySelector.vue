<script setup lang="ts">
import { ref } from "vue";
import { useable_ap, ap_to_index } from "@/services/calculate";
import { RefreshLeft } from '@element-plus/icons-vue'


const props = defineProps({
    image: String,
});

const emit = defineEmits<{
    (e: "changed", ap: number): void;
}>();

const ap = ref(0);
const len = useable_ap.length;
const sliderIndex = ref(0);

const mainAbilities = ref([false, false, false]);
const subAbilities = ref(Array(9).fill(false));

function mainChanged(event: any) {
    const sign = event.target.checked ? 1 : -1;
    ap.value += 10 * sign;
    sliderIndex.value = ap_to_index[ap.value];
    emit("changed", ap.value);
}

function subChanged(event: any) {
    const sign = event.target.checked ? 1 : -1;
    ap.value += 3 * sign;
    sliderIndex.value = ap_to_index[ap.value];
    emit("changed", ap.value);
}

const indexToAp = (val: number) => {
    return useable_ap[val];
};

const sum = (a: boolean[]) => {
    let sum = 0;
    a.forEach((x) => (sum += Number(x)));
    return sum;
};

function onReset(){
    ap.value = 0;
    sliderIndex.value = 0;
    onSliderChanged(0);
}

function onSliderChanged(newVal: number) {
    let sliderAp = indexToAp(newVal);
    ap.value = sliderAp;
    emit("changed", ap.value);

    let mains = 0;
    let subs = 0;

    while (sliderAp > 0) {
        if (sliderAp % 10 == 0) {
            sliderAp -= 10;
            mains++;
        } else {
            sliderAp -= 3;
            subs++;
        }
    }

    for (let i = 0; i < mainAbilities.value.length; i++) {
        mainAbilities.value[i] = i < mains;
    }
    for (let i = 0; i < subAbilities.value.length; i++) {
        subAbilities.value[i] = i < subs;
    }
}
</script>

<template>
    <div class="outer-container">
        <div class="abillity-container">
            <div class="abillity-row" v-for="i in 3">
                <label class="ability main" @change="mainChanged">
                    <input type="checkbox" v-model="mainAbilities[i - 1]" />
                    <img :src="props.image" />
                </label>
                <label class="ability sub">
                    <input type="checkbox" @change="subChanged" v-model="subAbilities[(i - 1) * 3]" />
                    <img :src="props.image" />
                </label>
                <label class="ability sub">
                    <input type="checkbox" @change="subChanged" v-model="subAbilities[(i - 1) * 3 + 1]" />
                    <img :src="props.image" />
                </label>
                <label class="ability sub">
                    <input type="checkbox" @change="subChanged" v-model="subAbilities[(i - 1) * 3 + 2]" />
                    <img :src="props.image" />
                </label>
            </div>
        </div>
        <div class="control-panel">
            <el-button :icon="RefreshLeft" @click="onReset" circle />
        </div>
    </div>
    <div>
        <el-slider
            class="ability-slider"
            v-model="sliderIndex"
            @change="onSliderChanged"
            :format-tooltip="indexToAp"
            :min="0"
            :max="len - 1"
            show-stops></el-slider>
    </div>
</template>

<style scoped lang="scss">
.outer-container {
    display: flex;
    flex-direction: row;
    align-items: end;
    justify-content: center;
}

.abillity-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.abillity-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    gap: 10px;
    margin: 5px;
}

.main [type="checkbox"] + img {
    width: 70px;
}

.sub [type="checkbox"] + img {
    width: 50px;
}

.ability {
    display: flex;
    flex-direction: column;

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

.ability-slider{
    width: 350px;
    margin: auto;
}
</style>
