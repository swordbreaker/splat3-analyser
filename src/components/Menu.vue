<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter();
const params = ref<any>();

watch(() => route.params, (newVal, _) => {
    params.value = route.params;
});

const isCollapse = ref(true);
const abilities = [
    { name: "Swimmspeed up", navigateTo: "swimmSpeed", img: "/splat3/images/skill/SquidMove_Up.png"},
    { name: "Inksaver main", navigateTo: "inkSaverMain", img: "/splat3/images/skill/MainInk_Save.png"},
    { name: "Inksaver sub", navigateTo: "inkSaverSub", img: "/splat3/images/skill/SubInk_Save.png"},
    { name: "InkRecovery up", navigateTo: "inkRecoveryUp", img: "/splat3/images/skill/InkRecovery_Up.png"},
    { name: "Runspeed up", navigateTo: "runSpeed", img: "/splat3/images/skill/HumanMove_Up.png"},
]



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
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">expand</el-radio-button>
        <el-radio-button :label="true">collapse</el-radio-button>
    </el-radio-group> -->
    <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-menu-item v-for="(ability, i) in abilities" :index="i.toString()" @click="navigate(ability.navigateTo)">
            <el-icon><img :src="ability.img" :alt="ability.name" /></el-icon>
            <template #title>{{ ability.name }}</template>
        </el-menu-item>
    </el-menu>
</template>