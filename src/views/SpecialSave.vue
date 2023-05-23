<script setup lang="ts">
import SpecialSave from '@/components/abilities/SpecialSave.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <SpecialSave :weapon="props.weapon"></SpecialSave>
  </main>
</template>