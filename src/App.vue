<script setup lang="ts">
import { RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'
import AbilityFooter from './components/AbilityFooter.vue';
</script>

<template>
  <div class="main">
    <el-container>
      <el-header>
        <h1>Splatoon 3 Ability Analyzer</h1>
      </el-header>
      <el-container class="main-container">
        <el-aside width="70px">
          <Menu></Menu>
        </el-aside>
        <el-main>
          <RouterView />
          <AbilityFooter></AbilityFooter>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.main{
  width: 100%;
}

.main-container{
  margin: 0;
}
</style>
