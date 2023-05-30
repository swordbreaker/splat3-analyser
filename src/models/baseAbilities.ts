import type { IPlotData } from "@/services/calculate";

export type EffectAndTitleData = {
    title: string;
    data: IPlotData;
    note?: string;
};

export type AbilityParamNames =
    | "ConsumeRt_Main"
    | "ConsumeRt_Sub_Lv0"
    | "ConsumeRt_Sub_Lv1"
    | "ConsumeRt_Sub_Lv2"
    | "ConsumeRt_Sub_Lv3"
    | "ConsumeRt_Sub_Lv4"
    | "DamageRt_BombH"
    | "DamageRt_BombL"
    | "DamageRt_LineMarker"
    | "DamageRt_Shield"
    | "DamageRt_Sprinkler"
    | "Dying_AroundFrm"
    | "Dying_ChaseFrm"
    | "IncreaseRt_Special"
    | "InkRecoverFrm_Std"
    | "InkRecoverFrm_Stealth"
    | "MarkingTimeRt"
    | "MarkingTimeRt_Trap"
    | "MoveDownRt_PoisonMist"
    | "MoveVelRt_Shot"
    | "MoveVel_Human"
    | "MoveVel_Human_Fast"
    | "MoveVel_Human_Slow"
    | "MoveVel_Stealth"
    | "MoveVel_Stealth_Fast"
    | "MoveVel_Stealth_Slow"
    | "OpInk_ArmorHP"
    | "OpInk_DamageLmt"
    | "OpInk_DamagePerFrame"
    | "OpInk_JumpVel"
    | "OpInk_MoveVel"
    | "OpInk_MoveVel_Shot"
    | "OpInk_MoveVel_ShotK"
    | "Overwrite_ConsumeRt_Main"
    | "Overwrite_MoveVelRt_Shot"
    | "Somersault_MoveVelKd"
    | "SpecialGaugeRt_Restart"
    | "SuperJump_ChargeFrm"
    | "SuperJump_MoveFrm"
    | "WallJumpChargeFrm"
    | "ReduceJumpSwerveRate";