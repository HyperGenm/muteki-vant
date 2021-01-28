<template>
    <van-tabbar v-model="activeTab">
        <template v-for="item in tabbar.list" :key="item.name">
            <template v-if="!item.slot">
                <van-tabbar-item :name="item.name"
                                 :to="`/${item.name}`"
                                 :icon="item.icon">{{item.title}}
                </van-tabbar-item>
            </template>
            <template v-else>
                <van-tabbar-item :name="item.name"
                                 :to="`/${item.name}`">
                    <span>{{item.title}}</span>
                    <template #icon="props">
                        <img :src="activeTab === item.name ? item.activeImg : item.unActiveImg"/>
                    </template>
                </van-tabbar-item>
            </template>
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
                type: String,
                default: 'home'
            }
        },
        setup() {
            let tabbar = reactive({
                list: [
                    {title: '首页', icon: 'home-o', name: 'home'},
                    {
                        title: '自定义', slot: true, name: 'customize',
                        //网络图片
                        activeImg: 'https://img.yzcdn.cn/vant/user-active.png',
                        //本项目图片
                        unActiveImg: require('@/assets/logo.png'),
                    },
                    {title: '我的', icon: 'search', name: 'me'},
                ]
            });
            return {
                tabbar
            }
        }
    }
</script>

<style lang="less" scoped>
    .van-tabbar {
        .van-tabbar-item {
            .van-tabbar-item__icon {
                img {
                    width: 30px;
                }
            }
        }
    }
</style>