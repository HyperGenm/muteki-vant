/**引入axios*/
import axios from "axios";
/**引入参数处理*/
import Qs from 'qs';
/**引入vant组件*/
import {Toast} from 'vant';
/*引入全局方法*/
import $function from './function'
//引入封装的vant
import $vant from './vant';
//引入router
import {useRouter} from 'vue-router';

//请求拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        // 对请求错误的处理
        return Promise.reject(error);
    }
);

/**
 *
 * 封装axios请求
 *
 * @param allUrl 请求的url为完整url
 * @param allSuccess 返回所有成功回调,不包含status不是200的出错请求
 * @param url 请求地址
 * @param method 请求方式
 * @param contentType 请求头contentType
 * @param data 请求参数
 * @param timeout 请求超时时间---某些请求需要单独设置超时时间
 * @param timeShowLoadAnimation 多长时间之后显示加载中动画,单位毫秒
 * @param success 成功回调
 * @param fail 失败回调
 * @returns {Promise<any>}
 */
const myAxios = function (
    {
        allUrl = false,
        allSuccess = false,
        url = '',
        method = 'get',
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
        data = {},
        timeout = parseInt(process.env.VUE_APP_AXIOS_TIMEOUT || 20000),
        timeShowLoadAnimation = 555,
        success = function () {
        },
        fail = function () {
        }
    } = {}) {
    /**timeShowLoadAnimation时间之后开启加载中动画*/
    let loading = null;
    let loadingTimer = setTimeout(() => {
        loading = Toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0,
        });
    }, timeShowLoadAnimation);
    let _axios = {
        //请求的url是否为全部url
        url: allUrl ? url : (process.env.VUE_APP_URL + url),
        method,
        headers: {
            'Content-Type': contentType,
            'token': $function.getLocationStorage('token')
        },
        timeout
    };
    /**axios请求参数添加随机字符串*/
    data['__t'] = (new Date()).getTime();
    /**axios请求处理不同请求方式时的参数*/
    //如果是文件
    if (contentType.includes('multipart/form-data')) {
        _axios['data'] = data;
    } else {
        //不是文件
        if ('GET' === method.toUpperCase()) {
            _axios['params'] = data;
        } else {
            _axios['data'] = Qs.stringify(data, {indices: false});
        }
    }
    axios(_axios).then((res) => {
        /**关闭加载中动画*/
        clearTimeout(loadingTimer);
        if (null != loading) {
            loading.clear();
        }
        /***请求的url如果是全部url的话,返回所有res['data']响应***/
        if (allUrl) {
            try {
                success(res['data']);
            } catch (e) {
                console.error(e);
            }
            return;
        }
        /**token过期处理*/
        if (401 === res.data.code) {
            $vant.errorMsg('登陆过期，自动登录中。。。');
            let timer = setTimeout(() => {
                clearTimeout(timer);
                useRouter().replace('login');
            }, 3000);
            return;
        }
        /**返回所有成功回调,不包含status不是401的出错请求*/
        if (allSuccess) {
            try {
                success(res.data);
            } catch (e) {
                console.error(e);
            }
            return;
        }
        /**处理code不为0的出错请求*/
        if (200 !== res.data.code) {
            $vant.errorMsg(res.data.msg);
            consoleWarnTable(`请求出错url:${url}`, res['data']);
            return;
        }
        /**成功回调*/
        try {
            success(res.data.data);
        } catch (e) {
            console.error(e);
        }
    }).catch((error) => {
        /**关闭加载中动画*/
        clearTimeout(loadingTimer);
        if (null != loading) {
            loading.clear();
        }
        // 如果请求被取消则进入该方法
        if (axios.isCancel(error)) {
            try {
                fail(error);
            } catch (e) {
                console.error(e);
            }
            return;
        }
        $vant.alert({
            title: '系统异常',
            message: (
                `message:${error['message']}`
                + `\r\n url:${url}`)
        });
        console.warn(`请求失败url:${url}`, error);
        try {
            fail(error);
        } catch (e) {
            console.error(e);
        }
    });
}

/**
 * 打印
 * @param msg
 * @param object
 */
function consoleWarnTable(msg, object = {}) {
    console.warn(msg);
    try {
        if (object instanceof Object) {
            console.table(object);
        } else {
            console.log(object);
        }
    } catch (e) {
        console.log('此浏览器不支持console.table()', e, '---错误详情:', object);
    }
    console.warn('↑↑以上为错误详情↑↑↑↑↑');
}

/**
 * 对外抛出
 */
export default myAxios;