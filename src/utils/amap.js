//高德开放平台 Web端(JS API) key  https://console.amap.com/dev/key/app
const DEFAULT_KEY = 'e41e19bc267e8f8e359021d';

//引入全局方法
import $vant from "./vant.ts";

/**高德地图加载
 *
 * @param key        高德开放平台 Web端(JS API) key,不设置使用默认
 * @param success   成功回调
 * @param error
 * @constructor
 */
export default function MapLoader(
    {
        key = DEFAULT_KEY,
        success = function () {

        },
        error = function () {

        }
    }
) {
    if (window.AMap) {
        success(window.AMap);
        return;
    }
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=_amapInitMap`;
    //如果加载失败
    script.onerror = function (e) {
        $vant.errorMsg('高德地图加载失败，请重试');
        console.warn('高德地图加载失败，error:', e);
        error(e);
    };
    document.head.appendChild(script);
    window._amapInitMap = () => {
        success(window.AMap);
    }
}