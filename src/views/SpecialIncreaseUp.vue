<script setup lang="ts">
import SpecialIncreaseUp from '@/components/abilities/SpecialIncreaseUp.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <SpecialIncreaseUp :weapon="props.weapon"></SpecialIncreaseUp>
  </main>
</template>