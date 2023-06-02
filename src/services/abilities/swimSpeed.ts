import type { EffectAndTitleData } from "@/models/baseAbilities";
import type { Splat3Weapon } from "../weapons";
import { EffectData, getAbilityValsWithPostfix } from "../calculate";

export async function getAll(weapon: Splat3Weapon, hasNinja: boolean) {
    return [
        await getSwimSpeedData(weapon, hasNinja)
    ];
}

export async function getSwimSpeedData(weapon: Splat3Weapon, hasNinja: boolean): Promise<EffectAndTitleData> {
    const ninjaMultiplier = hasNinja ? 0.9 : 1;
    return {
        title: "Swimm Velocity",
        data: new EffectData(await getAbilityValsWithPostfix(weapon, "MoveVel_Stealth"))
            .mapSimple(x => x * 10 * ninjaMultiplier)
    };
}