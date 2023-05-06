import { loadJson } from "./util";
import { loadLocalization, type Localizator } from "./localization";

export type WeaponInfoMain = {
    Type: "Versus" | "Coop" | "Mission" | "Rival",
    Id: number,
    IsCoopRare: boolean,
    __RowId: string,
    SpecActor: string,
}

export class Splat3Weapon{
    mainInfo: WeaponInfoMain;
    imgPath: string;
    mainWeaponName: string;
    WeaponSpeedType: 'Fast' | 'Normal' | 'Slow';

    constructor(info: WeaponInfoMain, params: WeaponParams, localization: Localizator){
        this.mainInfo = info;
        this.WeaponSpeedType = params.GameParameters.MainWeaponSetting?.WeaponSpeedType ?? 'Normal';
        this.imgPath = `/splat3/images/weapon/Wst_${this.mainInfo.__RowId}.png`;
        this.mainWeaponName = localization.localize('CommonMsg/Weapon/WeaponName_Main', this.mainInfo.__RowId);
    }
}

export type WeaponSpeedType = 'Fast' | null | 'Slow';

export type MainWeaponSetting = {
    WeaponSpeedType: WeaponSpeedType,
}

export type WeaponParamsGameParameters = {
    MainWeaponSetting: MainWeaponSetting,
}

export type WeaponParams = {
    GameParameters: WeaponParamsGameParameters,
}

function loadWeaponParams(weaponName: string, version: string) {
    return loadJson<WeaponParams>(`/splat3/data/parameter/${version}/weapon/${weaponName}.game__GameParameterTable.json`);
}

function getWeaponMainInfos(version: string) {
    return loadJson<WeaponInfoMain[]>(`/splat3/data/mush/${version}/WeaponInfoMain.json`);
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