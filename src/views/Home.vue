<template>
    <van-nav-bar title="首页"/>
    <van-cell title="导航页" to="/other/nav" is-link/>
    <van-empty description="演示"/>
    <wei-tabbar activeTab="home"></wei-tabbar>
</template>

<script>
    import {Empty} from 'vant';
    import {ref, defineAsyncComponent} from 'vue';

    export default {
        name: "Home",
        components: {
            [Empty.name]: Empty,
            'wei-tabbar': defineAsyncComponent(() => import('@/components/tabbar/Index.vue'))
        },
        setup() {
            //默认选中的tab
            const activeTab = ref(0);
            return {
                activeTab
            }
        }
    }
</script>