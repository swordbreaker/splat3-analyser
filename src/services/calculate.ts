import { loadJson, baseUrl } from "./util"
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

    return result;
    // return [result, lerpN(slope, percentage)]
}

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

export class PlotData {
    aps: number[]
    effect: number[]
    private _effectFunc: (ap: number) => number;

    constructor(getEffectFunc: (ap: number) => number) {
        this.aps = this.getUseableAps();
        this._effectFunc = getEffectFunc;
        this.effect = this.aps
            .map(x => getEffectFunc(x));
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

    map(mapFunc: (ap: number, oldEffects: number) => number) {
        return new MappedPlotData(this._effectFunc, mapFunc);
    }

    mapSimple(mapFunc: (effect: number) => number) {
        return new MappedPlotData(this._effectFunc, (_, oldEffect: number) => mapFunc(oldEffect));
    }
}

export class MappedPlotData extends PlotData {
    constructor(oldEffectFunc: (ap: number) => number, mapFunc: (ap: number, oldEffects: number) => number) {
        super(ap => mapFunc(ap, oldEffectFunc(ap)))
    }
}

export class EffectData extends PlotData {
    constructor(abilityVals: number[]) {
        super(ap => get_effect(abilityVals, ap));
    }
}

export async function getSwimSpeedData(weapon: Splat3Weapon) {
    return new EffectData(await getAbilityValsWithPostfix(weapon, "MoveVel_Stealth"));
}

export async function getRunSpeedData(weapon: Splat3Weapon) {
    return new EffectData(await getAbilityValsWithPostfix(weapon, "MoveVel_Human"));
}

export async function getAbilityValsWithPostfix(weapon: Splat3Weapon, name: string) {
    const postfix = getPostfix(weapon.WeaponSpeedType);
    return getAbilityVals(`${name}${postfix}`);
}

export async function getInkRecoveryUpStanding() {
    return new EffectData(await getAbilityVals("InkRecoverFrm_Std"));
}

export async function getInkRecoveryUpSwimming() {
    return new EffectData(await getAbilityVals("InkRecoverFrm_Stealth"));
}

export async function getSpecialChargeUpData() {
    return new EffectData(await getAbilityVals("IncreaseRt_Special"));
}

export async function getSpecialSaveData() {
    return new EffectData(await getAbilityVals("SpecialGaugeRt_Restart"));
}

export async function getQuickRespawnKillCameraData() {
    return new EffectData(await getAbilityVals("Dying_ChaseFrm"));
}

export async function getQuickRespawnYourCameraData() {
    return new EffectData(await getAbilityVals("Dying_AroundFrm"));
}

export async function getAbilityVals(name: string) {
    const data = await loadJson<{ [key: string]: any }>(`${baseUrl}splat3/data/parameter/310/misc/params.json`);
    return data[`${name}`];
}