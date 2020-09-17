//全局常量

export default {
    //session和location存放数据的前缀，用于和同域名/ip项目区分
    storagePrefix: 'weiziplus',
    //请求的接口地址
    api: {
        //登录
        login: '/api/login',
        //用户部分
        user: {
            //获取用户信息
            getInfo: '/api/user/getInfo'
        }
    }
}