import { loadJson, baseUrl } from "./util";
import { loadLocalization, type Localizator } from "./localization";
import { loadSubWeaponInfo } from "./subs";
import { useVersion } from "@/stores/versionStore";
import type { WeaponInfoMain, WeaponInfoSub, WeaponParams } from "@/models/weapon";

const versionStore = useVersion();

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
        try {
            this.mainWeaponName = localization.localize("CommonMsg/Weapon/WeaponName_Main", this.mainInfo.__RowId);
            this.subWeaponName = localization.localize("CommonMsg/Weapon/WeaponName_Sub", this.SubWeaponId);
            this.specialWeaponName = localization.localize("CommonMsg/Weapon/WeaponName_Special", this.SpecialWeaponId);
        }
        catch (e: any) {
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

function loadWeaponParams(weaponName: string, version: string) {
    return loadJson<WeaponParams>(
        `${baseUrl}splat3/data/parameter/${version}/weapon/${weaponName}.game__GameParameterTable.json`,
    );
}

function getWeaponMainInfos(version: string) {
    return loadJson<WeaponInfoMain[]>(`${baseUrl}splat3/data/mush/${version}/WeaponInfoMain.json`);
}

export function getWeaponSubInfos() {
    return loadJson<WeaponInfoSub[]>(`${baseUrl}splat3/data/mush/${versionStore.version}/WeaponInfoSub.json`);
}

async function getWeaponParams(info: WeaponInfoMain, version: string) {
    const paramId = info.SpecActor.replace("Work/Actor/", "").replace(".engine__actor__ActorParam.gyml", "");
    return await loadWeaponParams(paramId, version);
}

export async function loadWeapons() {
    const infos = await getWeaponMainInfos(versionStore.version);
    const localization = await loadLocalization();
    const weapons = infos
        .filter((x) => x.Type == "Versus" && x.__RowId != "Shelter_Wide_01")
        .map(async (info) => {
            const params = await getWeaponParams(info, versionStore.version);
            return new Splat3Weapon(info, params, localization);
        });

    return Promise.all(weapons);
}

export async function getWeapon(rowId: string,) {
    const version = versionStore.version;
    const localization = await loadLocalization();
    let info = undefined as WeaponInfoMain | undefined;
    try {
        const infos = await getWeaponMainInfos(version);
        info = infos.find((x) => x.__RowId == rowId);
    }
    catch (error: any) {
        console.error(error);
    }
    if (info == null) {
        throw new Error(`Weapon ${rowId} not found`);
    }
    const params = await getWeaponParams(info, version);
    return new Splat3Weapon(info, params, localization);
}

async function loadSpecialParams(version: string, subName: string) {
    return loadJson<WeaponParams>(`${baseUrl}splat3/data/parameter/${version}/weapon/Weapon${subName.replace("_", "")}.game__GameParameterTable.json`);
}

export function loadSpecialWeaponInfo(specialName: string) {
    return loadSpecialParams(versionStore.version, specialName);
}