<script setup lang="ts">
import RunSpeed from '@/components/abilities/RunSpeed.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <RunSpeed :weapon="props.weapon"></RunSpeed>
  </main>
</template>