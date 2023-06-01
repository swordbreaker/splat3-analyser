import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, getAbilityVals, PlotData, type IPlotData } from "../calculate";
import { framesToSeconds } from "../util";

export async function getAll() {
    const jumpData = await getSuperJumpChargeFramesData();
    const airData = await getSuperJumpAirFramesData();
    return [jumpData, airData, getSuperJumpTotalTimeData(jumpData.data, airData.data)];
}

export async function getTotalSuperjumpTime() {
    const jumpData = await getSuperJumpChargeFramesData();
    const airData = await getSuperJumpAirFramesData();
    return getSuperJumpTotalTimeData(jumpData.data, airData.data);
}

async function getSuperJumpChargeFramesData(): Promise<EffectAndTitleData> {
    return {
        title: "Super Jump Charge Frame",
        data: new EffectData(await getAbilityVals("SuperJump_ChargeFrm")),
    };
}

async function getSuperJumpAirFramesData(): Promise<EffectAndTitleData> {
    return {
        title: "Super Jump Move Frame",
        data: new EffectData(await getAbilityVals("SuperJump_MoveFrm")),
    };
}

function getSuperJumpTotalTimeData(chargeData: IPlotData, airData: IPlotData): EffectAndTitleData {
    return {
        title: "total super jump time ",
        data: new SuperJumpTotalTimeData(chargeData, airData),
    };
}

function claculateJumpTime(ap: number, chargeData: IPlotData, airData: IPlotData) {
    const frames = chargeData.getEffect(ap) + airData.getEffect(ap);
    return framesToSeconds(frames);
}

export class SuperJumpTotalTimeData extends PlotData {
    constructor(chargeData: IPlotData, airData: IPlotData) {
        super((ap) => claculateJumpTime(ap, chargeData, airData));
    }
}
