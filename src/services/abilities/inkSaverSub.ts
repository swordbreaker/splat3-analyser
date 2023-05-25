import { EffectData, PlotData, getAbilityVals } from "../calculate";
import type { SubInfo } from "../subs";
import type { Splat3Weapon } from "../weapons";

export async function getInksaverSubData(weapon: Splat3Weapon) {
    const subInfo = await weapon.getSubWeaponInfo();
    return new EffectData(await getAbilityVals(`ConsumeRt_Sub_Lv${subInfo.subInkSaveLv}`));
}

export class MaxSubsWithFullTankData extends PlotData {
    constructor(inkSaviourData: PlotData, subInfo: SubInfo) {
        super(ap =>
            MaxSubsWithFullTankData._getEffect(
                ap,
                inkSaviourData,
                subInfo));
    }

    private static _getEffect(ap: number, inkSaviourData: PlotData, subInfo: SubInfo | undefined) {
        const effect = inkSaviourData.getEffect(ap);
        if (subInfo == undefined) {
            return 0;
        }

        return 1 / (subInfo.inkConsume * effect);
    }
}