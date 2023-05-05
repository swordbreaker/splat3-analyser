function loadJson(path: string) {
    return fetch(path)
        .then((response) => response.json());
}

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

async function calculate_WallJumpChargeFrame(){
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

// GameParameters.MainWeaponSetting.WeaponSpeedType: Fast | null | Slow
export async function main(){
    const data = await loadJson("./splat3/data/parameter/310/misc/params.json");
    const a = get_effect(data.MoveVel_Stealth, 3);
    console.log(a);
}