import type { SkillParams } from "@/services/weapons";

export type PlayerParameters = {
    GameParameters: GameParameters,
}

type GameParameters = {
    DieBlastParam: DieBlastParam,
    SSAtk: SSAtk,
    spl__ConstraintBindableHelperParam : spl__ConstraintBindableHelperParam,
    spl__CoopBuildParam : spl__CoopBuildParam,
    spl__CoopBuildParam_HumanMoveUp : spl__CoopBuildParam_HumanMoveUp,
    spl__CoopBuildParam_OpInkEffectReduction : spl__CoopBuildParam_OpInkEffectReduction,
    spl__CoopBuildParam_SquidMoveUp : spl__CoopBuildParam_SquidMoveUp,
    spl__DamageParam : spl__DamageParam,
    spl__DisplayItemGetHelperParam : spl__DisplayItemGetHelperParam,
    spl__InkRailPlayerParam : spl__InkRailPlayerParam,
    spl__PlayerAttractTargetParam : spl__PlayerAttractTargetParam,
    spl__PlayerBeaconSubSpecUpParam : spl__PlayerBeaconSubSpecUpParam,
    spl__PlayerCameraPeriscopeParam : spl__PlayerCameraPeriscopeParam,
    spl__PlayerCanolaShotParam : spl__PlayerCanolaShotParam,
    spl__PlayerEntryLiftParam : spl__PlayerEntryLiftParam,
    spl__PlayerGearSkillParam_ActionSpecUp_Squid : spl__PlayerGearSkillParam_ActionSpecUp_Squid,
    spl__PlayerGearSkillParam_SubEffectReduction : spl__PlayerGearSkillParam_SubEffectReduction,
    spl__PlayerGeyserParam : spl__PlayerGeyserParam,
    spl__PlayerGrindRailParam : spl__PlayerGrindRailParam,
    spl__PlayerJumpGimmickParam : spl__PlayerJumpGimmickParam,
    spl__PlayerMissionSearchAbilityParam : spl__PlayerMissionSearchAbilityParam,
    spl__PlayerMissionSkillParam : spl__PlayerMissionSkillParam,
    spl__PlayerPeriscopeParam : spl__PlayerPeriscopeParam,
    spl__PlayerPipelineParam : spl__PlayerPipelineParam,
    spl__PlayerVehicleSpectacleParam : spl__PlayerVehicleSpectacleParam,
    spl__ThrowClamParam : spl__ThrowClamParam,
    spl__ThrowGoldenIkuraParam : spl__ThrowGoldenIkuraParam,
}

// "DieBlastParam": {
//     "$type": "spl__BulletBlastParam",
//     "CollisionRadiusForPaint": 5.0,
//     "CrossPaintCheckLength": 0.0,
//     "CrossPaintRadius": 0.0,
//     "CrossPaintTexture": "Death00",
//     "DamageOffsetY": 0.001,
//     "KnockBackParam": {
//       "Accel": 0.0
//     },
//     "PaintOffsetY": 0.1,
//     "PaintRadius": 5.0,
//     "PaintTexture": "Death00",
//     "SplashAroundParam": {
//       "Num": 10,
//       "PaintRadius": 1.0,
//       "PitchMax": 45.0,
//       "VelocityMax": 0.72,
//       "VelocityMin": 0.54
//     }
//   },
type DieBlastParam = any;

// "SSAtk": {
//     "$type": "spl__BulletSpCastleBodyParam",
//     "CollisionDashRadiusForPlayer": 3.0,
//     "CollisionJumpRadiusForPlayer": 3.0,
//     "CollisionRadiusForField": 0.0,
//     "DamageDashValue": 1000,
//     "DamageJumpValue": 1000,
//     "KnockBackRate": 0.0,
//     "PaintSpanFrame": 60,
//     "PaintWidthHalf": 0.0
//   },
type SSAtk = any;

// "spl__ConstraintBindableHelperParam": {
//     "$type": "spl__ConstraintBindableHelperParam"
//   },
type spl__ConstraintBindableHelperParam = any;

// "spl__CoopBuildParam": {
//     "$type": "spl__PlayerCoopBuildParam"
//   },
type spl__CoopBuildParam = any;

// "spl__CoopBuildParam_HumanMoveUp": {
//     "$type": "spl__PlayerGearSkillParam_HumanMoveUp"
//   },
type spl__CoopBuildParam_HumanMoveUp = any;

// "spl__CoopBuildParam_OpInkEffectReduction": {
//     "$type": "spl__PlayerGearSkillParam_OpInkEffectReduction"
//   },
type spl__CoopBuildParam_OpInkEffectReduction = any;

