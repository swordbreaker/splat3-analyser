import { loadJson } from "./util";

export type Splat3Params = {
    ConsumeRt_Main: number[],
    ConsumeRt_Sub_Lv0: number[],
    ConsumeRt_Sub_Lv1: number[],
    ConsumeRt_Sub_Lv2: number[],
    ConsumeRt_Sub_Lv3: number[],
    ConsumeRt_Sub_Lv4: number[],
    DamageRt_BombH: number[],
    DamageRt_BombL: number[],
    DamageRt_LineMarker: number[],
    DamageRt_Shield: number[],
    DamageRt_Sprinkler: number[],
    Dying_AroundFrm: number[],
    Dying_ChaseFrm: number[],
    IncreaseRt_Special: number[],
    InkRecoverFrm_Std: number[],
    InkRecoverFrm_Stealth: number[],
    MarkingTimeRt: number[],
    MarkingTimeRt_Trap: number[],
    MoveDownRt_PoisonMist: number[],
    MoveVelRt_Shot: number[],
    MoveVel_Human: number[],
    MoveVel_Human_Fast: number[],
    MoveVel_Human_Slow: number[],
    MoveVel_Stealth: number[],
    MoveVel_Stealth_Fast: number[],
    MoveVel_Stealth_Slow: number[],
    OpInk_ArmorHP: number[],
    OpInk_DamageLmt: number[],
    OpInk_DamagePerFrame: number[],
    OpInk_JumpVel: number[],
    OpInk_MoveVel: number[],
    OpInk_MoveVel_Shot: number[],
    OpInk_MoveVel_ShotK: number[],
    Overwrite_ConsumeRt_Main: number[],
    Overwrite_MoveVelRt_Shot: number[],
    Somersault_MoveVelKd: number[],
    SpecialGaugeRt_Restart: number[],
    SuperJump_ChargeFrm: number[],
    SuperJump_MoveFrm: number[],
    WallJumpChargeFrm: number[],
    ReduceJumpSwerveRate: number[]
}

export async function loadParams(version: string = "310"){
    return await loadJson<Splat3Params>(`/splat3/data/parameter/${version}/misc/params.json`);
}