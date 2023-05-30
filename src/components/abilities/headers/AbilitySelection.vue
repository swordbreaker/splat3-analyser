<script setup lang="ts">
import { baseUrl } from "@/services/util";
import { ref } from "vue";

const props = defineProps<{
    abilityImg: string;
}>();

const emit = defineEmits<{
    (e: "ap-changed", ap: number): void;
}>();

const ap = ref(0);

function onApChanged(newAp: number) {
    ap.value = newAp;
    emit("ap-changed", newAp);
}
</script>

<template>
    <el-row>
        <el-col :md="24" :lg="24">
            <StatsCard title="AP" :value="ap" :bigger-is-better="true"></StatsCard>
            <AbilitySelector
                :image="`${baseUrl}splat3/images/skill/${props.abilityImg}`"
                @changed="onApChanged"></AbilitySelector>
        </el-col>
    </el-row>
</template>