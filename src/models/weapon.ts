export type WeaponInfoMain = {
    Type: WeaponType;
    Id: number;
    IsCoopRare: boolean;
    __RowId: string;
    SpecActor: string;
    // "SpecialWeapon": "Work/Gyml/SpBlower.spl__WeaponInfoSpecial.gyml",
    SpecialWeapon: string;
    // "SubWeapon": "Work/Gyml/PoisonMist.spl__WeaponInfoSub.gyml",
    SubWeapon: string;
    SpecialPoint: number;
    DefaultHitEffectorType: EffectorType;
};

export type WeaponInfoSub = {
    DefaultDamageRateInfoRow: string;
    DefaultHitEffectorType: string;
    ExtraDamageRateInfoRowSet: ExtraDamageRateInfo[];
    ExtraHitEffectorInfoSet: ExtraHitEffectorInfo[];
    Id: number;
    Label: string;
    LockerGoodsSubWeaponInfo: string;
    NpcActor: string;
    SpecActor: string;
    Type: WeaponType;
    __RowId: string;
};

export type WeaponType = "Versus" | "Coop" | "Mission" | "Rival";

type ExtraDamageRateInfo = {
    DamageRateInfoRow: string;
    ExtraInfo: string;
};

type ExtraHitEffectorInfo = {
    ExtraInfo: string;
    HitEffectorType: string;
};

// {
//     "DamageRateInfoRow": "Bomb_CurlingBullet",
//     "ExtraInfo": "Normal"
//   },

export type WeaponParam = {
    InkConsume?: number;
    InkConsumeFullCharge?: number;
    InkConsumeMinCharge?: number;

    // WeaponSpJetpack
    SpecialTotalFrame: SkillParams;
    // BooyahBombChargeRateAutoPerFrame
    ChargeRateAutoPerFrame: SkillParams;

    // WeaponSpSuperHook
    InkConsume_Hook: SkillParams;
    InkConsume_PerSec: SkillParams;
    Stand_DegSwerve: number;
    Jump_DegSwerve: number;
};

export type EffectorType =
    | "Blaster"
    | "Roller"
    | "Charger_FullCharge"
    | "Charger"
    | "Maneuver"
    | "Saber"
    | "Shelter"
    | "Shooter"
    | "Default"
    | "Slosher_Bathtub"
    | "Slosher_BearLeader"
    | "Slosher"
    | "Slosher_LauncherLeader"
    | "Spinner";

export type WeaponSpeedType = "Fast" | null | "Slow";

export type MainWeaponSetting = {
    WeaponSpeedType: WeaponSpeedType;
};

export type WeaponParamsGameParameters = {
    MainWeaponSetting: MainWeaponSetting;
    WeaponParam?: WeaponParam;

    // WeaponSpBlower
    InhaleParam?: InhaleParam;

    // WeaponSpChariot
    WeaponSpChariotParam?: WeaponSpChariotParam;

    // WeaponSpEnergyStand
    FridgeParam?: FridgeParam;

    // BigBubblerMaxHP
    spl__BulletSpGreatBarrierMoveParam?: spl__BulletSpGreatBarrierMoveParam;

    // WeaponSpInkStorm
    CloudParam?: CloudParam;

    // WeaponSpInkStorm & WeaponSpTripleTornado
    MoveParam?: MoveParam;

    // WeaponSpJetpack & WeaponSpUltraShot
    BlastParam?: BlastParam;

    // WeaponSpMicroLaser
    spl__BulletSpMicroLaserBitParam?: spl__BulletSpMicroLaserBitParam;

    // WeaponSpMultiMissile
    spl__WeaponSpMultiMissileLockOnParam?: spl__WeaponSpMultiMissileLockOnParam;

    // WeaponSpShockSonar
    spl__BulletSpShockSonarParam?: spl__BulletSpShockSonarParam;

    // WeaponSpSkewer
    BulletBlastParam?: BulletBlastParam;

    spl__BulletBlastParam?: BulletBlastParam;

    // WeaponSpUltraShot
    spl__WeaponSpUltraShotParam?: spl__WeaponSpUltraShotParam;

    // WeaponSpUltraStamp
    spl__WeaponSpUltraStampParam?: spl__WeaponSpUltraStampParam;

    IceParam?: { BlastParam: BlastParam };

    WeaponSwingParam?: WeaponSwingParam;
    WeaponVerticalSwingParam?: WeaponVerticalSwingParam;
    WeaponWideSwingParam?: WeaponWideSwingParam;
    spl__WeaponShelterCanopyParam?: spl__WeaponShelterCanopyParam;
    spl__WeaponShelterShotgunParam?: spl__WeaponShelterShotgunParam;
};

export type WeaponParams = {
    GameParameters: WeaponParamsGameParameters;
};

export type InhaleParam = {
    RadiusMax: SkillParams;
    RadiusMin: SkillParams;
};

