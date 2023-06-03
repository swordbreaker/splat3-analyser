<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    name: string;
    img: string;
    value?: boolean;
    note?: string;
}>();

const emit = defineEmits<{
    (e: "change", on: boolean): void;
}>();

const value = ref(false);

watch(value, (newVal: boolean, _) => {
    emit("change", newVal);
});

function onClick() {
    value.value = !value.value;
}

watch(
    () => props.value,
    (newVal: boolean | undefined, _) => {
        if (newVal != undefined) {
            value.value = newVal;
        }
    },
);
</script>

<template>
    <el-tooltip :content="props.name" placement="top">
        <div class="toggle-container">
            <el-image @click="onClick" :src="img" fit="contain"></el-image>
            <el-switch v-model="value" />
        </div>
    </el-tooltip>
    <el-tooltip placement="bottom" v-if="note != null" :content="note">
        <el-icon style="margin-left: 4px" :size="12">
            <InfoFilled></InfoFilled>
        </el-icon>
    </el-tooltip>
</template>

<style scoped lang="scss">
.toggle-container {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    width: 70px;
}
</style>