// "spl__CoopBuildParam_SquidMoveUp": {
//     "$type": "spl__PlayerGearSkillParam_SquidMoveUp"
//   },
type spl__CoopBuildParam_SquidMoveUp = any;

// "spl__DamageParam": {
//     "$type": "spl__DamageParam",
//     "DamageReceiverArray": [
//       {
//         "DamageHistMaxSize": 64,
//         "DamageRateInfoCol": "Default",
//         "Flag": [
//           "TargetedByBombRobot",
//           "TargetedByMultiMissile"
//         ],
//         "IsManualRefRigidBody": false,
//         "Name": "Main",
//         "RefHitPointHolder": [],
//         "RefRigidBody": [
//           "ColBullet",
//           "Body",
//           "ColBullet_CoopZombie"
//         ]
//       },
//       {
//         "DamageHistMaxSize": 64,
//         "DamageRateInfoCol": "Chariot",
//         "Flag": [],
//         "IsManualRefRigidBody": false,
//         "Name": "Chariot",
//         "RefHitPointHolder": [],
//         "RefRigidBody": [
//           "ColBullet_Chariot"
//         ]
//       }
//     ],
//     "DamageSenderArray": [
//       {
//         "Name": "Chariot",
//         "RefRigidBody": [
//           "ColBullet_Chariot"
//         ]
//       }
//     ]
//   },
type spl__DamageParam = any;

// "spl__DisplayItemGetHelperParam": {
//     "$type": "spl__DisplayItemGetHelperParam"
//   },
type spl__DisplayItemGetHelperParam = any;

// "spl__InkRailPlayerParam": {
//     "$type": "spl__InkRailPlayerParam",
//     "FinishImmAfterFrame": 30,
//     "FinishPlayerVelRateY": 0.3,
//     "ModelDynamicsUnitParam": {
//       "AirRes": 0.9,
//       "ConnectionForce": 0.08,
//       "EndBoneName": "under",
//       "Gravity": 0.008,
//       "LimitAngle": 50.0,
//       "LimitLengthRateDiff": 2.0,
//       "StartBoneName": "under00"
//     },
//     "PlayerJumpRightSpeed": 0.01,
//     "SwitchColBulletStartDist": 1.5
//   },
type spl__InkRailPlayerParam = any;

// "spl__PlayerAttractTargetParam": {
//     "$type": "spl__PlayerAttractTargetParam"
//   },
type spl__PlayerAttractTargetParam = {
    SubSpecUpParam: SkillParams
};
type spl__PlayerBeaconSubSpecUpParam = any;

// "spl__PlayerCameraPeriscopeParam": {
//     "$type": "spl__PlayerCameraPeriscopeParam",
//     "PlayerFollowRate": {
//       "Data": [
//         0.0,
//         0.0,
//         0.1,
//         0.1081761
//       ],
//       "MaxX": 1.0,
//       "Type": "Hermit"
//     },
//     "YawAngleVelRateGyro": {
//       "Data": [
//         1.0,
//         0.0,
//         0.01,
//         -2.417407
//       ],
//       "MaxX": 1.0,
//       "Type": "Hermit"
//     },
//     "YawAngleVelRateStick": {
//       "Data": [
//         1.0,
//         0.0,
//         0.01,
//         -2.428913
//       ],
//       "MaxX": 1.0,
//       "Type": "Hermit"
//     }
//   },
type spl__PlayerCameraPeriscopeParam = any;

// "spl__PlayerCanolaShotParam": {
//     "$type": "spl__PlayerCanolaShotParam"
//   },
type spl__PlayerCanolaShotParam = any;

// "spl__PlayerEntryLiftParam": {
//     "$type": "spl__PlayerEntryLiftParam",
//     "BoostVelMax": 0.22,
//     "CanFinishFrame": 60,
//     "EnableFloorMarker": true,
//     "FinishVel": 0.0,
//     "MoveAcc": 0.001,
//     "MoveVelMax": 0.11,
//     "PlayerYOffset": -3.75,
//     "ShapeCastLength": 100.0
//   },
type spl__PlayerEntryLiftParam = any;

type spl__PlayerGearSkillParam_ActionSpecUp_Squid = {
    WallJumpChargeFrm_High: number,
    WallJumpChargeFrm_Low: number,
    WallJumpChargeFrm_Mid: number,
};

// "spl__PlayerGearSkillParam_SubEffectReduction": {
//     "$type": "spl__PlayerGearSkillParam_SubEffectReduction",
//     "DamageRt_BombL_High": 0.6,
//     "DamageRt_BombL_Mid": 0.75
//   },
type spl__PlayerGearSkillParam_SubEffectReduction = any;

