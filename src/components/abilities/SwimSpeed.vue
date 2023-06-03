<script setup lang="ts">
import { computed, ref } from "vue";
import { getAll } from "@/services/abilities/swimSpeed";
import { Splat3Weapon } from "@/services/weapons";
import type { EffectAndTitleData } from "@/models/baseAbilities";
import AbilityWithWeaponSelection from "@/components/abilities/headers/AbilityWithWeaponSelection.vue";
import Toggle from "../Toggle.vue";
import { getAbilityImage } from "@/services/util";
import { maxAp } from "@/services/calculate";
import { SkillDescription, SkillImage } from "@/models/skill"

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

function onCombackChanged(val: boolean) {
    if (val) {
        hasOpenGambit.value = false;
    }
    hasComeback.value = val;
}

function onOpenGambitChanged(val: boolean) {
    if (val) {
        hasComeback.value = false;
    }
    hasOpenGambit.value = val;
}

async function loadData() {
    if (selectedWeapon != undefined) {
        const data = await getAll(selectedWeapon, hasNinjaSquid.value);
        effectData.value = data;
    } else {
        effectData.value = [];
    }
}
</script>
<template>
    <section>
        <AbilityWithWeaponSelection
            :ability-img="SkillImage.SwimSpeed"
            :weapon="props.weapon"
            effect-name="swimSpeed"
            @weapon-changed="onWeaponChanged"
            @ap-changed="onApChanged">
        </AbilityWithWeaponSelection>
        <div class="toggle-container">
            <Toggle
                :img="getAbilityImage(SkillImage.NinjaSquid)"
                name="Ninja Squid"
                @change="onNinjaSquidChanged"
                :note="SkillDescription.NinjaSquid">
            </Toggle>
            <Toggle
                :img="getAbilityImage(SkillImage.OpeningGambit)"
                name="Opening Gambit"
                :value="hasOpenGambit"
                @change="onOpenGambitChanged"
                :note="SkillDescription.OpeningGambit">
            </Toggle>
            <Toggle
                :img="getAbilityImage(SkillImage.Comeback)"
                name="Comeback"
                :value="hasComeback"
                @change="onCombackChanged"
                :note="SkillDescription.Comeback">
            </Toggle>
            <Toggle
                :img="getAbilityImage(SkillImage.DropRoller)"
                name="Drop Roller"
                @change="(v) => (hasDropRoller = v)"
                :note="SkillDescription.DropRoller">
            </Toggle>
        </div>
        <StatsGrid :stats="effectData" :ap="apTotal"> </StatsGrid>
    </section>
</template>
