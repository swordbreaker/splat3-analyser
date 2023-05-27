// DamageRt_BombH
// DamageRt_BombL
// DamageRt_LineMarker
// DamageRt_Shield
// DamageRt_Sprinkler

// MarkingTimeRt
// MarkingTimeRt_Trap
// MoveDownRt_PoisonMist

const damageTypeToParamsKey: Record<
  DamageType, string | Array<string>> = {
  NORMAL_MIN: "DamageParam_ValueMin",
  NORMAL_MAX: "DamageParam_ValueMax",
  NORMAL_MAX_FULL_CHARGE: "DamageParam_ValueFullChargeMax",
  DIRECT: "DamageParam_ValueDirect",
  DIRECT_MIN: "DamageParam_ValueDirectMin",
  DIRECT_MAX: "DamageParam_ValueDirectMax",
  DISTANCE: [
    "BlastParam_DistanceDamage",
    "DistanceDamage_BlastParamArray",
    "DistanceDamage_BlastParamChase",
  ],
  SPLASH: ["BlastParam_SplashDamage", "DistanceDamage_SplashBlastParam"],
  FULL_CHARGE: "DamageParam_ValueFullCharge",
  MAX_CHARGE: "DamageParam_ValueMaxCharge",
  TAP_SHOT: "DamageParam_ValueMinCharge",
  SPLATANA_VERTICAL: "DamageParam_SplatanaVertical",
  SPLATANA_VERTICAL_DIRECT: "DamageParam_SplatanaVerticalDirect",
  SPLATANA_HORIZONTAL: "DamageParam_SplatanaHorizontal",
  SPLATANA_HORIZONTAL_DIRECT: "DamageParam_SplatanaHorizontalDirect",
  BOMB_NORMAL: "DistanceDamage",
  BOMB_DIRECT: "DirectDamage",
};

export type DamageType = 
    "NORMAL_MIN" |
    "NORMAL_MAX" |
    "NORMAL_MAX_FULL_CHARGE" | // Hydra Splatling goes from 32 to 40 dmg when fully charged
    "DIRECT" |
    "DIRECT_MIN" |
    "DIRECT_MAX" |
    "FULL_CHARGE" |
    "MAX_CHARGE" |
    "TAP_SHOT" |
    "DISTANCE" |
    "SPLASH" |
    "BOMB_DIRECT" |
    "BOMB_NORMAL" |
    "SPLATANA_VERTICAL" |
    "SPLATANA_VERTICAL_DIRECT" |
    "SPLATANA_HORIZONTAL" |
    "SPLATANA_HORIZONTAL_DIRECT";