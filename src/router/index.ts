import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
import addressSelect from "../views/addressSelect.vue";
import mapOrder from "../views/mapOrder.vue";
import orderDetail from "../views/orderDetail.vue";
import cityList from "../views/cityList.vue";
import orderSuccess from "../views/orderSuccess.vue";
import home from "../views/home.vue";
import person from "../views/person.vue";
import login from "../views/login.vue";
import schedule from "../views/schedule.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "login",
        component: login,
    },
    {
        path: "/HelloWorld",
        name: "HelloWorld",
        component: HelloWorld,
    },
    {
        path: "/home",
        name: "home",
        component: home,
    },
    {
        path: "/schedule",
        name: "schedule",
        component: schedule,
    },
    {
        path: "/addressSelect",
        name: "addressSelect",
        component: addressSelect,
    },
    {
        path: "/mapOrder",
        name: "mapOrder",
        component: mapOrder,
    },
    {
        path: "/orderDetail",
        name: "orderDetail",
        component: orderDetail,
    },
    {
        path: "/orderSuccess",
        name: "orderSuccess",
        component: orderSuccess,
    },
    {
        path: "/person",
        name: "person",
        component: person,
    },
    {
        path: "/cityList",
        name: "cityList",
        component: cityList,
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
