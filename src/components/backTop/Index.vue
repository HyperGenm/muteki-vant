<template>
    <!--返回顶部按钮-->
    <div v-show="offset <= scrollTop"
         class="back-top"
         @click="click">
        <van-icon name="back-top" size="27" color="#fff"/>
    </div>
</template>

<script>
    import {Icon} from 'vant';

    import {ref, onMounted, onUnmounted} from 'vue';

    export default {
        name: "WeiBackTop",
        components: {
            [Icon.name]: Icon,
        },
        props: {
            //滚动多少后显示
            offset: {
                type: Number,
                default: 60
            }
        },
        setup() {
            //滚动的距离
            let scrollTop = ref(0);
            //监听点击
            const click = () => {
                let timer = setInterval(() => {
                    let top = window.pageYOffset
                        || document.documentElement.scrollTop
                        || document.body.scrollTop;
                    if (0 >= top) {
                        clearInterval(timer);
                        return;
                    }
                    let scrollTop = top - Math.floor(top / 5);
                    scrollTop = 5 >= scrollTop ? 0 : scrollTop;
                    document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
                }, 20);
            }
            //监听浏览器滚动事件
            const scrollToTop = () => {
                scrollTop.value = window.pageYOffset
                    || document.documentElement.scrollTop
                    || document.body.scrollTop;

            }
            onMounted(() => {
                window.addEventListener('scroll', scrollToTop);
            });
            onUnmounted(() => {
                window.removeEventListener('scroll', scrollToTop);
            });
            return {
                click,
                scrollTop
            }
        }
    }
</script>

<style lang="less" scoped>
    .back-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #1890ff;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
    }
</style>