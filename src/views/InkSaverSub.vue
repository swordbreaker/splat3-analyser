<script setup lang="ts">
import InkSaverMain from '@/components/abilities/InkSaverSub.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <InkSaverMain :weapon="props.weapon"></InkSaverMain>
  </main>
</template>