// "spl__PlayerGeyserParam": {
//     "$type": "spl__PlayerGeyserParam",
//     "BindToRoofMinSec": 0.05,
//     "JumpVelAtRoof": 0.12
//   },
type spl__PlayerGeyserParam = any;

// "spl__PlayerGrindRailParam": {
//     "$type": "spl__PlayerGrindRailParam",
//     "AerialVelYToBind": -0.05,
//     "AutoFinish_CheckDist": 0.001,
//     "AutoFinish_VelY": 0.05,
//     "AutoJumpFinishNoBindFrame": 60,
//     "BindDistY": 0.0,
//     "FinishNoBindFrame": 10,
//     "FinishPlayerVelRateY": 0.5,
//     "GndCol_FallNoBindFrame": 60,
//     "GndCol_Radius": 0.3,
//     "PlayerJumpSpeed": 0.145,
//     "PlayerSideJumpEndFix": 0
//   },
type spl__PlayerGrindRailParam = any;

// "spl__PlayerJumpGimmickParam": {
//     "$type": "spl__PlayerJumpGimmickParam",
//     "JumpDisableFrm": 24
//   },
type spl__PlayerJumpGimmickParam = any;

// "spl__PlayerMissionSearchAbilityParam": {
//     "$type": "spl__PlayerMissionSearchAbilityParam",
//     "MarkingForgetTime": 0.05,
//     "PeriscopeMarkingMaxNum": [
//       5,
//       10,
//       15
//     ],
//     "PeriscopeRadius": [
//       25.0,
//       50.0,
//       80.0
//     ],
//     "RadiusParam": [
//       {
//         "StrongRadius": 0.0,
//         "WeakRadius": 0.0
//       },
//       {
//         "StrongRadius": 0.0,
//         "WeakRadius": 15.0
//       },
//       {
//         "StrongRadius": 15.0,
//         "WeakRadius": 25.0
//       }
//     ],
//     "SightParam": {
//       "QueryLayerHitMaskEntity": "HitAll",
//       "QuerySubLayerHitMaskEntity": "ActualGroundThrough",
//       "ShapeHolderUnitParamArray": [
//         {
//           "Name": "Main",
//           "ShapeHolderParam": {
//             "SphereArray": [
//               {}
//             ]
//           }
//         }
//       ],
//       "UseDefilade": false
//     }
//   },
type spl__PlayerMissionSearchAbilityParam = any;

// "spl__PlayerMissionSkillParam": {
//     "$type": "spl__PlayerMissionSkillParam",
//     "ArmorRecoverFrame": [
//       720,
//       600,
//       480
//     ],
//     "InkTankCapacityRate": [
//       1.0,
//       1.2,
//       1.4
//     ],
//     "MarkerCheckRadius": [
//       0.0,
//       6.0,
//       18.0
//     ],
//     "OpInkEffect_MoveSpeed_Jump": [
//       0.08,
//       0.09,
//       0.11
//     ],
//     "OpInkEffect_MoveSpeed_Normal": [
//       0.024,
//       0.04,
//       0.06
//     ],
//     "OpInkEffect_MoveSpeed_Shot": [
//       0.014,
//       0.0275,
//       0.042
//     ],
//     "ShooterShotIntervalFrame": [
//       9,
//       6,
//       6
//     ],
//     "SpecialIncreaseUpRate": [
//       1.0,
//       1.2,
//       1.5
//     ],
//     "SubWeapon1_InkConsumeCoef": 0.6,
//     "SubWeapon2_InkConsumeCoef": 0.6,
//     "SubWeapon3_InkConsumeCoef": 0.6
//   },
type spl__PlayerMissionSkillParam = any;

// "spl__PlayerPeriscopeParam": {
//     "$type": "spl__PlayerPeriscopeParam",
//     "ExtendSec": 1.6,
//     "ShrinkMoveGraph": {
//       "Data": [
//         1.0,
//         -0.1860269,
//         0.0,
//         -0.124018
//       ],
//       "MaxX": 1.0,
//       "Type": "Hermit"
//     },
//     "ShrinkSec": 0.8
//   },
type spl__PlayerPeriscopeParam = any;

