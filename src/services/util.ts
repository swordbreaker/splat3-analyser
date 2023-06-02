import type { SkillName } from "@/models/skillImages";

export async function loadJson<T>(path: string) {
    return await fetch(path)
        .then((response) => response.json() as T);
}

export function framesToSeconds(frames: number) {
    return frames / 60;
}

export function getAbilityImage(name: SkillName) {
    return `${baseUrl}splat3/images/skill/${name}`;
}

export const baseUrl = process.env.NODE_ENV == 'production' ? '/splat3-analyser/' : '/';