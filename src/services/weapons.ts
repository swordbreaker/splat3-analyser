import { loadJson, baseUrl } from "./util";
import { loadLocalization, type Localizator } from "./localization";
import { loadSubWeaponInfo } from "./subs";

export class Splat3Weapon {
    mainInfo: WeaponInfoMain;
    mainParams: WeaponParams;
    imgPath: string;
    mainWeaponName: string;
    subWeaponName: string;
    specialWeaponName: string;
    SubWeaponId: string;
    SpecialWeaponId: string;
    WeaponSpeedType: "Fast" | "Normal" | "Slow";
    subImgPath: string;
    specialImgPath: string;
    specialPoints: number;

    constructor(info: WeaponInfoMain, params: WeaponParams, localization: Localizator) {
        this.mainInfo = info;
        this.mainParams = params;
        this.specialPoints = info.SpecialPoint;
        this.WeaponSpeedType = params.GameParameters.MainWeaponSetting?.WeaponSpeedType ?? "Normal";
        this.SubWeaponId = info.SubWeapon.replace("Work/Gyml/", "").replace(".spl__WeaponInfoSub.gyml", "");
        this.SpecialWeaponId = info.SpecialWeapon.replace("Work/Gyml/", "").replace(".spl__WeaponInfoSpecial.gyml", "");
        this.imgPath = `${baseUrl}splat3/images/weapon_flat/Path_Wst_${this.mainInfo.__RowId}.png`;
        this.subImgPath = `${baseUrl}splat3/images/subspe/Wsb_${this.SubWeaponId}00.png`;
        this.specialImgPath = `${baseUrl}splat3/images/subspe/Wsp_${this.SpecialWeaponId}00.png`;
        try{
            this.mainWeaponName = localization.localize("CommonMsg/Weapon/WeaponName_Main", this.mainInfo.__RowId);
            this.subWeaponName = localization.localize("CommonMsg/Weapon/WeaponName_Sub", this.SubWeaponId);
            this.specialWeaponName = localization.localize("CommonMsg/Weapon/WeaponName_Special", this.SpecialWeaponId);
        }
        catch(e: any){
            console.error(e);
            this.mainWeaponName = this.mainInfo.__RowId;
            this.subWeaponName = this.SubWeaponId;
            this.specialWeaponName = this.SpecialWeaponId;
        }
    }

    getSubWeaponInfo() {
        return loadSubWeaponInfo(this.SubWeaponId);
    }

    getSpecialWeaponInfo() {
        return loadSpecialWeaponInfo(this.SpecialWeaponId);
    }
}

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
};

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

type InhaleParam = {
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

type MoveParam = {
    SpawnSpeedZSpecUp: SkillParams;
}

export type SkillParams = { High: number, Low: number, Mid: number}

type BlastParam = {
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

function loadWeaponParams(weaponName: string, version: string) {
    return loadJson<WeaponParams>(
        `${baseUrl}splat3/data/parameter/${version}/weapon/${weaponName}.game__GameParameterTable.json`,
    );
}

function getWeaponMainInfos(version: string) {
    return loadJson<WeaponInfoMain[]>(`${baseUrl}splat3/data/mush/${version}/WeaponInfoMain.json`);
}

async function getWeaponParams(info: WeaponInfoMain, version: string) {
    const paramId = info.SpecActor.replace("Work/Actor/", "").replace(".engine__actor__ActorParam.gyml", "");
    return await loadWeaponParams(paramId, version);
}

export async function loadWeapons(version: string = "310") {
    const infos = await getWeaponMainInfos(version);
    const localization = await loadLocalization();
    const weapons = infos
        .filter((x) => x.Type == "Versus")
        .map(async (info) => {
            const params = await getWeaponParams(info, version);
            return new Splat3Weapon(info, params, localization);
        });

    return Promise.all(weapons);
}

export async function getWeapon(rowId: string, version: string = "310") {
    const infos = await getWeaponMainInfos(version);
    const localization = await loadLocalization();
    const info = infos.find((x) => x.__RowId == rowId);
    if (info == undefined) {
        throw new Error("Weapon not found");
    }
    const params = await getWeaponParams(info, version);
    return new Splat3Weapon(info, params, localization);
}

async function loadSpecialParams(version: string, subName: string) {
    return loadJson<WeaponParams>(`${baseUrl}splat3/data/parameter/${version}/weapon/Weapon${subName.replace("_", "")}.game__GameParameterTable.json`);
}

export function loadSpecialWeaponInfo(specialName: string, version: string = "310") {
    return loadSpecialParams(version, specialName);
}