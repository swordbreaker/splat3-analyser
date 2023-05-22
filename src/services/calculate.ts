import { loadJson } from "./util"
import { Splat3Weapon, type WeaponParam } from "./weapons"

const useable_ap = [
    0, 3, 6, 9, 10, 12, 13, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
    35, 36, 37, 38, 39, 41, 42, 44, 45, 47, 48, 51, 54, 57,
]

function calcSkillPoint2Percent(ap: number) {
    return Math.min(3.3 * ap - 0.027 * Math.pow(ap, 2), 100)
}

function get_slope(high: number, mid: number, low: number) {
    if (mid == low) {
        return 0
    }
    return (mid - low) / (high - low)
}

function lerpN(p: number, s: number) {
    if (Math.abs(s - 0.5) < 0.0001) {
        return p
    }
    if (p == 0.0) {
        return p
    }
    if (p == 1.0) {
        return p
    }
    if (s != 0.5) {
        return Math.pow(Math.E, -1 * ((Math.log(p) * Math.log(s)) / Math.log(2)))
    }
    return p;
}

function get_effect(abilityVals: number[], ap: number) {
    const high = abilityVals[0]
    const mid = abilityVals[1]
    const low = abilityVals[2]
    const slope = get_slope(high, mid, low)
    const tmp = calcSkillPoint2Percent(ap)
    const percentage = tmp / 100.0
    const result = low + (high - low) * lerpN(slope, percentage)

    return [result, lerpN(slope, percentage)]
}

async function calculate_WallJumpChargeFrame() {
    const data = await loadJson("./splat3/data/parameter/310/misc/SplPlayer.game__GameParameterTable.json");
    const c = data.GameParameters.spl__PlayerGearSkillParam_ActionSpecUp_Squid;
    const a = get_effect([c.WallJumpChargeFrm_High, c.WallJumpChargeFrm_Mid, c.WallJumpChargeFrm_Low], 3);
    console.log(a);
}

// MoveVel_Human
// MoveVel_Human_Fast
// MoveVel_Human_Slow

// MoveVel_Stealth
// MoveVel_Stealth_Fast
// MoveVel_Stealth_Slow

function getPostfix(category: 'Fast' | 'Normal' | 'Slow') {
    switch (category) {
        case 'Fast':
            return "_Fast";
        case 'Slow':
            return "_Slow";
        default:
            return "";
    }
}

export abstract class PlotData {
    aps: number[]
    effect: number[]
    private _effectFunc: (ap: number) => number[];

    constructor(getEffectFunc: (ap: number) => number[]) {
        this.aps = this.getUseableAps();
        this._effectFunc = getEffectFunc;
        this.effect = this.aps
            .map(x => getEffectFunc(x)[0]);
    }

    getUseableAps() {
        return useable_ap;
    };

    /**
     * Gets the value of the effect.
     * @param ap the abillity points
     * @returns Array where the first value is the effect value and the second is the percentage representation.
     */
    getEffect(ap: number) {
        return this._effectFunc(ap);
    }
}

export class EffectData extends PlotData {
    constructor(abilityVals: number[]) {
        super(ap => get_effect(abilityVals, ap));
    }
}

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
            return [0, effect[1]];
        }

        return [1 / (weaponParam.InkConsume * effect[0]), effect[1]];
    }
}

export async function getSwimSpeedData(weapon: Splat3Weapon) {
    return new EffectData(await getAbilityValsWithPostfix(weapon, "MoveVel_Stealth"));
}

export async function getInksaverMainData() {
    return new EffectData(await getAbilityVals("ConsumeRt_Main"));
}

export async function getAbilityValsWithPostfix(weapon: Splat3Weapon, name: string) {
    const postfix = getPostfix(weapon.WeaponSpeedType);
    return getAbilityVals(`${name}${postfix}`);
}

export async function getAbilityVals(name: string) {
    const data = await loadJson<{ [key: string]: any }>("/splat3/data/parameter/310/misc/params.json");
    return data[`${name}`];
}