import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/about",
        name: "City",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "City" */ "../components/City.vue")
    }
];

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(),
    routes,
});

export default router;
