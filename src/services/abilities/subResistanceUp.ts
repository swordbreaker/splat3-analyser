import { getWeaponSubInfos } from "@/services/weapons";
import { SplatSub, loadSubWeaponInfo } from "@/services/subs";
import type { DistanceDamage, SubName, WeaponInfoSub } from "@/models/weapon";
import { EffectData, getAbilityVals } from "../calculate";
import type { AbilityParamNames, EffectAndTitleData } from "@/models/baseAbilities";
import { loadLocalization } from "@/services/localization";
import { baseUrl } from "../util";

// DamageRt_BombH
// DamageRt_BombL
// DamageRt_LineMarker
// DamageRt_Shield
// DamageRt_Sprinkler

// MarkingTimeRt
// MarkingTimeRt_Trap
// MoveDownRt_PoisonMist

const damageTypeToParamsKey: Record<DamageType, string | Array<string>> = {
    NORMAL_MIN: "DamageParam_ValueMin",
    NORMAL_MAX: "DamageParam_ValueMax",
    NORMAL_MAX_FULL_CHARGE: "DamageParam_ValueFullChargeMax",
    DIRECT: "DamageParam_ValueDirect",
    DIRECT_MIN: "DamageParam_ValueDirectMin",
    DIRECT_MAX: "DamageParam_ValueDirectMax",
    DISTANCE: ["BlastParam_DistanceDamage", "DistanceDamage_BlastParamArray", "DistanceDamage_BlastParamChase"],
    SPLASH: ["BlastParam_SplashDamage", "DistanceDamage_SplashBlastParam"],
    FULL_CHARGE: "DamageParam_ValueFullCharge",
    MAX_CHARGE: "DamageParam_ValueMaxCharge",
    TAP_SHOT: "DamageParam_ValueMinCharge",
    SPLATANA_VERTICAL: "DamageParam_SplatanaVertical",
    SPLATANA_VERTICAL_DIRECT: "DamageParam_SplatanaVerticalDirect",
    SPLATANA_HORIZONTAL: "DamageParam_SplatanaHorizontal",
    SPLATANA_HORIZONTAL_DIRECT: "DamageParam_SplatanaHorizontalDirect",
    BOMB_NORMAL: "DistanceDamage",
    BOMB_DIRECT: "DirectDamage",
};

export type DamageType =
    | "NORMAL_MIN"
    | "NORMAL_MAX"
    | "NORMAL_MAX_FULL_CHARGE" // Hydra Splatling goes from 32 to 40 dmg when fully charged
    | "DIRECT"
    | "DIRECT_MIN"
    | "DIRECT_MAX"
    | "FULL_CHARGE"
    | "MAX_CHARGE"
    | "TAP_SHOT"
    | "DISTANCE"
    | "SPLASH"
    | "BOMB_DIRECT"
    | "BOMB_NORMAL"
    | "SPLATANA_VERTICAL"
    | "SPLATANA_VERTICAL_DIRECT"
    | "SPLATANA_HORIZONTAL"
    | "SPLATANA_HORIZONTAL_DIRECT";

// function subWeaponIdToEffectKey(id: string){
//   switch (id) {
//     case SPLAT_BOMB_ID:
//     case SUCTION_BOMB_ID:
//     case CURLING_BOMB_ID:
//     case AUTO_BOMB_ID:
//     case INK_MINE_ID:
//     case TORPEDO_ID:
//       return "DamageRt_BombH";
//     case BURST_BOMB_ID:
//     case FIZZY_BOMB_ID:
//       return "DamageRt_BombL";
//     case ANGLE_SHOOTER_ID:
//       return "DamageRt_LineMarker";
//     case SPRINKLER_ID:
//       return "DamageRt_Sprinkler";
//     case SPLASH_WALL_ID:
//       return "DamageRt_Shield";
//     default:
//       throw new Error(
//         `No damage rate for the sub weapon with id: ${subWeaponId}`
//       );
//   }
// }

function subWeaponIdToEffectKey(name: SubName): { title: string; key: AbilityParamNames }[] {
    switch (name) {
        case "BombSplash":
        case "BombSuction":
        case "BombCurling":
        case "BombRobot":
        case "BombTorpedo":
            return [{ title: "Damage", key: "DamageRt_BombH" }];
        case "BombFizzy":
        case "BombQuick":
            return [{ title: "Damage", key: "DamageRt_BombL" }];
        case "LineMarker":
            return [{ title: "Damage", key: "DamageRt_LineMarker" }];
        case "Sprinkler":
            return [{ title: "Damage", key: "DamageRt_Sprinkler" }];
        case "Shield":
            return [{ title: "Damage", key: "DamageRt_Shield" }];
        case "Beacon":
            return [];
        case "PointSensor":
            return [{ title: "Marking Time", key: "MarkingTimeRt" }];
        case "PoisonMist":
            return [{ title: "Movement speed penalty", key: "MoveDownRt_PoisonMist" }];
        case "Trap":
            return [
                { title: "Damage", key: "DamageRt_BombH" },
                { title: "Marking Time", key: "MarkingTimeRt_Trap" },
            ];
    }
}

