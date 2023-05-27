import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals } from "../calculate";
import { loadPlayerData } from "../player";
import type { Splat3Weapon } from "../weapons";

export async function getAll(): Promise<EffectAndTitleData[]> {
    return [
        await getSquidSurgeVelocityData(),
        await getWallJumpChargeFrameData(),
        await getReduceJumpSwerveRateData(),
        geReduceJumpSwerveRateBlasterData(),
    ];
}

async function getSquidSurgeVelocityData(): Promise<EffectAndTitleData> {
    return {
        title: "Squid Surge - Move Velocity Kd",
        data: new EffectData(await getAbilityVals("Somersault_MoveVelKd")),
    };
}

async function getWallJumpChargeFrameData(): Promise<EffectAndTitleData> {
    const params = await loadPlayerData();
    const c = params.GameParameters.spl__PlayerGearSkillParam_ActionSpecUp_Squid;

    const abilities = [c.WallJumpChargeFrm_High, c.WallJumpChargeFrm_Mid, c.WallJumpChargeFrm_Low];

    return {
        title: "Wall Jump Charge Frame",
        data: new EffectData(abilities).mapSimple((x) => Math.ceil(x)),
    };
}

async function getReduceJumpSwerveRateData(): Promise<EffectAndTitleData> {
    return {
        title: "Reduce Jump Swerve Rate",
        data: new EffectData(await getAbilityVals("ReduceJumpSwerveRate")),
    };
}

function geReduceJumpSwerveRateBlasterData(): EffectAndTitleData {
    return {
        title: "Reduce Jump Swerve Rate Blaster",
        data: new EffectData([1.0, 0.5, 0.0]),
    };
}

export async function getShotSpreadAir(weapon: Splat3Weapon) {
    const groundSpread = weapon.mainParams.GameParameters.WeaponParam!.Stand_DegSwerve;
    const jumpSpread = weapon.mainParams.GameParameters.WeaponParam!.Jump_DegSwerve;

    const effectData = (weapon.mainInfo.DefaultHitEffectorType == "Blaster")
        ? geReduceJumpSwerveRateBlasterData()
        : await getReduceJumpSwerveRateData();

    const extraSperad = jumpSpread - groundSpread;
    return {
        title: "Shot spread in degrees (jumping) ",
        data: effectData.data.mapSimple((effect) => extraSperad * (1 - effect)),
    };
}
