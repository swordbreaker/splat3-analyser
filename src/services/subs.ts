import type { Localizator } from "./localization";
import { loadJson, baseUrl } from "./util"
import type { BlastParam, DistanceDamage, MoveParam, SkillParams, SubName, WeaponInfoSub } from "@/models/weapon"

export class SplatSub {
    info: WeaponInfoSub;
    imageSrc: string;
    name: string;
    subId: SubName;

    constructor(info: WeaponInfoSub, localization: Localizator){
        this.info = info;
        this.imageSrc = getSubImage(info);
        this.name = localization.localize("CommonMsg/Weapon/WeaponName_Sub", info.__RowId);
        this.subId = getSubName(info.SpecActor);
    }
}

export type SubParams = {
    GameParameters: GameParameters,
}

type GameParameters = {
    SubWeaponSetting : SubWeaponSetting,
    WeaponParam: WeaponParam,
    MoveParam?: MoveParam,
    AreaParam?: AreaParam,
    BlastParam? : BlastParam
    spl__PlayerBeaconSubSpecUpParam?: spl__PlayerBeaconSubSpecUpParam;
    BlastParamMaxCharge: { DistanceDamage: DistanceDamage},
    BlastParamMinCharge: { DistanceDamage: DistanceDamage},
    BlastParamChase: BlastParam,
    BlastParamThrow: BlastParam,
}

type SubWeaponSetting = {
    SubInkSaveLv: number
}

type WeaponParam = {
    InkConsume: number,
    InkRecoverStop: number
}

type AreaParam = {
    Distance: SkillParams,
    MarkingFrameSubSpec: SkillParams,
    SensorRadius: SkillParams
}

type spl__PlayerBeaconSubSpecUpParam = {
    SubSpecUpParam: SkillParams;
}

export class SubInfo {
    subInkSaveLv: number;
    inkConsume: number;
    inkRecoverStop: number;
    params: SubParams;

    constructor(params: SubParams) {
        this.subInkSaveLv = params.GameParameters.SubWeaponSetting.SubInkSaveLv;
        if(params.GameParameters.SubWeaponSetting.SubInkSaveLv == null){
            this.subInkSaveLv = 2;
        }
        this.inkConsume = params.GameParameters.WeaponParam.InkConsume;
        if(this.inkConsume == null){
            this.inkConsume = 0.7;
        }
        this.inkRecoverStop = params.GameParameters.WeaponParam.InkRecoverStop;
        this.params = params;
    }
}

async function loadSubParams(version: string, subName: string) {
    return loadJson<SubParams>(`${baseUrl}splat3/data/parameter/${version}/weapon/Weapon${subName.replace("_", "")}.game__GameParameterTable.json`);
}

export async function loadSubWeaponInfo(subName: string, version: string = "310") {
    const params = await loadSubParams(version, subName);
    return new SubInfo(params);
}

export function getSubImage(subInfo: WeaponInfoSub){
    return `${baseUrl}splat3/images/subspe/Wsb_${subInfo.__RowId}00.png`;
}

function getSubName(path: string): SubName {
    return path.replace("Work/Actor/Weapon", "").replace(".engine__actor__ActorParam.gyml", "") as SubName;
}