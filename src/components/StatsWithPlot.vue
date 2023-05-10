<script setup lang="ts">
import type { PlotData } from '@/services/calculate';

const props = defineProps<{
    title: string,
    effect: number,
    ap: number,
    effectData: PlotData}>();
</script>

<template>
    <StatsCard :title="props.title" :value="props.effect" :bigger-is-better="false"></StatsCard>
    <PlotCard :effect-name="props.title" :ap="props.ap" :effect-data="props.effectData"></PlotCard>
</template>