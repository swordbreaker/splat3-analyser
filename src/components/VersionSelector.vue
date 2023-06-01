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

function formatVersion(version: string){
    if(version.length == 3){
        return `${version[0]}.${version[1]}.${version[2]}`;
    }
    return version;
}

watch(selectedVersion, (value) => {
    versionStore.$patch({ version: value });
});
</script>

<template>
    <el-select v-if="selectedVersion != null" v-model="selectedVersion" placeholder="Select" size="large">
        <el-option v-for="version in versions" :label="formatVersion(version)" :value="version" />
    </el-select>
</template>