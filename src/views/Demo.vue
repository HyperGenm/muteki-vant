<template>
    <van-nav-bar title="demo"
                 left-text="返回" left-arrow
                 @click-left="navLeftClick"/>
    <van-cell-group title="vant组件">
        <van-button type="primary" size="small">小型按钮</van-button>
        <van-circle :currentRate="1000" :speed="1000"
                    :color="{'0%': '#3fecff','100%': '#6149f6'}"
                    text="1000%"/>
    </van-cell-group>
    <van-cell-group title="常用方法">
        <van-cell v-for="(item,index) in funList" :key="index"
                  :title="item.title" :value="item.value"
                  @click="item.click()"/>
    </van-cell-group>
</template>

<script>
    import {ref, reactive, onMounted} from 'vue';
    //引入vant组件
    import {Circle, Divider} from 'vant';
    //引入全局方法
    import $function from '@/utils/function.ts';
    //引入vant封装方法
    import $vant from '@/utils/vant.ts';
    //引入封装的axios
    import $axios from '@/utils/axios.js'
    //引入router
    import {useRouter} from 'vue-router';

    export default {
        name: "Demo",
        components: {
            [Circle.name]: Circle,
            [Divider.name]: Divider,
        },
        setup() {
            //常用方法展示列表
            const funList = reactive([
                {
                    title: 'uuid', value: '生成uuid',
                    click: () => {
                        funList[0]['value'] = $function.createUUID();
                    }
                },
                {
                    title: 'alert', value: '',
                    click: () => {
                        $vant.alert({
                            message: 'vant的弹窗组件',
                            confirm() {
                                funList[1]['value'] = 'vant弹窗组件';
                            }
                        });
                    }
                },
                {
                    title: 'confirm', value: '',
                    click: () => {
                        $vant.confirm({
                            message: 'vant的确认框组件',
                            confirm() {
                                funList[2]['value'] = '您点了确认';
                            },
                            cancel() {
                                funList[2]['value'] = '您点了取消';
                            }
                        });
                    }
                },
                {
                    title: 'axios', value: '',
                    click: () => {
                        $axios({
                            url: '/login',
                            method: 'post',
                            success(data) {
                                $vant.alert({
                                    message: JSON.stringify(data)
                                });
                            }
                        });
                    }
                }
            ]);
            //返回上级页面
            const $router = useRouter();
            const navLeftClick = () => {
                $router.go(-1);
            }
            //页面加载执行
            onMounted(() => {
                console.log('hyper muteki');
            });
            return {
                funList,
                navLeftClick
            }
        }
    }
</script>