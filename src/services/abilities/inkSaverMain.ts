import { EffectData, PlotData, getAbilityVals } from "../calculate";
import type { Splat3Weapon, WeaponParam } from "../weapons";

export class MaxShotWithFullTankData extends PlotData {
    constructor(inkSaviourData: PlotData, selectedWeapon: Splat3Weapon) {
        super(ap =>
            MaxShotWithFullTankData._getEffect(
                ap,
                inkSaviourData,
                selectedWeapon.mainParams.GameParameters.WeaponParam));
    }

    private static _getEffect(ap: number, inkSaviourData: PlotData, weaponParam: WeaponParam | undefined) {
        const effect = inkSaviourData.getEffect(ap);

        if (weaponParam == undefined) {
            return 0;
        }

        return 1 / (weaponParam.InkConsume * effect);
    }
}

export async function getInksaverMainData() {
    return new EffectData(await getAbilityVals("ConsumeRt_Main"));
}