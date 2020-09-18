<template>
    <van-nav-bar title="高德地图"
                 left-text="返回" left-arrow
                 @click-left="navLeftClick"/>
    <!--高德map地图-->
    <div id="map" style="width: 100%;height: 300px;"></div>
    <!--导航-->
    <van-button icon="share-o" type="primary"
                @click="navigation.show = true">导航
    </van-button>
    <!--导航面板-->
    <van-action-sheet description="请选择导航app" cancel-text="取消"
                      v-model:show="navigation.show"
                      :actions="navigation.options"
                      @select="navigation.select"/>
</template>

<script>
    //引入router
    import {useRouter} from 'vue-router';
    //引入高德地图工具类
    import MapLoader from "@/utils/amap.js";
    import {onMounted, ref, reactive} from 'vue';
    import {ActionSheet} from 'vant';

    export default {
        name: "Amap",
        components: {
            [ActionSheet.name]: ActionSheet,
        },
        setup() {
            const $router = useRouter();
            const navLeftClick = () => {
                $router.go(-1);
            }
            onMounted(() => {
                MapLoader({
                    success(AMap) {
                        //创建地图
                        let map = new AMap.Map('map', {
                            //级别
                            zoom: 11,
                            //中心点坐标
                            center: [117, 39],
                            //使用3D视图
                            viewMode: '3D'
                        });
                        //创建标记点的位置
                        let marker = new AMap.Marker({
                            //位置
                            position: [117, 39],
                            //点标记的动画效果，默认值：
                            //  “AMAP_ANIMATION_NONE”
                            //可选值：
                            //   “AMAP_ANIMATION_NONE”，无动画效果
                            //“AMAP_ANIMATION_DROP”，点标掉落效果
                            //“AMAP_ANIMATION_BOUNCE”，点标弹跳效果
                            animation: 'AMAP_ANIMATION_DROP'
                        });
                        //添加到地图
                        map.add(marker);
                        //工具条，控制地图的缩放、平移等
                        AMap.plugin('AMap.ToolBar', function () {
                            let toolbar = new AMap.ToolBar();
                            map.addControl(toolbar);
                        });
                    }
                });
            });
            //导航
            const navigation = reactive({
                show: false,
                options: [
                    {
                        name: '高德地图',
                        url: 'https://uri.amap.com/marker'
                    },
                    {
                        name: '百度地图',
                        url: 'https://api.map.baidu.com/marker'
                    },
                ],
                select: (item) => {
                    let {name, url} = item;
                    switch (name) {
                        case '高德地图': {
                            url += `?position=${117},${39}`;
                        }
                            break;
                        case '百度地图': {
                            url += `?location=${39},${117}&output=html&src=webapp.baidu.openAPIdemo`;
                        }
                            break;
                        default: {
                            return;
                        }
                    }
                    window.open(url);
                }
            });
            return {
                navLeftClick,
                navigation
            }
        }
    }
</script>