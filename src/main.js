import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.less'

import {
    Button,
    Layout,
    Form,
    Input,
    List,
    Checkbox,
} from 'ant-design-vue'

createApp(App)
    .use(store)
    .use(router)
    .use(Button)
    .use(Layout)
    .use(Form)
    .use(Input)
    .use(List)
    .use(Checkbox)
    .mount('#app')
