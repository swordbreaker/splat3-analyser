import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals } from "../calculate";

export async function getAll() {
    return [
        await getInkRecoveryUpStanding(),
        await getInkRecoveryUpSwimming()
    ];
}

async function getInkRecoveryUpStanding() : Promise<EffectAndTitleData> {
    return {
        title: "Ink Recovery Frames - Swimming",
        data: new EffectData(await getAbilityVals("InkRecoverFrm_Std"))
    };
}

async function getInkRecoveryUpSwimming() : Promise<EffectAndTitleData> {
    return {
        title: "Ink Recovery Frames - Standing",
        data: new EffectData(await getAbilityVals("InkRecoverFrm_Stealth"))
    }
}