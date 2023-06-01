<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
    name: string;
    img: string;
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
</script>

<template>
    <el-tooltip :content="props.name" placement="top">
        <div class="toggle-container">
            <el-image @click="onClick" :src="img" fit="contain"></el-image>
            <el-switch v-model="value" />
        </div>
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
