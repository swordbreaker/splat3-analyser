import { type Component } from 'vue';
import { getSwimSpeedData, type PlotData } from './calculate';
import type { Splat3Weapon } from './weapons';

declare type Lazy<T> = () => Promise<T>;
declare type DataFunc = (weapon: Splat3Weapon) => Promise<PlotData>;

export type AbilityComponent = {
    name: string,
    component: Lazy<Component>,
    getDataFunct: DataFunc,
}

export const abilityComponents: AbilityComponent[] = [
    {
        name: "Swimspeed",
        component: () => import("@/components/abilities/SwimSpeed.vue"),
        getDataFunct: weapon => getSwimSpeedData(weapon),
    }
]