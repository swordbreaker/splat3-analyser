import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals } from "../calculate";

export async function getAll() {
    return [
        await getArmorHpData(),
        await getDamageLimitData(),
        await getDamagePerFrameData(),
        await getJumpVelocityData(),
        await getMoveVelocityData(),
        await getMoveVelocityShootingData(),
        await getMoveVelocityShootingKData()
    ];
}

// Opponent Ink - Armor HP
export async function getArmorHpData(): Promise<EffectAndTitleData> {
    return {
        title: "Armor HP in Opponent Ink",
        data: new EffectData(await getAbilityVals("OpInk_ArmorHP")),
    };
}

// Opponent Ink - Damage Limit
export async function getDamageLimitData(): Promise<EffectAndTitleData> {
    return {
        title: "Damage Limit in Opponent Ink",
        data: new EffectData(await getAbilityVals("OpInk_DamageLmt"))
    };
}

//Opponent Ink - Damage Per Frame
export async function getDamagePerFrameData(): Promise<EffectAndTitleData> {
    return {
        title: "Damage Pre Frame in Opponent Ink",
        data: new EffectData(await getAbilityVals("OpInk_DamagePerFrame"))
    };
}

// Opponent Ink - Jump Velocity
export async function getJumpVelocityData(): Promise<EffectAndTitleData> {
    return {
        title: "Jump Velocity in Opponent Ink",
        data: new EffectData(await getAbilityVals("OpInk_JumpVel"))
    };
}

// Opponent Ink - Move Velocity
export async function getMoveVelocityData(): Promise<EffectAndTitleData> {
    return {
        title: "Move Velocity in Opponent Ink",
        data: new EffectData(await getAbilityVals("OpInk_MoveVel"))
    };
}

// Opponent Ink - Move Velocity Shooting
export async function getMoveVelocityShootingData(): Promise<EffectAndTitleData> {
    return {
        title: " Move Velocity while Shooting in Opponent Ink",
        data: new EffectData(await getAbilityVals("OpInk_MoveVel_Shot"))
    };
}

// Opponent Ink - Move Velocity ShootingK
export async function getMoveVelocityShootingKData(): Promise<EffectAndTitleData> {
    return {
        title: "Opponent Ink - Move Velocity ShootingK",
        data: new EffectData(await getAbilityVals("OpInk_MoveVel_ShotK")),
        note: "I don't know what the K stands for, maybe when rolling or moving with the brush down.",
    };
}