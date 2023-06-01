import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals, type IPlotData } from "../calculate";
import type { Splat3Weapon } from "../weapons";

export async function getAll(weapon: Splat3Weapon): Promise<EffectAndTitleData[]> {
    const specialChargeData = await getSpecialChargeUpData();
    return [
        specialChargeData,
        await getSpecialPointsNeededData(weapon, specialChargeData.data)
    ]
}

export async function getSpecialChargeUpData() : Promise<EffectAndTitleData> {
    return {
        title: "Increase Rate - Special",
        data: new EffectData(await getAbilityVals("IncreaseRt_Special"))
    };
}

export async function getSpecialPointsNeededData(weapon: Splat3Weapon, specialRateData: IPlotData) : Promise<EffectAndTitleData> {
    return{
        title: "Points needed for Special",
        data: specialRateData.mapSimple(x => weapon.specialPoints * (2 - x)), 
    }
}