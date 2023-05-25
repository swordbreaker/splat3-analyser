<script setup lang="ts">
import { SubInfo } from "@/services/subs";
import { Splat3Weapon, loadWeapons } from "@/services/weapons";
import { computed, onMounted, ref, watch } from "vue";

const emit = defineEmits<{
    (e: "change", weapon: Splat3Weapon): void;
}>();

const props = defineProps<{
    selectedWeapon: Splat3Weapon | undefined;
}>();

const subInfo = ref<SubInfo>();

watch(
    () => props.selectedWeapon,
    async (newVal, oldVal) => {
        if (newVal != null) {
            selectedWeaponName.value = newVal.mainWeaponName;
            selectedWeapon.value = newVal;
            subInfo.value = await selectedWeapon.value.getSubWeaponInfo();
        }
    },
);
const weapons = ref([] as Splat3Weapon[]);
const selectedWeaponName = ref("");
const selectedWeapon = ref(null as Splat3Weapon | null);

const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? weapons.value.filter((x) => x.mainWeaponName.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()))
        : weapons.value;
    cb(results);
};

function handleSelect(item: Splat3Weapon) {
    selectedWeaponName.value = item.mainWeaponName;
    selectedWeapon.value = item;
    emit("change", item);
}

onMounted(() => {
    loadWeapons().then((ws) => (weapons.value = ws.filter((x) => x.mainInfo.Type == "Versus")));
});
</script>
<template>
    <div class="row">
        <div>
            <div class="sub-title my-2 text-sm text-gray-600">Select a weapon.</div>
            <el-autocomplete
                v-model="selectedWeaponName"
                :fetch-suggestions="querySearch"
                clearable
                class="inline-input w-50"
                placeholder="Please Input"
                @select="handleSelect">
                <template #default="{ item }">
                    <span class="value">{{ item.mainWeaponName }}</span>
                </template>
            </el-autocomplete>
        </div>
        <div v-if="selectedWeapon != null" class="col">
            <el-descriptions class="weapon-description" title="" direction="vertical" :column="5" border>
                <el-descriptions-item align="center" label="Main">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="selectedWeapon.mainWeaponName"
                        placement="bottom">
                        <el-image class="main" :src="selectedWeapon?.imgPath" fit="contain"> </el-image>
                    </el-tooltip>
                </el-descriptions-item>
                <el-descriptions-item align="center" label="Sub">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="selectedWeapon.subWeaponName"
                        placement="bottom">
                        <el-image class="sub" :src="selectedWeapon.subImgPath" fit="contain"> </el-image>
                    </el-tooltip>
                </el-descriptions-item>
                <el-descriptions-item align="center" label="Special">
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="selectedWeapon.specialWeaponName"
                        placement="bottom">
                        <el-image class="sub" :src="selectedWeapon?.specialImgPath" fit="contain"> </el-image>
                    </el-tooltip>
                </el-descriptions-item>
                <el-descriptions-item align="center" label="Weapon speed type">
                    <span>{{ selectedWeapon?.WeaponSpeedType }}</span>
                </el-descriptions-item>
                <el-descriptions-item align="center" label="Sub Ink Save Lvl">
                    <span>{{ subInfo?.subInkSaveLv }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<style scoped lang="scss">
.row {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.col {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.main {
    height: 100px;
    margin: 5px;
    max-width: 150px;
}

.weapon-description {
    margin-top: 20px;
}

.el-descriptions__cell {
    text-align: center;
}

.sub {
    /* filter: invert(1); */
    height: 50px;
}
</style>
