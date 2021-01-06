# muteki-vant
* 使用vue3.0.0和vant3.0.0搭建的手机端基本项目,封装了常用的方法，ajax请求等
* 使用按需加载的方式，加快页面访问速度。打包后最大文件 `chunk-vendors.js` *140KB* ,使用 *gzip* 压缩后 *50KB*

* [在线演示地址](http://82.156.70.219/muteki-vant)  

* 目录结构
    * assets: 存放静态文件
    * components: 存放共用组件
        * backTop: 返回顶部组件
            * props: 
                * offset 类型*Number* 滚动多少后显示
        * list: 列表展示(内置上拉加载、下拉刷新)
            * tips: 可参考 `src/views/other/List.vue`
            * props:
                * url: 请求地址，默认不用填写基本域名
                * data: 请求参数
                * 更多参数请看 `src/components/list/PageList.vue`
            * emit:
                * myRef: 返回当前 *ref* 实例，用于调用内置方法
                * change: 数据改变时触发, 内置 *data* 参数，类型为数组
        * tabbar: 底部选项
            * 使用时，需手动指定 `src/components/tabbat/Index.vue` 内部 *list* 的值
            * props:
                * activeTab: 引用组件对应的*name*
    * router: 用于配置路由
    * utils: 常用方法
        * amap: 高德地图 
            * tips: 可参考 `src/views/other/Amap.vue`
            * MapLoader:方法,获取AMap
                ```javascript
                      MapLoader({
                          success(AMap) {
                              console.log(AMap);
                          }
                      });
                ``` 
        * axios: 封装的axios
            * tips: code不是200的请求，已经内部处理，*success* 不需要进行额外的判断
            * allUrl: 如果设置`true`，请求必须填写全路径
            * allSuccess: 如果设置`true`,code不是200的请求也会进入 *success* 回调
            * 示例:
                ```javascript
                      $axios({
                          //请求地址，默认不用填写基本域名
                          url: '/login',
                          //如果method是get,可忽略不写
                          method: 'post',
                          //返回值只包含 code为200 的返回，并且只返回内部的 data
                          success(data) {
                              console.log(data);
                          }
                      });
                ```
        * function: 常用的方法
        * global: 全局常量
        * vant: 封装的部分vant
            * errorMsg: 错误提示信息
                * 示例: `$vant.errorMsg('error');`
                * 第二个参数为提示时间,不写默认 *3秒*
            * successMsg: 成功提示信息
            * alert: 弹窗
                * tips: 可参考 `src/utils/vant.ts`
                * 示例:
                    ```javascript
                      $vant.alert({
                          title: '提示的标题，默认不写为 提示',
                          message: '提示的信息',
                          //点击确认按钮后触发
                          confirm() {
                              console.log('您点击了确认');
                          }
                      });
                    ```
            * confirm: 弹窗
                * tips: 可参考 `src/utils/vant.ts`
                * 示例:
                    ```javascript
                      $vant.confirm({
                          title: '提示的标题，默认不写为 提示',
                          message: '提示的信息',
                          //点击确认后触发
                          confirm() {
                              console.log('您点了确认');
                          },
                          //点击取消后触发,可不处理
                          cancel() {
                              console.log('您点了取消');
                          }
                      });
                    ```
    * 附录:
        * .env.development/production
            * VUE_APP_URL: 用于指定ajax的请求前缀