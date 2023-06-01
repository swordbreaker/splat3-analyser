import { useVersion } from "@/stores/versionStore";
import { baseUrl, loadJson } from "./util";

export async function getVersions() : Promise<string[]>{
    return loadJson<string[]>(`${baseUrl}splat3/versions.json`);
}

export function onVersionChanged(callback: (version: string) => void){
    const versionStore = useVersion();
    versionStore.$subscribe((mutation, state) => {
        callback(state.version);
    });
}