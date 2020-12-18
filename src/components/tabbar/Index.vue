<template>
    <van-tabbar v-model="activeTab">
        <template v-for="(item,index) in tabbar.list" :key="item.name">
            <van-tabbar-item :name="item.name"
                             :to="`/${item.name}`"
                             :icon="item.icon">{{item.title}}
            </van-tabbar-item>
        </template>
    </van-tabbar>
</template>

<script>
    import {Tabbar, TabbarItem} from 'vant';
    import {ref, reactive, defineAsyncComponent} from 'vue';

    export default {
        name: "WeiTabbar",
        components: {
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        props: {
            activeTab: {
                type: String
            }
        },
        setup() {
            let tabbar = reactive({
                list: [
                    {title: '首页', icon: 'home-o', name: 'home'},
                    {title: '我的', icon: 'search', name: 'me'},
                ]
            });
            return {
                tabbar
            }
        }
    }
</script>