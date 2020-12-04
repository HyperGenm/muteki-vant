import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
/*浏览器上面进度条*/
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
    showSpinner: false, // 是否显示加载ico
});

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/other',
        name: 'other',
        component: () => import('@/views/other/Index.vue'),
        redirect: '/other/nav',
        children: [
            {
                path: 'nav',
                name: 'nav',
                component: () => import('@/views/other/Nav.vue')
            },
            {
                path: 'demo',
                name: 'demo',
                component: () => import('@/views/other/Demo.vue')
            },
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/other/List.vue')
            },
            {
                path: 'amap',
                name: 'amap',
                component: () => import('@/views/other/Amap.vue')
            }
        ]
    },
    /*{
        path: '/:pathMatch(.*)*',
        name: '404',
        redirect: '/'
    },*/
]

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    //浏览器上方显示进度条
    NProgress.start();
    //正常放行
    next();
});

router.afterEach(transition => {
    //关闭浏览器上方的进度条
    NProgress.done();
});

export default router;