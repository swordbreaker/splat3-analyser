import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/swimSpeed/:weapon?",
            name: "swimSpeed",
            component: () => import("../views/SwimSpeed.vue"),
            props: true,
        },
        {
            path: "/inkSaverMain/:weapon?",
            name: "inkSaverMain",
            component: () => import("../views/InkSaverMain.vue"),
            props: true,
        },
        {
            path: "/inkSaverSub/:weapon?",
            name: "inkSaverSub",
            component: () => import("../views/InkSaverSub.vue"),
            props: true,
        },
        {
            path: "/inkRecoveryUp/:weapon?",
            name: "inkRecoveryUp",
            component: () => import("../views/InkRecoveryUp.vue"),
            props: true,
        },
        {
            path: "/runSpeed/:weapon?",
            name: "runSpeed",
            component: () => import("../views/RunSpeed.vue"),
            props: true,
        },
        {
            path: "/specialIncreaseUp/:weapon?",
            name: "specialIncreaseUp",
            component: () => import("../views/SpecialIncreaseUp.vue"),
            props: true,
        },
        {
            path: "/specialSave/:weapon?",
            name: "specialSave",
            component: () => import("../views/SpecialSave.vue"),
            props: true,
        },
        {
            path: "/specialSpecUp/:weapon?",
            name: "specialSpecUp",
            component: () => import("../views/SpecialSpecUp.vue"),
            props: true,
        },
    ],
});

export default router;