// "spl__PlayerPipelineParam": {
//     "$type": "spl__PlayerPipelineParam",
//     "DarkenDelaySec": 0.79,
//     "FinishSec": 0.5,
//     "FinishVel": 0.28,
//     "ModelOffsetY": {
//       "Data": [
//         0.0,
//         0.0
//       ],
//       "MaxX": 1.0,
//       "Type": "Linear"
//     },
//     "ModelOffsetZ": {
//       "Data": [
//         0.0,
//         2.0
//       ],
//       "MaxX": 1.0,
//       "Type": "Linear"
//     },
//     "MoveAcc": 0.05,
//     "OpenEndDistance": 8.0,
//     "StartAttCurve": {
//       "Data": [
//         0.0,
//         2.175926,
//         1.0,
//         0.0,
//         1.0,
//         0.0
//       ],
//       "MaxX": 1.0,
//       "Type": "Hermit"
//     },
//     "StartSec": 0.8,
//     "StartSplashStartOffsetZ": 0.5
//   },
type spl__PlayerPipelineParam = any;

// "spl__PlayerVehicleSpectacleParam": {
//     "$type": "spl__PlayerVehicleSpectacleParam"
//   },
type spl__PlayerVehicleSpectacleParam = any;

// "spl__ThrowClamParam": {
//     "$type": "spl__ThrowClamParam",
//     "AdditionMoveParam": {
//       "XRate": 0.8,
//       "YMax": 0.16,
//       "YPlusRate": 2.0,
//       "ZRate": 1.0
//     },
//     "BlastGachiParam": {
//       "CrossPaintCheckLength": 0.0,
//       "CrossPaintRadius": 0.0,
//       "DistanceDamage": [
//         {
//           "Damage": 0,
//           "Distance": 2.5
//         }
//       ],
//       "KnockBackParam": {
//         "Accel": 0.0
//       },
//       "PaintRadius": 2.5
//     },
//     "ThrowGachiParam": {
//       "GuideHitCollisionType": "Clam",
//       "SpawnSpeedY": 0.24,
//       "SpawnSpeedYWorldMin": -0.4,
//       "SpawnSpeedZSpecUp": {
//         "High": 0.82,
//         "Low": 0.82,
//         "Mid": 0.82
//       }
//     },
//     "ThrowNormalParam": {
//       "GuideHitCollisionType": "Clam",
//       "SpawnSpeedY": 0.24,
//       "SpawnSpeedYWorldMin": -0.4,
//       "SpawnSpeedZSpecUp": {
//         "High": 1.04,
//         "Low": 1.04,
//         "Mid": 1.04
//       }
//     }
//   },
type spl__ThrowClamParam = any;

// "spl__ThrowGoldenIkuraParam": {
//     "$type": "spl__ThrowGoldenIkuraParam",
//     "AdditionMoveParam": {
//       "XRate": 1.6,
//       "YMax": 0.32,
//       "YPlusRate": 4.0
//     },
//     "AttackParam": {
//       "BlastParam": {
//         "CrossPaintCheckLength": 0.0,
//         "CrossPaintRadius": 0.0,
//         "DamageAttackerPriority": true,
//         "DamageOffsetY": -0.7,
//         "DistanceDamage": [
//           {
//             "Damage": 2000,
//             "Distance": 2.5
//           }
//         ],
//         "KnockBackParam": {
//           "Accel": 470.0,
//           "Bias": 0.8,
//           "Distance": 5.0
//         },
//         "PaintOffsetY": -0.7,
//         "PaintRadius": 3.5,
//         "SplashAroundParam": {
//           "PaintRadius": 1.0,
//           "VelocityMax": 0.54
//         }
//       },
//       "CollisionRadius": 1.0,
//       "DamageDirectHit": 8000,
//       "FlyGravity": 0.016,
//       "FlyPositionAirResist": 0.04,
//       "GuideHitCollisionType": "EnemyOnFenceOff",
//       "GuideRadius": 1.0,
//       "SpawnSpeedY": 0.36,
//       "SpawnSpeedYWorldMin": -0.4,
//       "SpawnSpeedZSpecUp": {
//         "High": 1.0,
//         "Low": 1.0,
//         "Mid": 1.0
//       }
//     },
//     "BlastParam": {
//       "DamageAttackerPriority": true,
//       "DistanceDamage": [
//         {
//           "Damage": 1000,
//           "Distance": 2.0
//         }
//       ],
//       "PaintRadius": 3.0
//     },
//     "InkConsume": 0.7,
//     "ThrowParam": {
//       "FlyHitWallReboundRate": 0.7,
//       "GuideHitCollisionType": "EnemyOffFenceOnBlowerOffShieldOff",
//       "ReturnWaterMinFrame": 25,
//       "SpawnSpeedY": 0.24,
//       "SpawnSpeedYWorldMin": -0.4,
//       "SpawnSpeedZSpecUp": {
//         "High": 1.12,
//         "Low": 1.12,
//         "Mid": 1.12
//       }
//     }
//   }
type spl__ThrowGoldenIkuraParam = any;