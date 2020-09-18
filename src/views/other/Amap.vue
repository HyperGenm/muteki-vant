<template>
    <van-nav-bar title="高德地图"
                 left-text="返回" left-arrow
                 @click-left="navLeftClick"/>
    <!--高德map地图-->
    <div id="map" style="width: 100%;height: 300px;"></div>
</template>

<script>
    //引入router
    import {useRouter} from 'vue-router';
    //引入高德地图工具类
    import MapLoader from "@/utils/amap.js";
    import {onMounted} from 'vue';

    export default {
        name: "Amap",
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
            return {
                navLeftClick
            }
        }
    }
</script>