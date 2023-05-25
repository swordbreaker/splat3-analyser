import type { SkillParams, Splat3Weapon, WeaponParams } from "../weapons";
import { EffectData, type PlotData } from "../calculate";

export type StatsData = {
    title: string;
    effectData: PlotData;
};

export async function getSpecialUpData(weapon: Splat3Weapon): Promise<StatsData[]> {
    const specialInfo = await weapon.getSpecialWeaponInfo();
    console.log(weapon.SpecialWeaponId);
    switch (weapon.SpecialWeaponId) {
        case "SpBlower":
            return getInkVacData(specialInfo);
        case "SpChariot":
            return getCrabTankData(specialInfo);
        case "SpEnergyStand":
            return getTacticoolerData(specialInfo);
        case "SpGreatBarrier":
            return getBigBubblerData(specialInfo);
        case "SpInkStorm":
            return getInkStormData(specialInfo);
        case "SpJetpack":
            return getInkJetData(specialInfo);
        case "SpMicroLaser":
            return getKillerWailData(specialInfo);
        case "SpMultiMissile":
            return getTentaMisslesData(specialInfo);
        case "SpNiceBall":
            return getBooyaBombData(specialInfo);
        case "SpShockSonar":
            return getWaveBreakerData(specialInfo);
        case "SpSkewer":
            return getReefSliderData(specialInfo);
        case "SpSuperHook":
            return getZipCasterData(specialInfo);
        case "SpTripleTornado":
            return getTripleInkstrikeData(specialInfo);
        case "SpUltraShot":
            return getTrizookaData(specialInfo);
        case "SpUltraStamp":
            return getUltraStampData(specialInfo);
        case "SpCastle":
            return getKrakenData(specialInfo);
        case "SpFirework":
            return getMansData(specialInfo);
        default:
            return [];
    }
}

function getInkVacData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Ink Vac Maximum Radius",
            params: params.GameParameters.InhaleParam!.RadiusMax,
        },
        {
            title: "Ink Vac Minimum Radius",
            params: params.GameParameters.InhaleParam!.RadiusMin,
        },
    ]);
}

function getCrabTankData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Crab Tank Total Duration",
            params: params.GameParameters.WeaponSpChariotParam!.SpecialTotalFrame,
        },
    ]);
}

function getTacticoolerData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Tacticooler Power Up Duration",
            params: params.GameParameters.FridgeParam!.PowerUpFrame,
        },
    ]);
}

function getBigBubblerData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Big Bubbler Max Field HP",
            params: params.GameParameters.spl__BulletSpGreatBarrierMoveParam!.BarrierParam.MaxFieldHP,
        },
        {
            title: "Big Bubbler Max HP",
            params: params.GameParameters.spl__BulletSpGreatBarrierMoveParam!.BarrierParam.MaxHP,
        },
    ]);
}

function getInkStormData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Ink Storm Rain Duration",
            params: params.GameParameters.CloudParam!.RainyFrame,
        },
        {
            title: "Ink Storm Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getInkJetData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Inkjet Total Duration",
            params: params.GameParameters.WeaponParam!.SpecialTotalFrame,
        },
        {
            title: "Inkjet Burst Paint Radius",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[0].Value,
        },
        {
            title: "Inkjet Distance Damage Distance Rate",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[1].Value,
        },
        {
            title: "Inkjet Splash Around Velocity Minimum",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[2].Value,
        },
        {
            title: "Inkjet Splash Around Velocity Maximum",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[3].Value,
        },
        {
            title: "Inkjet Splash Around Paint Radius",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[4].Value,
        },
    ]);
}

function getKillerWailData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Killer Wail 5.1 Laser Duration",
            params: params.GameParameters.spl__BulletSpMicroLaserBitParam!.LaserParam.LaserFrame,
        },
    ]);
}

function getTentaMisslesData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Tenta Missiles Target In Circle Radius",
            params: params.GameParameters.spl__WeaponSpMultiMissileLockOnParam!.TargetInCircleRadius,
        },
        {
            title: "Tenta Missiles Burst Paint Radius",
            params: params.GameParameters.spl__BulletBlastParam!.SubSpecialSpecUpList[0].Value,
        },
    ]);
}

function getBooyaBombData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Booyah Bomb Auto Charge Rate Per Frame",
            params: params.GameParameters.WeaponParam!.ChargeRateAutoPerFrame,
        },
    ]);
}

function getWaveBreakerData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Wave Breaker Maximum Duration",
            params: params.GameParameters.spl__BulletSpShockSonarParam!.WaveParam.MaxFrame,
        },
        {
            title: "Wave Breaker Maximum Radius",
            params: params.GameParameters.spl__BulletSpShockSonarParam!.WaveParam.MaxRadius,
        },
    ]);
}

function getReefSliderData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Reefslider Distance Damage Distance Rate",
            params: params.GameParameters.BulletBlastParam!.SubSpecialSpecUpList[0].Value,
        },
        {
            title: "Reefslider Paint Radius",
            params: params.GameParameters.BulletBlastParam!.SubSpecialSpecUpList[1].Value,
        },
        {
            title: "Reefslider Splash Around Velocity Minimum",
            params: params.GameParameters.BulletBlastParam!.SubSpecialSpecUpList[2].Value,
        },
        {
            title: "Reefslider Splash Around Velocity Maximum",
            params: params.GameParameters.BulletBlastParam!.SubSpecialSpecUpList[3].Value,
        },
        {
            title: "Reefslider Splash Around Paint Radius",
            params: params.GameParameters.BulletBlastParam!.SubSpecialSpecUpList[4].Value,
        },
    ]);
}

function getZipCasterData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Zipcaster Ink Consumption Per Hook",
            params: params.GameParameters.WeaponParam!.InkConsume_Hook,
        },
        {
            title: "Zipcaster Ink Consumption Per Second",
            params: params.GameParameters.WeaponParam!.InkConsume_PerSec,
        },
    ]);
}

function getTripleInkstrikeData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Triple Inkstrike Throw Speed",
            params: params.GameParameters.MoveParam!.SpawnSpeedZSpecUp,
        },
    ]);
}

function getTrizookaData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Trizooka Duration",
            params: params.GameParameters.spl__WeaponSpUltraShotParam!.SpecialDurationFrame,
        },
        {
            title: "Trizooka Paint Radius",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[0].Value,
        },
        {
            title: "Trizooka Distance Damage Distance Rate",
            params: params.GameParameters.BlastParam!.SubSpecialSpecUpList[1].Value,
        },
    ]);
}

function getUltraStampData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Ultra Stamp Duration",
            params: params.GameParameters.spl__WeaponSpUltraStampParam!.SpecialTotalFrame,
        },
    ]);
}

function getKrakenData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Kraken Duration",
            params: params.GameParameters.WeaponParam!.SpecialTotalFrame,
        },
    ]);
}

function getMansData(params: WeaponParams): StatsData[] {
    return toEffectData([
        {
            title: "Super Chump Blast Radius",
            params: params.GameParameters.IceParam!.BlastParam.SubSpecialSpecUpList[0].Value,
        },
    ]);
}

function toEffectData(items: { title: string; params: SkillParams }[]): StatsData[] {
    return items.map((x) => ({ title: x.title, effectData: new EffectData(toAbilityVals(x.params)) }));
}

function toAbilityVals(skillParams: SkillParams) {
    return [skillParams.High, skillParams.Mid, skillParams.Low];
}
