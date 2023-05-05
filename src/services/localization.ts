
import { loadJson } from "./util";

export const languages = [
    {
        ext: "USen",
        region: "NA",
        language: "en",
        name: "English",
    },
    {
        ext: "EUen",
        region: "EU",
        language: "en",
        name: "English (UK)",
    },
    {
        ext: "EUes",
        region: "EU",
        language: "es",
        name: "Español",
    },
    {
        ext: "USes",
        region: "NA",
        language: "es-MX",
        name: "Español (MX)",
    },
    {
        ext: "EUfr",
        region: "EU",
        language: "fr",
        name: "Français",
    },
    {
        ext: "USfr",
        region: "NA",
        language: "fr-CA",
        name: "Français (CA)",
    },
    {
        ext: "EUde",
        region: "EU",
        language: "de",
        name: "Deutsch",
    },
    {
        ext: "EUnl",
        region: "EU",
        language: "nl",
        name: "Nederlands",
    },
    {
        ext: "EUit",
        region: "EU",
        language: "it",
        name: "Italiano",
    },
    {
        ext: "EUru",
        region: "EU",
        language: "ru",
        name: "Pусский",
    },
    {
        ext: "JPja",
        region: "JP",
        language: "ja",
        name: "日本語",
    },
    {
        ext: "CNzh",
        region: "AP",
        language: "cn",
        name: "中文（简体）",
    },
    {
        ext: "KRko",
        region: "AP",
        language: "kr",
        name: "한국어",
    },
    {
        ext: "TWzh",
        region: "AP",
        language: "tw",
        name: "中文（繁體）",
    },
]

type LocalizationData = { [key: string]: {[key: string]: string} };

export class Localizator{
    data: LocalizationData;

    constructor(data: LocalizationData){
        this.data = data;
    }

    localize(dir: categories, key: string){
        return this.data[dir][key];
    }
}

export type categories =
    'CommonMsg/Weapon/WeaponName_Main' |
    'CommonMsg/Weapon/WeaponName_Special' |
    'CommonMsg/Weapon/WeaponName_Sub' |
    'CommonMsg/Weapon/WeaponParamName' |
    'CommonMsg/Weapon/WeaponTypeName'

export async function loadLocalization(language: string = "EUen"){
    const data = await loadJson<LocalizationData>(`splat3/data/language/${language}.json`);
    return new Localizator(data);
}
// CommonMsg/Weapon/WeaponName_Main

// splat3-analyzer\public\splat3\data\language\EUen_full.json