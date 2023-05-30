import type { EffectAndTitleData } from "@/models/baseAbilities";
import { EffectData, PlotData, getAbilityVals } from "../calculate";
import { framesToSeconds } from "../util";

const RESPAWN_CHASE_FRAME = 150;
const OWN_RESPAWN_PUNISHER_EXTRA_RESPAWN_FRAMES = 68;
const ENEMY_RESPAWN_PUNISHER_EXTRA_RESPAWN_FRAMES = 45;
const SPLATOON_3_FASTER_RESPAWN = 60;

function CalcQrApAfterRespawnPunish(ap: number, hasTacticooler: boolean) {
    return hasTacticooler ? ap : Math.ceil(ap * 0.15);
}

function calculateQR(
    ap: number,
    killData: EffectData,
    yourData: EffectData,
    killedByRp = false,
    hasTacticooler = false,
    hasRp = false,
) {
    ap = killedByRp ? CalcQrApAfterRespawnPunish(ap, hasTacticooler) : ap;
    const killCamFrames = killData.getEffect(ap);
    const yourCamFrames = yourData.getEffect(ap);
    let respawnFrames = RESPAWN_CHASE_FRAME + killCamFrames + yourCamFrames - SPLATOON_3_FASTER_RESPAWN;

    if (killedByRp) {
        respawnFrames += ENEMY_RESPAWN_PUNISHER_EXTRA_RESPAWN_FRAMES;
    }

    if (hasRp) {
        respawnFrames += OWN_RESPAWN_PUNISHER_EXTRA_RESPAWN_FRAMES;
    }

    return framesToSeconds(respawnFrames);
}

export class QuickRespawnSecondsData extends PlotData {
    constructor(killData: EffectData, yourData: EffectData, killedByRp = false, hasTacticooler = false, hasRp = false) {
        super((ap) => calculateQR(ap, killData, yourData, killedByRp, hasTacticooler, hasRp));
    }
}

export async function getQuickRespawnKillCameraData() {
    return new EffectData(await getAbilityVals("Dying_ChaseFrm"));
}

export async function getQuickRespawnYourCameraData() {
    return new EffectData(await getAbilityVals("Dying_AroundFrm"));
}

export async function getQuickRespawnSecondsData(killData: EffectData, yourData: EffectData, killedByRp = false, hasTacticooler = false, hasRp = false) : Promise<EffectAndTitleData> {
    return {
        title: "respawn time in seconds ",
        data: new QuickRespawnSecondsData(killData, yourData, killedByRp, hasTacticooler, hasRp),
    }
}