async function getSubEffect(sub: SplatSub): Promise<EffectAndTitleData[]> {
    const param = await loadSubWeaponInfo(sub.subId);
    const abillityKeys = subWeaponIdToEffectKey(sub.subId);

    switch (sub.subId) {
        case "BombCurling":
            const maxCharge = await getDistanceDamageStats(
                param.params.GameParameters.BlastParamMaxCharge.DistanceDamage,
                abillityKeys[0].key,
                sub.name,
                " at max charge",
            );
            const minCharge = await getDistanceDamageStats(
                param.params.GameParameters.BlastParamMaxCharge.DistanceDamage,
                abillityKeys[0].key,
                sub.name,
                " at min charge",
            );
            return maxCharge.concat(minCharge);
        case "BombFizzy":
            const blastParam1 = await getDistanceDamageStats(
                param.params.GameParameters.MoveParam!.BlastParamArray![0].DistanceDamage,
                abillityKeys[0].key,
                " unshaked",
            );
            const blastParam2 = await getDistanceDamageStats(
                param.params.GameParameters.MoveParam!.BlastParamArray![1].DistanceDamage,
                abillityKeys[0].key,
                " once shaked",
            );
            const blastParam3 = await getDistanceDamageStats(
                param.params.GameParameters.MoveParam!.BlastParamArray![2].DistanceDamage,
                abillityKeys[0].key,
                " twice shaked",
            );
            return blastParam1.concat(blastParam2).concat(blastParam3);
        case "BombTorpedo":
            const chaseDirectDmg = await getDistanceDamageStats(
                param.params.GameParameters.BlastParamChase.DistanceDamage!,
                abillityKeys[0].key,
                sub.name,
                " chase direct",
            );
            const chaseSplashDmg = await getDistanceDamageStats(
                param.params.GameParameters.BlastParamChase.SplashBlastParam!.DistanceDamage!,
                abillityKeys[0].key,
                sub.name,
                " chase splash",
            );
            const throwDmg = await getDistanceDamageStats(
                param.params.GameParameters.BlastParamThrow.DistanceDamage!,
                abillityKeys[0].key,
                sub.name,
                " throw",
            );
            return chaseDirectDmg.concat(chaseSplashDmg).concat(throwDmg);
        case "BombSuction":
        case "BombSplash":
        case "BombQuick":
        case "BombRobot":
            return await getDistanceDamageStats(
                param.params.GameParameters.BlastParam!.DistanceDamage!,
                abillityKeys[0].key,
                sub.name,
            );
        case "LineMarker":
            return [
                await getDamageStat(
                    param.params.GameParameters.MoveParam!.DirectDamage!,
                    abillityKeys[0].key,
                    `${sub.name} direct Damage`,
                ),
            ];
        case "Sprinkler":
            return [];
        case "Shield":
            return [
                await getDamageStat(
                    param.params.GameParameters.MoveParam!.DamageSpanFrame!,
                    abillityKeys[0].key,
                    `${sub.name} Damage`,
                ),
            ];
        case "PointSensor":
            return [
                {
                    title: `${sub.name} Markin time reduction`,
                    data: new EffectData(await getAbilityVals(abillityKeys[0].key)),
                    note: "depending on the sub power up of the opponent",
                },
            ];
        case "PoisonMist":
            return [
                {
                    title: `${sub.name} Move penalty`,
                    data: new EffectData(await getAbilityVals(abillityKeys[0].key)),
                    note: "depending on the sub power up of the opponent",
                },
            ];
        // Move penalty poison mist
        case "Trap":
            const dmgStats = await getDistanceDamageStats(
                param.params.GameParameters.BlastParam!.DistanceDamage!,
                abillityKeys[0].key,
                sub.name,
            );
            dmgStats.push({
                title: `${sub.name} Marking time`,
                data: new EffectData(await getAbilityVals(abillityKeys[1].key)),
            });
            return dmgStats;
        default:
            return [];
    }
}

async function getDistanceDamageStats(
    distanceDatamge: DistanceDamage,
    abillityKey: AbilityParamNames,
    localizedName: string,
    suffux: string = "",
): Promise<EffectAndTitleData[]> {
    return Promise.all(
        distanceDatamge.map((distanceDamage) =>
            getDamageStat(
                distanceDamage.Damage,
                abillityKey,
                `${localizedName}${suffux} Damage with max Distance of ${distanceDamage.Distance}`,
            ),
        ),
    );
}

async function getDamageStat(
    damage: number,
    abillityKey: AbilityParamNames,
    title: string,
): Promise<EffectAndTitleData> {
    const dmgEffect = new EffectData(await getAbilityVals(abillityKey));
    return {
        title: title,
        data: dmgEffect.mapSimple((x) => damage * x),
    };
}

export async function getAll(subs: SplatSub[]) {
    const results = [];

    for (const sub of subs) {
        for (const a of await getSubEffect(sub)) {
            results.push(a);
        }
    }
    return results;
}

export async function getSubInfos() {
    const subs = await getWeaponSubInfos();
    const localization = await loadLocalization();
    return subs
      .filter((x) => x.Type == "Versus" && x.__RowId != "Beacon" && x.__RowId != "Sprinkler")
      .map((x) => new SplatSub(x, localization));
}