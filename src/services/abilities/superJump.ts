import { EffectData, PlotData, getAbilityVals } from "../calculate";
import { framesToSeconds } from "../util";

export async function getSuperJumpChargeFramesData(){
    return new EffectData(await getAbilityVals("SuperJump_ChargeFrm"));
}

export async function getSuperJumpAirFramesData(){
    return new EffectData(await getAbilityVals("SuperJump_MoveFrm"));
}

function claculateJumpTime(ap: number, chargeData: EffectData, airData: EffectData) {
    const frames = chargeData.getEffect(ap) + airData.getEffect(ap);
    return framesToSeconds(frames);
}

export class SuperJumpTotalTimeData extends PlotData{
    constructor(chargeData: EffectData, airData: EffectData){
        super(ap => claculateJumpTime(ap, chargeData, airData));
    }
}