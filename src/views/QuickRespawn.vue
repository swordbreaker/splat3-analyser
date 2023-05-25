<script setup lang="ts">
import QuickRespawn from '@/components/abilities/QuickRespawn.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <QuickRespawn :weapon="props.weapon"></QuickRespawn>
  </main>
</template>