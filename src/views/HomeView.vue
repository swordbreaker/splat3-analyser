<script setup lang="ts">
import SwimmSpeed from '@/components/abilities/SwimmSpeed.vue';

const props = defineProps({
    weapon: String,
});
</script>

<template>
  <main>
    <SwimmSpeed :weapon="$props.weapon"></SwimmSpeed>
  </main>
</template>