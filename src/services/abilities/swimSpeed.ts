import type { EffectAndTitleData } from "@/models/baseAbilities";
import type { Splat3Weapon } from "../weapons";
import { EffectData, getAbilityValsWithPostfix } from "../calculate";

export async function getAll(weapon: Splat3Weapon) {
    return[
        await getSwimSpeedData(weapon)
    ];
}

export async function getSwimSpeedData(weapon: Splat3Weapon) : Promise<EffectAndTitleData> {
    return {
        title: "Swimm Velocity",
        data: new EffectData(await getAbilityValsWithPostfix(weapon, "MoveVel_Stealth"))
            .mapSimple(x => x * 10)
    };
}