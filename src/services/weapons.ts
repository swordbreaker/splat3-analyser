import { loadJson, baseUrl } from "./util";
import { loadLocalization, type Localizator } from "./localization";
import { loadSubWeaponInfo } from "./subs";

export type WeaponInfoMain = {
    Type: "Versus" | "Coop" | "Mission" | "Rival",
    Id: number,
    IsCoopRare: boolean,
    __RowId: string,
    SpecActor: string,
    // "SpecialWeapon": "Work/Gyml/SpBlower.spl__WeaponInfoSpecial.gyml",
    SpecialWeapon: string,
    // "SubWeapon": "Work/Gyml/PoisonMist.spl__WeaponInfoSub.gyml",
    SubWeapon: string,
    SpecialPoint: number,
}

export type WeaponParam = {
    InkConsume: number,
}

export class Splat3Weapon{
    mainInfo: WeaponInfoMain;
    mainParams: WeaponParams;
    imgPath: string;
    mainWeaponName: string;
    SubWeaponId: string;
    SpecialWeaponId: string;
    WeaponSpeedType: 'Fast' | 'Normal' | 'Slow';
    subImgPath: string;
    specialImgPath: string;
    specialPoints: number;

    constructor(info: WeaponInfoMain, params: WeaponParams, localization: Localizator){
        this.mainInfo = info;
        this.mainParams = params;
        this.specialPoints = info.SpecialPoint;
        this.WeaponSpeedType = params.GameParameters.MainWeaponSetting?.WeaponSpeedType ?? 'Normal';
        this.SubWeaponId = info.SubWeapon.replace('Work/Gyml/', '').replace('.spl__WeaponInfoSub.gyml', '');
        this.SpecialWeaponId = info.SpecialWeapon.replace('Work/Gyml/', '').replace('.spl__WeaponInfoSpecial.gyml', '');
        this.imgPath = `/splat3/images/weapon_flat/Path_Wst_${this.mainInfo.__RowId}.png`;
        this.subImgPath = `/splat3/images/subspe/Wsb_${this.SubWeaponId}00.png`;
        this.specialImgPath = `/splat3/images/subspe/Wsp_${this.SpecialWeaponId}00.png`;
        this.mainWeaponName = localization.localize('CommonMsg/Weapon/WeaponName_Main', this.mainInfo.__RowId);
    }

    getSubWeaponInfo() {
        return loadSubWeaponInfo(this.SubWeaponId);
    }
}

export type WeaponSpeedType = 'Fast' | null | 'Slow';

export type MainWeaponSetting = {
    WeaponSpeedType: WeaponSpeedType,
}

export type WeaponParamsGameParameters = {
    MainWeaponSetting: MainWeaponSetting,
    WeaponParam?: WeaponParam,
}

export type WeaponParams = {
    GameParameters: WeaponParamsGameParameters,
}

function loadWeaponParams(weaponName: string, version: string) {
    return loadJson<WeaponParams>(`${baseUrl}splat3/data/parameter/${version}/weapon/${weaponName}.game__GameParameterTable.json`);
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
    const weapons = infos.filter(x => x.Type == 'Versus').map(async info =>{
        const params = await getWeaponParams(info, version);
        return new Splat3Weapon(info, params, localization);
    });

    return Promise.all(weapons);
}

export async function getWeapon(rowId: string, version: string = "310"){
    const infos = await getWeaponMainInfos(version);
    const localization = await loadLocalization();
    const info = infos.find(x => x.__RowId == rowId);
    if(info == undefined){
        throw new Error("Weapon not found");
    }
    const params = await getWeaponParams(info, version);
    return new Splat3Weapon(info, params, localization);
}