<template>
    <van-nav-bar title="首页"/>
    <van-cell title="导航页" to="/nav" is-link/>
    <van-empty description="演示"/>
    <van-tabbar v-model="activeTab">
        <van-tabbar-item icon="home-o">标签</van-tabbar-item>
        <van-tabbar-item icon="search">标签</van-tabbar-item>
        <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
        <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    import {Empty, Tabbar, TabbarItem} from 'vant';
    import {ref} from 'vue';

    export default {
        name: "Home",
        components: {
            [Empty.name]: Empty,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
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