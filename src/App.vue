<template>
    <div id="nav">
        <router-view/>
    </div>
</template>

<style lang="less">
    body {
        background-color: #f5f5f5;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    //导航栏
    .van-nav-bar{
        border-bottom: 1px solid #f5f5f5;
    }

    img {
        width: 100%;
    }
</style>