type WeaponSpChariotParam = {
    SpecialTotalFrame: SkillParams;
};

type FridgeParam = {
    PowerUpFrame: SkillParams;
};

type spl__BulletSpGreatBarrierMoveParam = {
    BarrierParam: {
        MaxFieldHP: SkillParams;
        MaxHP: SkillParams;
    };
};

type CloudParam = {
    RainyFrame: SkillParams;
};

export type MoveParam = {
    SpawnSpeedZSpecUp: SkillParams;
    MarkingFrame: SkillParams;
    MarkingFrameSubSpec: SkillParams;
    MaxHP: SkillParams;
    PeriodFirst: SkillParams;
    PeriodSecond: SkillParams;
    SensorRadius: SkillParams;
    BlastParamArray?: BlastParamArrayItem[],
    DirectDamage?: number,
    DamageSpanFrame?: number,
};

export type SkillParams = { High: number; Low: number; Mid: number };

export type BlastParam = {
    // length: 5
    // 0: InkjetBurstPaintRadius
    // 1: InkjetDistanceDamageDistanceRate
    // 2: InkjetSplashAroundVelocityMin
    // 3: InkjetSplashAroundVelocityMax
    // 4: InkjetSplashAroundPaintRadius
    SubSpecialSpecUpList: { Value: SkillParams }[];
    DistanceDamage?: DistanceDamage, 
    SplashBlastParam?: {DistanceDamage: DistanceDamage},
};

type BlastParamArrayItem = {
    CrossPaintRadius: number,
    DistanceDamage: DistanceDamage,
    KnockBackParam: { Accel: number, Bias: number, Distance: number},
    PaintRadius: number,
    SplashAroundParam: {
        Num: number,
        OffsetY: number,
        PaintRadius: number,
        PitchMax: number,
        PitchMin: number,
        VelocityMax: number,
        VelocityMin: number,
    }
}

export type DistanceDamage = { Damage: number, Distance: number }[];

type spl__BulletSpMicroLaserBitParam = {
    LaserParam: { LaserFrame: SkillParams };
};

type spl__WeaponSpMultiMissileLockOnParam = {
    TargetInCircleRadius: SkillParams;
    // 0: TentaMissilesBurstPaintRadius
    SubSpecialSpecUpList: { Value: SkillParams }[];
};

type spl__BulletSpShockSonarParam = {
    WaveParam: {
        MaxFrame: SkillParams;
        MaxRadius: SkillParams;
    };
};

type BulletBlastParam = {
    // 0: ReefsliderDistanceDamageDistanceRate
    // 1: ReefsliderPaintRadius
    // 2: ReefsliderSplashAroundVelocityMin
    // 3: ReefsliderSplashAroundVelocityMax
    // 4: ReefsliderSplashAroundPaintRadius
    SubSpecialSpecUpList: { Value: SkillParams }[];
};

type spl__WeaponSpUltraShotParam = {
    SpecialDurationFrame: SkillParams;
};

type spl__WeaponSpUltraStampParam = {
    SpecialTotalFrame: SkillParams;
};

type WeaponSwingParam = WeaponVerticalSwingParam & {
    GuideParam: { Frame: number; WidthScale: number };
};

type WeaponVerticalSwingParam = {
    InkConsume: number;
    InkRecoverStop: number;
    SwingFrame: number;
    SwingMoveSpeed: number;
};

type WeaponWideSwingParam = WeaponSwingParam;

type WideSwingUnitGroupParam = {
    DamageParam: any;
    SplashNearestParam: any;
    Unit: any;
};

type spl__WeaponShelterCanopyParam = {
    CanopyChargeFrame: number;
    CanopyDirXZ_RotDeg_H: number;
    CanopyDirXZ_RotDeg_L: number;
    CanopyNakedFrame: number;
    CanopyOpenEndOffset: number;
    anopyOpenFrame: number;
    CanopyOpenStartOffset: number;
    CanopyShotFrame: number;
    InkConsumeUmbrella: number;
};

type spl__WeaponShelterShotgunParam = {
    InkConsume: number;
    InkRecoverStop: number;
    InkRecoverStopCharge: number;
    JumpGndCharge: number;
    MoveSpeed: number;
    MoveSpeedCharge: number;
    PostDelayFrame_Main: number;
    PostDelayFrame_MoveLmt: number;
    PostNoShotReqFrame: number;
    PreDelayFrame_HumanMain: number;
    PreDelayFrame_SquidMain: number;
    RepeatFrame: number;
};

export type SubName = 
    "Beacon" |
    "BombCurling" |
    "BombFizzy" |
    "BombQuick" |
    "BombRobot" |
    "BombSplash" |
    "BombSuction" |
    "BombTorpedo" |
    "LineMarker" |
    "PointSensor" |
    "PoisonMist" |
    "Shield" |
    "Sprinkler" |
    "Trap"