<script setup lang="ts">
import { computed, ref } from "vue";
import { getAll } from "@/services/abilities/swimSpeed";
import { Splat3Weapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "@/components/abilities/headers/AbilityWithWeaponSelection.vue";
import Toggle from "../Toggle.vue";
import { getAbilityImage } from "@/services/util";
import { maxAp } from "@/services/calculate";
import { SkillName } from "@/models/skillImages";

const abilityImg = "SquidMove_Up.png";

const props = defineProps({
    weapon: String,
});

const effectData = ref<EffectAndTitleData[]>([]);
const hasNinjaSquid = ref(false);
const hasOpenGambit = ref(false);
const hasComeback = ref(false);
const hasDropRoller = ref(false);

const ap = ref(0);
const apTotal = computed(() => {
    let total = ap.value;
    total += Number(hasOpenGambit.value) * 30;
    total += Number(hasComeback.value) * 10;
    total += Number(hasDropRoller.value) * 30;
    return Math.min(total, maxAp);
});

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
        <div class="toggle-container">
            <Toggle :img="getAbilityImage(SkillName.NinjaSquid)" name="Ninja Squid" @change="onNinjaSquidChanged">
            </Toggle>
            <Toggle :img="getAbilityImage(SkillName.OpeningGambit)" name="Opening Gambit" @change="v => hasOpenGambit = v">
            </Toggle>
            <Toggle :img="getAbilityImage(SkillName.Comeback)" name="Opening Gambit" @change="v => hasComeback = v">
            </Toggle>
            <Toggle :img="getAbilityImage(SkillName.DropRoller)" name="Drop Roller" @change="v => hasDropRoller = v">
            </Toggle>
        </div>
        <StatsGrid :stats="effectData" :ap="apTotal"> </StatsGrid>
    </section>
</template>