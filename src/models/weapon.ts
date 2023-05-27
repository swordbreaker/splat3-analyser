export type WeaponInfoMain = {
    Type: "Versus" | "Coop" | "Mission" | "Rival";
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

export type WeaponParam = {
    InkConsume: number;

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
    'Blaster' |
    'Roller' |
    'Charger_FullCharge' |
    'Charger' |
    'Maneuver' |
    'Saber' |
    'Shelter' |
    'Shooter' |
    'Default' |
    'Slosher_Bathtub' |
    'Slosher_BearLeader' |
    'Slosher' |
    'Slosher_LauncherLeader' |
    'Spinner';

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
    spl__BulletSpShockSonarParam? : spl__BulletSpShockSonarParam;

    // WeaponSpSkewer
    BulletBlastParam?: BulletBlastParam;

    spl__BulletBlastParam?: BulletBlastParam;

    // WeaponSpUltraShot
    spl__WeaponSpUltraShotParam?: spl__WeaponSpUltraShotParam;

    // WeaponSpUltraStamp
    spl__WeaponSpUltraStampParam?: spl__WeaponSpUltraStampParam;

    IceParam?: { BlastParam: BlastParam;};
};

export type WeaponParams = {
    GameParameters: WeaponParamsGameParameters;
};

export type InhaleParam = {
    RadiusMax: SkillParams
    RadiusMin: SkillParams
}

type WeaponSpChariotParam = {
    SpecialTotalFrame: SkillParams
}

type FridgeParam = {
    PowerUpFrame: SkillParams
}

type spl__BulletSpGreatBarrierMoveParam = {
    BarrierParam: {
        MaxFieldHP: SkillParams,
        MaxHP: SkillParams,
    };
}

type CloudParam = {
    RainyFrame: SkillParams;
}

export type MoveParam = {
    SpawnSpeedZSpecUp: SkillParams;
    MarkingFrame: SkillParams;
    MarkingFrameSubSpec: SkillParams;
    MaxHP: SkillParams;
    PeriodFirst: SkillParams;
    PeriodSecond: SkillParams;
    SensorRadius: SkillParams;
}

export type SkillParams = { High: number, Low: number, Mid: number}

export type BlastParam = {
    // length: 5
    // 0: InkjetBurstPaintRadius
    // 1: InkjetDistanceDamageDistanceRate
    // 2: InkjetSplashAroundVelocityMin
    // 3: InkjetSplashAroundVelocityMax
    // 4: InkjetSplashAroundPaintRadius
    SubSpecialSpecUpList: { Value: SkillParams; }[]
}

type spl__BulletSpMicroLaserBitParam = {
    LaserParam: { LaserFrame : SkillParams; };
}

type spl__WeaponSpMultiMissileLockOnParam = {
    TargetInCircleRadius: SkillParams;
    // 0: TentaMissilesBurstPaintRadius
    SubSpecialSpecUpList: { Value: SkillParams }[];
}

type spl__BulletSpShockSonarParam = {
    WaveParam: {
        MaxFrame: SkillParams;
        MaxRadius: SkillParams;
    }
}

type BulletBlastParam = {
    // 0: ReefsliderDistanceDamageDistanceRate
    // 1: ReefsliderPaintRadius
    // 2: ReefsliderSplashAroundVelocityMin
    // 3: ReefsliderSplashAroundVelocityMax
    // 4: ReefsliderSplashAroundPaintRadius
    SubSpecialSpecUpList: {Value: SkillParams;}[];
}

type spl__WeaponSpUltraShotParam = {
    SpecialDurationFrame: SkillParams;
}

type spl__WeaponSpUltraStampParam = {
    SpecialTotalFrame: SkillParams;
}