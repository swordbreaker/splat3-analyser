<script lang="ts" setup>
import { baseUrl } from '@/services/util';
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute();
const router = useRouter();
const params = ref<any>();

const currentIndex = computed(() => {
    return abilities.findIndex(x => x.navigateTo == route.name);
});

watch(() => route.params, (newVal, _) => {
    params.value = route.params;
});

const isCollapse = ref(true);
const abilities = [
    { name: "Swimspeed up", navigateTo: "swimSpeed", img: `${baseUrl}splat3/images/skill/SquidMove_Up.png`},
    { name: "Inksaver main", navigateTo: "inkSaverMain", img: `${baseUrl}splat3/images/skill/MainInk_Save.png`},
    { name: "Inksaver sub", navigateTo: "inkSaverSub", img: `${baseUrl}splat3/images/skill/SubInk_Save.png`},
    { name: "InkRecovery up", navigateTo: "inkRecoveryUp", img: `${baseUrl}splat3/images/skill/InkRecovery_Up.png`},
    { name: "Runspeed up", navigateTo: "runSpeed", img: `${baseUrl}splat3/images/skill/HumanMove_Up.png`},
    { name: "Special Charge Up", navigateTo: "specialIncreaseUp", img: `${baseUrl}splat3/images/skill/SpecialIncrease_Up.png`},
    { name: "Special Saver", navigateTo: "specialSave", img: `${baseUrl}splat3/images/skill/RespawnSpecialGauge_Save.png`},
    { name: "Special Power Up", navigateTo: "specialSpecUp", img: `${baseUrl}splat3/images/skill/SpecialSpec_Up.png`},
    { name: "Quick Respawn", navigateTo: "quickRespawn", img: `${baseUrl}splat3/images/skill/RespawnTime_Save.png`},
    { name: "Quick Super Jump", navigateTo: "quickSuperJump", img: `${baseUrl}splat3/images/skill/JumpTime_Save.png`},
    { name: "Sub Power Up", navigateTo: "subPowerUp", img: `${baseUrl}splat3/images/skill/SubSpec_Up.png`},
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
    <el-menu :default-active="currentIndex" :collapse="isCollapse">
        <el-menu-item v-for="(ability, i) in abilities" :index="i.toString()" @click="navigate(ability.navigateTo)">
            <el-icon><img :src="ability.img" :alt="ability.name" /></el-icon>
            <template #title>{{ ability.name }}</template>
        </el-menu-item>
    </el-menu>
</template>