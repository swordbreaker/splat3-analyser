import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, type IPlotData, getAbilityVals } from "../calculate";
import type { Splat3Weapon } from "../weapons";
import type { WeaponParamsGameParameters } from "@/models/weapon";

export async function getAll(weapon: Splat3Weapon) {
    const inkSaverData = await getInksaverMainData();
    const maxShotsData = getMaxShotsWithFullTank(weapon, inkSaverData.data);
    const all = [inkSaverData];
    maxShotsData.forEach(x => all.push(x));

    return all;
}

export async function getInksaverMainData(): Promise<EffectAndTitleData> {
    return {
        title: "Consumption Rate Main",
        data: new EffectData(await getAbilityVals("ConsumeRt_Main")),
    };
}

export function getMaxShotsWithFullTank(weapon: Splat3Weapon, inkSaviourData: IPlotData): EffectAndTitleData[] {
    return getInkConsume(weapon.mainParams.GameParameters).map((x) => ({
        title: x.title,
        data: inkSaviourData.mapSimple((effect) => 1 / (x.inkConsume * effect)),
        note: x.note,
    }));
}

function getInkConsume(gameParameters: WeaponParamsGameParameters): { title: string; inkConsume: number, note?: string }[] {
    console.log(gameParameters);
    const data = [] as { title: string; note?: string, inkConsume: number }[];

    if (gameParameters.WeaponParam?.InkConsume != null) {
        data.push({
            title: "Number of shot with full tank",
            inkConsume: gameParameters.WeaponParam.InkConsume,
        });
    }
    if (gameParameters.WeaponSwingParam != null) {
        data.push({
            title: "Number of swings with full tank",
            inkConsume: gameParameters.WeaponSwingParam.InkConsume,
        });
    }
    if (gameParameters.WeaponParam?.InkConsumeMinCharge != null) {
        data.push({
            title: "Number of tap shots with full tank",
            inkConsume: gameParameters.WeaponParam?.InkConsumeMinCharge,
        });
    }
    if (gameParameters.WeaponParam?.InkConsumeFullCharge != null) {
        data.push({
            title: "Number of fully charged shots with full tank",
            inkConsume: gameParameters.WeaponParam?.InkConsumeFullCharge,
        });
    }
    if (gameParameters.WeaponVerticalSwingParam != null) {
        data.push({
            title: "Number of vertical swings with full tank",
            inkConsume: gameParameters.WeaponVerticalSwingParam.InkConsume,
        });
    }
    if (gameParameters.WeaponWideSwingParam != null) {
        data.push({
            title: "Number of wide swings with full tank",
            inkConsume: gameParameters.WeaponWideSwingParam.InkConsume,
        });
    }
    if (gameParameters.spl__WeaponShelterShotgunParam?.InkConsume != null) {
        data.push({
            title: "Number of shots with full tank",
            inkConsume: gameParameters.spl__WeaponShelterShotgunParam.InkConsume,
        });
    }
    if (gameParameters.spl__WeaponShelterCanopyParam?.InkConsumeUmbrella != null) {
        data.push({
            title: "Number of shield launches with full tank",
            inkConsume: gameParameters.spl__WeaponShelterCanopyParam.InkConsumeUmbrella,
        });

        // for splat brella
        if(gameParameters.spl__WeaponShelterShotgunParam?.InkConsume == null){
            const shotInkConsumption = 0.0635;
            data.push({
                title: "Number of shot with full tank",
                note: "assumption becaus not avaible in the data, value form splatoon 2 patch 4.7.0 see https://splatoonwiki.org/wiki/Splat_Brella",
                inkConsume: shotInkConsumption,
            });
        }
    }


    return data;
}