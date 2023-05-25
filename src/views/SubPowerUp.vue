<script setup lang="ts">
import SubPowerUp from '@/components/abilities/SubPowerUp.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <SubPowerUp :weapon="props.weapon"></SubPowerUp>
  </main>
</template>