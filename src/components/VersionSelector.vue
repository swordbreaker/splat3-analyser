<script setup lang="ts">
import { getVersions } from "@/services/version";
import { onMounted, ref, watch } from "vue";
import { useVersion } from "@/stores/versionStore"

const versionStore = useVersion();
const versions = ref<string[]>([]);
const selectedVersion = ref<string>();

onMounted(() => {
    getVersions()
        .then(x => {
            versions.value = x;
            if (versionStore.version == null) {
                versionStore.version = x.slice(-1)[0];
            }
            selectedVersion.value = versionStore.version;
        });
});

watch(selectedVersion, (value) => {
    versionStore.$patch({ version: value });
});
</script>

<template>
    <el-select v-if="selectedVersion != null" v-model="selectedVersion" placeholder="Select" size="large">
        <el-option v-for="version in versions" :label="version" :value="version" />
    </el-select>
</template>