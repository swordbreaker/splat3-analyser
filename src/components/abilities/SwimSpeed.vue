<script setup lang="ts">
import { ref } from "vue";
import { getAll } from "@/services/abilities/swimSpeed";
import { Splat3Weapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "@/components/abilities/headers/AbilityWithWeaponSelection.vue";
import Toggle from "../Toggle.vue";
import { baseUrl } from "@/services/util";

const abilityImg = "SquidMove_Up.png";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectAndTitleData[]>([]);
const hasNinjaSquid = ref(false);
const ap = ref(0);
let selectedWeapon = undefined as Splat3Weapon | undefined;

async function onWeaponChanged(weapon: Splat3Weapon | undefined) {
    selectedWeapon = weapon;
    loadData();
}

function onApChanged(newAp: number) {
    ap.value = newAp;
}

function onNinjaSquidChanged(val: boolean) {
    hasNinjaSquid.value = val;
    loadData();
}

async function loadData() {
    if (selectedWeapon != undefined) {
        const data = await getAll(selectedWeapon, hasNinjaSquid.value);
        effectData.value = data;
    }
    else {
        effectData.value = [];
    }
}
</script>
<template>
    <section>
        <AbilityWithWeaponSelection :ability-img="abilityImg" :weapon="props.weapon" effect-name="swimSpeed"
            @weapon-changed="onWeaponChanged" @ap-changed="onApChanged">
        </AbilityWithWeaponSelection>
        <Toggle :img="`${baseUrl}splat3/images/skill/SquidMoveSpatter_Reduction.png`" name="Ninja Squid"
            @change="onNinjaSquidChanged">
        </Toggle>
        <StatsGrid :stats="effectData" :ap="ap"> </StatsGrid>
    </section>
</template>