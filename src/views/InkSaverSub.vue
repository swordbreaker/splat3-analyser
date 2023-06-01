<script setup lang="ts">
import InkSaverSub from '@/components/abilities/InkSaverSub.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <InkSaverSub :weapon="props.weapon"></InkSaverSub>
  </main>
</template>