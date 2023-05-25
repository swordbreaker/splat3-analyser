<script setup lang="ts">
import InkResistanceUp from '@/components/abilities/InkResistanceUp.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <InkResistanceUp></InkResistanceUp>
  </main>
</template>