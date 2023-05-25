<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
    image: String
});

const emit = defineEmits<{
    (e: "changed", ap: number): void;
}>();

const ap = ref(0);

function mainChanged(event: any) {
    const sign = event.target.checked ? 1 : -1;
    ap.value += 10 * sign;
    emit("changed", ap.value);
}

function subChanged(event: any) {
    const sign = event.target.checked ? 1 : -1;
    ap.value += 3 * sign;
    emit("changed", ap.value);
}
</script>

<template>
    <div class="abillity-container" v-for="i in 3">
        <label class="ability main" @change="mainChanged">
            <input type="checkbox" />
            <img :src="props.image" />
        </label>
        <label class="ability sub">
            <input type="checkbox" @change="subChanged" />
            <img :src="props.image" />
        </label>
        <label class="ability sub">
            <input type="checkbox" @change="subChanged" />
            <img :src="props.image" />
        </label>
        <label class="ability sub">
            <input type="checkbox" @change="subChanged" />
            <img :src="props.image" />
        </label>
    </div>
</template>

<style scoped lang="scss">
.abillity-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 5px;
}

.main [type="checkbox"] + img {
    width: 70px;
}

.sub [type="checkbox"] + img {
    width: 50px;
}

.ability {
    input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }
    [type="checkbox"] + img {
        background-color: gray;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.5;
    }

    [type="checkbox"]:checked + img {
        opacity: 1;
    }
}
</style>
