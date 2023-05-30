import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals, type IPlotData } from "../calculate";
import type { Splat3Weapon } from "../weapons";

export async function getAll(weapon: Splat3Weapon){
    const inkSaverSubData = await getInksaverSubData(weapon);
    return[
        inkSaverSubData,
        await getMaxSubsWithFullTankData(weapon, inkSaverSubData.data),
    ]
}

async function getInksaverSubData(weapon: Splat3Weapon): Promise<EffectAndTitleData> {
    const subInfo = await weapon.getSubWeaponInfo();
    return {
        title: "Consumption Rate Sub",
        data: new EffectData(await getAbilityVals(`ConsumeRt_Sub_Lv${subInfo.subInkSaveLv}`)),
    };
}

async function getMaxSubsWithFullTankData(
    weapon: Splat3Weapon,
    inkSaviourData: IPlotData,
): Promise<EffectAndTitleData> {
    const subInfo = await weapon.getSubWeaponInfo();
    return {
        title: "Consumption Rate Sub",
        data: inkSaviourData.mapSimple((effect) => 1 / (subInfo.inkConsume * effect)),
    };
}