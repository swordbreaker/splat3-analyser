<script setup lang="ts">
import type { EffectAndTitleData } from '@/models/baseAbilities';

const props = defineProps<{
    stats: EffectAndTitleData[],
    ap: number,
}>();

</script>

<template>
    <el-row :gutter="20">
        <el-col v-for="stat in props.stats" :md="24" :lg="12">
            <EffectCard :title="stat.title" :ap="props.ap" :effect-data="stat.data"></EffectCard>
        </el-col>
    </el-row>
</template>