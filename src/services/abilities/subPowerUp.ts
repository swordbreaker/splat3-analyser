import type { SkillParams, Splat3Weapon } from "../weapons";
import type { SubParams } from "../subs";
import { EffectData, PlotData } from "../calculate";
import { loadPlayerData } from "../player";

export type StatsData = {
    title: string;
    effectData: PlotData;
};

function calculateAdditonalBeaconAp(skillParams: SkillParams, ap: number){
    const v7 =
        ((skillParams.Mid - skillParams.Low) / skillParams.High - 17.8 / skillParams.High) /
        ((17.8 / skillParams.High) * (17.8 / skillParams.High + -1.0));
    const v8 = (ap / skillParams.High) * ((ap / skillParams.High) * v7 + (1.0 - v7));
    const v9 = Math.floor(skillParams.Low + (skillParams.High - skillParams.Low) * v8);
    return v9;
}

export async function getSubPowerUpData(weapon: Splat3Weapon): Promise<StatsData[]> {
    const subInfo = await weapon.getSubWeaponInfo();
    const params = subInfo.params;
    switch (weapon.SubWeaponId) {
        case "Beacon":
            return await getBeaconData(params);
        case "LineMarker":
            return getAngkleData(params);
        case "PointSensor":
            return getPointData(params);
        case "PoisonMist":
            return getPoisonData(params);
        case "Sprinkler":
            return getSprinklerData(params);
        case "Trap":
            return getTrapData(params);
        case "BombTorpedo":
            return getTorpedoData(params);
        case "BombSuction":
            return getSuctionData(params);
        case "BombSplash":
            return getSplatData(params);
        case "BombRobot":
            return getAutoData(params);
        case "BombQuick":
            return getBurstData(params);
        case "BombFizzy":
            return getFizzyData(params);
        case "BombCurling":
            return getCurlingData(params);
        default:
            return [];
    }
}

async function getBeaconData(params: SubParams): Promise<StatsData[]> {
    const playerData = await loadPlayerData();
    const subSpecParam = playerData.GameParameters.spl__PlayerBeaconSubSpecUpParam!.SubSpecUpParam;
    const vals = {
        High: subSpecParam.High,
        Mid: subSpecParam.Mid,
        Low: 0
    };
    const additionalApData = new PlotData(ap => calculateAdditonalBeaconAp(vals, ap));
    console.log(params.GameParameters.MoveParam!.SpawnSpeedZSpecUp);
    return [{
        title: "Additional Quick Superjump AP",
        effectData: additionalApData
    }];
}

function getCurlingData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getFizzyData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getBurstData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getAutoData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getSplatData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getSuctionData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getTorpedoData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getAngkleData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Marking Duration",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.MarkingFrame,
        },
    ]);
}

function getPointData(params: SubParams): StatsData[] {
    console.log(params.GameParameters.MoveParam!.MarkingFrameSubSpec);
    return toEffectData([
        {
            title: "Marking Duration",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.MarkingFrameSubSpec,
        },
    ]);
}

function getPoisonData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getSchieldData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Maximum HP",
            params: params.GameParameters.MoveParam!.MaxHP,
        },
    ]);
}

function getSprinklerData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Duration First Phase",
            params: params.GameParameters.MoveParam!.PeriodFirst,
        },
        {
            title: "Duration Second Phase",
            params: params.GameParameters.MoveParam!.PeriodSecond,
        },
    ]);
}

function getTrapData(params: SubParams): StatsData[] {
    return toEffectData([
        {
            title: "Detection Radius",
            params: params.GameParameters.AreaParam!.Distance,
        },
        {
            title: "Marking Duration",
            params: params.GameParameters.AreaParam!.MarkingFrameSubSpec,
        },
        {
            title: "Damage Distance Rate",
            params: params.GameParameters.MoveParam!.SensorRadius,
        },
        {
            title: "Sensor Radius",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[0].Value,
        },
    ]);
}

function toEffectData(items: { title: string; params: SkillParams }[]): StatsData[] {
    return items.map((x) => ({ title: x.title, effectData: new EffectData(toAbilityVals(x.params)) }));
}

function toAbilityVals(skillParams: SkillParams) {
    return [skillParams.High, skillParams.Mid, skillParams.Low];
}