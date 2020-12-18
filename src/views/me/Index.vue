<template>
    我的
    <wei-tabbar activeTab="me"></wei-tabbar>
</template>

<script>
    import {defineAsyncComponent} from 'vue';

    export default {
        name: "Index",
        components: {
            'wei-tabbar': defineAsyncComponent(() => import('@/components/tabbar/Index.vue'))
        },
    }
</script>