<script setup lang="ts">
import InkRecoveryUp from '@/components/abilities/InkRecoveryUp.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <InkRecoveryUp></InkRecoveryUp>
  </main>
</template>