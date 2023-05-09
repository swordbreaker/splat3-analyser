<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menu from '@/components/Menu.vue'
</script>

<template>
  <div class="main">
    <el-container>
      <el-header>

      </el-header>
      <el-container class="main-container">
        <el-aside width="200px">
          <Menu></Menu>
        </el-aside>
        <el-main>
          <RouterView />
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