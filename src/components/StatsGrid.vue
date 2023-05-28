<script setup lang="ts">
import type { EffectAndTitleData } from "@/models/baseAbilities";
import { ref, onMounted } from "vue";

const props = defineProps<{
    stats: EffectAndTitleData[];
    ap: number;
}>();

const cards = ref<EffectAndTitleData[]>([]);

onMounted(() => cards.value = props.stats);

function onChanged(newVal: EffectAndTitleData[]){
    // cards.value = newVal;
}
</script>

<template>
    <el-row v-if="props.stats.length > 1">
        <el-col :md="24" :lg="24">
            <el-select class="stats-select" v-model="cards" value-key="title" multiple placeholder="Select" @change="onChanged">
                <el-option v-for="item in props.stats" :key="item.title" :label="item.title" :value="item" />
            </el-select>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col v-for="stat in cards" :md="24" :lg="12">
            <EffectCard :title="stat.title" :ap="props.ap" :effect-data="stat.data"></EffectCard>
        </el-col>
    </el-row>
</template>

<style scoped lang="scss">
.stats-select{
    width: 100%;
}
</style>