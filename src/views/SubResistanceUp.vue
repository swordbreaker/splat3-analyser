<script setup lang="ts">
import SubResistanceUp from '@/components/abilities/SubResistanceUp.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <SubResistanceUp :weapon="props.weapon"></SubResistanceUp>
  </main>
</template>