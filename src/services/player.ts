import { baseUrl, loadJson } from "./util";
import type { PlayerParameters } from "@/models/player";

export async function loadPlayerData(version: string = "310"): Promise<PlayerParameters> {
    const data = await loadJson<PlayerParameters>(
        `${baseUrl}splat3/data/parameter/310/misc/SplPlayer.game__GameParameterTable.json`,
    );
    return data;
}
