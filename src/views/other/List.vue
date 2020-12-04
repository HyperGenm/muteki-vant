<template>
    <van-nav-bar title="分页列表(内置上拉、下拉)"
                 left-text="返回" left-arrow
                 @clickLeft="navLeftClick"/>
    <van-tabs v-model:active="tab.active"
              @change="tab.change">
        <van-tab v-for="item in tab.list" :key="tab.name"
                 :title="item.title" :name="item.name"></van-tab>
    </van-tabs>
    <wei-page-list @myRef="pageList.ref"
                   :url="pageList.url"
                   :data="pageList.data"
                   @change="pageList.change">
        <!--一定要设置无数据的时候,占位用的dom,否则可能出错-->
        <template v-if="null == pageList.list || 0 >= pageList.list.length">
            <van-empty image="search" description="无数据"/>
        </template>
        <template v-else>
            <template v-for="item in pageList.list" :key="item.id">
                <van-cell v-model:title="item.methodName"
                          v-model:value="item.id"
                          v-model:label="item.content"/>
            </template>
        </template>
    </wei-page-list>
    <wei-back-top></wei-back-top>
</template>

<script>
    import {ref, reactive, defineAsyncComponent} from 'vue';
    import {Tabs, Tab, Empty} from 'vant';
    //引入router
    import {useRouter} from 'vue-router';

    export default {
        name: "List",
        components: {
            [Tabs.name]: Tabs,
            [Tab.name]: Tab,
            [Empty.name]: Empty,
            'wei-page-list': defineAsyncComponent(() => import('@/components/list/PageList.vue')),
            'wei-back-top': defineAsyncComponent(() => import('@/components/backTop/Index.vue')),
        },
        setup() {
            //tab
            let tab = reactive({
                //活跃的选项
                active: '',
                //列表
                list: [
                    {title: '开发环境', name: 'dev'},
                    {title: '测试环境', name: 'test'},
                    {title: '生产环境', name: 'prod'},
                ],
                //改变时出发的事件
                change: (name) => {
                    pageList.data['name'] = name;
                    if (null == $pageListRef
                        || null == $pageListRef.resetDataRequest) {
                        return;
                    }
                    //调用子组件,重新请求数据
                    $pageListRef.resetDataRequest();
                }
            });
            //类似于vue2  $refs['ref']
            let $pageListRef = null;
            //pageList
            const pageList = reactive({
                ref: (ref) => {
                    $pageListRef = ref;
                },
                url: '/test/getPageList',
                //请求参数
                data: {
                    name: tab['list'][0]['name']
                },
                //显示的list
                list: [],
                //子组件改变时触发
                change: (data) => {
                    pageList.list = data;
                }
            });
            //返回上级页面
            const $router = useRouter();
            const navLeftClick = () => {
                $router.go(-1);
            }
            return {
                tab,
                pageList,
                navLeftClick
            }
        }
    }
</script>