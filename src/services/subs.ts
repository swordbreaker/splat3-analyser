import { loadJson, baseUrl } from "./util"

type SubParams = {
    GameParameters: GameParameters,
}

type GameParameters ={
    SubWeaponSetting : SubWeaponSetting,
    WeaponParam: WeaponParam,
}

type SubWeaponSetting = {
    SubInkSaveLv: number
}

type WeaponParam = {
    InkConsume: number,
    InkRecoverStop: number
}

export class SubInfo{
    SubInkSaveLv: number;
    InkConsume: number;
    InkRecoverStop: number

    constructor(params: SubParams) {
        this.SubInkSaveLv = params.GameParameters.SubWeaponSetting.SubInkSaveLv;
        if(params.GameParameters.SubWeaponSetting.SubInkSaveLv == null){
            this.SubInkSaveLv = 2;
        }
        this.InkConsume = params.GameParameters.WeaponParam.InkConsume;
        if(this.InkConsume == null){
            this.InkConsume = 0.7;
        }
        this.InkRecoverStop = params.GameParameters.WeaponParam.InkRecoverStop;
    }
}

async function loadSubParams(version: string, subName: string) {
    return loadJson<SubParams>(`${baseUrl}splat3/data/parameter/${version}/weapon/Weapon${subName.replace("_", "")}.game__GameParameterTable.json`);
}

export async function loadSubWeaponInfo(subName: string, version: string = "310") {
    const params = await loadSubParams(version, subName);
    return new SubInfo(params);
}