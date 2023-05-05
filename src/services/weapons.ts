import { loadJson } from "./util";
import { loadLocalization, type Localizator } from "./localization";

export type WeaponInfoMain = {
    Type: "Versus" | "Coop" | "Mission" | "Rival",
    Id: number,
    IsCoopRare: boolean,
    __RowId: string,
}

export class Splat3Weapon{
    mainInfo: WeaponInfoMain;
    imgPath: string;
    mainWeaponName: string;

    constructor(info: WeaponInfoMain, localization: Localizator){
        this.mainInfo = info;
        this.imgPath = `./splat3/images/weapon/Wst_${this.mainInfo.__RowId}.png`;
        this.mainWeaponName = localization.localize('CommonMsg/Weapon/WeaponName_Main', this.mainInfo.__RowId);
    }
}

export type WeaponParamsGameParameters = {
    // TODO
}

export type WeaponParams = {
    GameParameters: WeaponParamsGameParameters,
}

function getWeaponParams(weaponName: string, version: string) {
    return loadJson<WeaponParams>(`./splat3/data/parameter/${version}/weapon/${weaponName}.game__GameParameterTable.json`);
}

function getWeaponMainInfos(version: string) {
    return loadJson<WeaponInfoMain[]>(`./splat3/data/mush/${version}/WeaponInfoMain.json`);
}

export async function loadWeapons(version: string = "310"){
    const infos = await getWeaponMainInfos(version);
    const localization = await loadLocalization();
    return infos.map(info => new Splat3Weapon(info, localization));
}