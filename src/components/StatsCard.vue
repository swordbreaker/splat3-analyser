<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
    value: number;
    note?: string;
    title: string;
    biggerIsBetter: boolean;
}>();

const prevValue = ref(props.value ?? 0);
const diff = computed(() => (props.value ?? 0) - prevValue.value);
const isPositive = computed(() => {
    if (props.biggerIsBetter) {
        return diff.value > 0;
    } else {
        return diff.value < 0;
    }
});

watch(
    () => props.value,
    (newVal, oldVal) => {
        if (oldVal == null && newVal != null) {
            prevValue.value = newVal;
        } else if (oldVal != null) {
            prevValue.value = oldVal;
        }
    },
);
</script>

<template>
    <div class="statistic-card">
        <el-statistic :value="value" :precision="2">
            <template #title>
                <div class="statistic-title">
                    {{ title }}
                    <el-tooltip placement="bottom" v-if="note != null" :content="note">
                        <el-icon style="margin-left: 4px" :size="12">
                            <InfoFilled></InfoFilled>
                        </el-icon>
                    </el-tooltip>
                </div>
            </template>
            <template #suffix>
                <span v-if="diff != 0" :class="{ statsSufix: true, green: isPositive, red: !isPositive }">
                    {{ diff.toFixed(2) }}
                    <el-icon>
                        <CaretTop v-if="diff > 0" />
                        <CaretBottom v-if="diff < 0" />
                    </el-icon>
                </span>
            </template>
        </el-statistic>
    </div>
</template>

<style scoped>
.statistic-card {
    padding: 20px;
    border-radius: 4px;
    background-color: var(--el-bg-color-overlay);
}

.statistic-title{
    display: inline-flex;
    align-items: center;
    font-size: 1.2rem;
}

.green {
    color: var(--el-color-success);
}
.red {
    color: var(--el-color-error);
}

.statsSufix {
    font-size: 0.6em;
}
</style>
