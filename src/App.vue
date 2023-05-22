<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <RouterLink to="swimmSpeed">Swimm speed</RouterLink>
        <RouterLink to="inkSaverMain">Inksaver main</RouterLink>
    </header>

    <RouterView />
</template>
