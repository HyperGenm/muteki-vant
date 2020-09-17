import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

// 这个库会在桌面端自动将mouse事件转换成对应的touch事件，使得组件能够在桌面端使用。
import '@vant/touch-emulator';

//常用的组件全局引入
import {NavBar, Cell, CellGroup, Field, Button} from 'vant';

//创建app挂载到App.vue组件
createApp(App)
    .use(router)
    .use(NavBar).use(Cell).use(CellGroup).use(Field).use(Button)
    .mount('#app');