import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'

import { Button } from 'ant-design-vue'

createApp(App).use(store).use(router).use(Button).mount('#app')
