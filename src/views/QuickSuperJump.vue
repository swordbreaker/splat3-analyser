<script setup lang="ts">
import QuickSuperJump from '@/components/abilities/QuickSuperJump.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <QuickSuperJump :weapon="props.weapon"></QuickSuperJump>
  </main>
</template>