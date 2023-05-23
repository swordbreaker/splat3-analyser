<script setup lang="ts">
import SpecialSpecUp from '@/components/abilities/SpecialSpecUp.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <SpecialSpecUp :weapon="props.weapon"></SpecialSpecUp>
  </main>
</template>