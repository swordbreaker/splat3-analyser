<script setup lang="ts">
import IntensifyAction from '@/components/abilities/IntensifyAction.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <IntensifyAction :weapon="props.weapon"></IntensifyAction>
  </main>
</template>