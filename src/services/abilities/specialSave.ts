import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals } from "../calculate";

export async function getAll() {
    return [
        await getSpecialSaveData(),
    ]
}

async function getSpecialSaveData() : Promise<EffectAndTitleData> {
    return {
        title: "Special Gauge Rate After Respawn",
        data: new EffectData(await getAbilityVals("SpecialGaugeRt_Restart"))
    };
}