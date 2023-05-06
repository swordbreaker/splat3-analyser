<script setup lang="ts">
import { Splat3Weapon, loadWeapons } from '@/services/weapons'
import { onMounted, ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'change', weapon: Splat3Weapon): void
}>();

const props = defineProps({
  selectedWeapon: Splat3Weapon,
});

watch(() => props.selectedWeapon, (newVal, oldVal) =>{
    if(newVal != null){
        selectedWeaponName.value = newVal.mainWeaponName;
        selectedWeapon.value = newVal;
    }
});
const weapons = ref([] as Splat3Weapon[]);
const selectedWeaponName = ref("")
const selectedWeapon = ref(null as Splat3Weapon | null)

const querySearch = (queryString: string, cb: any) => {
    const results = queryString
        ? weapons.value.filter(x => x.mainWeaponName.toLocaleLowerCase().includes(queryString.toLocaleLowerCase()))
        : weapons.value
    cb(results);
}

function handleSelect(item: Splat3Weapon) {
    selectedWeaponName.value = item.mainWeaponName;
    selectedWeapon.value = item;
    emit('change', item);
}

onMounted(() => {
    loadWeapons()
        .then(ws => weapons.value = ws.filter(x => x.mainInfo.Type == "Versus"));
});

</script>
<template>
    <el-row class="demo-autocomplete">
        <el-col :span="12">
            <div class="sub-title my-2 text-sm text-gray-600">
                Select a weapon.
            </div>
            <el-autocomplete v-model="selectedWeaponName" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
                placeholder="Please Input" @select="handleSelect">
                <template #default="{ item }">
                    <span class="value">{{ item.mainWeaponName }}</span>
                </template>
            </el-autocomplete>
        </el-col>
    </el-row>

    <el-image :src="selectedWeapon?.imgPath" fit="fill" />
    <span>{{ selectedWeapon?.WeaponSpeedType }}</span>
</template>