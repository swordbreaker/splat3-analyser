import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals, getAbilityValsWithPostfix } from "../calculate";
import type { Splat3Weapon } from "../weapons";

export async function getAll(weapon: Splat3Weapon){
    return[
        await getRunSpeedShootingData(),
        await getRunSpeedNormalData(weapon)
    ];
}

async function getRunSpeedShootingData() : Promise<EffectAndTitleData> {
    return{
        title: "Move Velocity Rate - Shooting",
        data: new EffectData(await getAbilityVals("MoveVelRt_Shot"))
            .mapSimple(x => x * 10)
    }
}

async function getRunSpeedNormalData(weapon: Splat3Weapon) : Promise<EffectAndTitleData> {
    return{
        title: "Move Velocity Rate",
        data: new EffectData(await getAbilityValsWithPostfix(weapon, "MoveVel_Human"))
            .mapSimple(x => x * 10)
    }
}