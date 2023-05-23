<script setup lang="ts">
import type { PlotData } from '@/services/calculate';
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    ap: number,
    effectData: PlotData}>();

const effect = 
    computed(() => props.effectData.getEffect(props.ap)[0]);

</script>

<template>
    <div class="stats-container">
        <StatsCard :title="props.title" :value="effect" :bigger-is-better="false"></StatsCard>
        <PlotCard :effect-name="props.title" :ap="props.ap" :effect-data="props.effectData"></PlotCard>
    </div>
</template>

<style scoped lang="scss">

</style>