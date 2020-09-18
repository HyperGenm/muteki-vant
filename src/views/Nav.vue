<template>
    <van-nav-bar title="导航"/>
    <van-cell v-for="(nav,index) in navList" :key="index"
              is-link
              :title="nav.title" :value="nav.value"
              @click="navClick(nav)"/>
</template>

<script>
    import {ref, reactive} from 'vue';
    //引入router
    import {useRouter} from 'vue-router';

    export default {
        name: "Nav",
        setup() {
            //Vue2 this.$router
            const $router = useRouter();
            //路由列表
            const navList = reactive([
                {title: '首页', path: '/'},
                {title: '登录', path: '/login'},
                {title: 'demo', path: '/demo'},
                {title: '高德地图', path: '/other/amap'},
            ]);
            //路由跳转
            const navClick = (nav) => {
                $router.push(nav['path']);
            };
            return {
                navList,
                navClick
            };
        }
    }
</script>