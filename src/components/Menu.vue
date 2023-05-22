<script lang="ts" setup>
import { ref, watch } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter();
const params = ref<any>();

watch(() => route.params, (newVal, _) => {
    console.log(route.params);
    params.value = route.params;
});

const isCollapse = ref(true);

function navigate(name: string) {
    router.push({ name: name, params: route.params });
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-icon img {
    width: 30px;
    opacity: 0.5;
}

.is-active img {
    opacity: 1;
}
</style>

<template>
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item index="1" @click="navigate('swimmSpeed')">
            <el-icon><img src="/splat3/images/skill/SquidMove_Up.png" alt="Swimmspeed up" /></el-icon>
            <template #title>Swimmspeed up</template>
        </el-menu-item>
        <el-menu-item index="2" @click="navigate('inkSaverMain')">
            <el-icon>
                <img src="/splat3/images/skill/MainInk_Save.png" alt="Inksaver Main">
            </el-icon>
            <template #title>Inksaver Main</template>
        </el-menu-item>
    </el-menu>
</template>