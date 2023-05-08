<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps({
    value: Number,
    title: String,
    biggerIsBetter: Boolean,
});

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
        if(oldVal == null && newVal != null){
            prevValue.value = newVal;
        }
        else if (oldVal != null) {
            prevValue.value = oldVal;
        }
    },
);
</script>

<template>
    <div class="statistic-card">
        <el-statistic :title="title" :value="value" :precision="2">
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

.statsSufix {
    font-size: 0.6em;
}
</style>
