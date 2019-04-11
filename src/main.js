//导入Vue框架
import Vue from 'vue'
//导入组件
import router from './router'
//导入请求框架
import api from './api'
//导入主视图文件
import App from './App'

import axios from 'axios'

import lodash from 'lodash'

window._ = lodash;

//使用api
Vue.use(api);

//发布后是否显示提示
Vue.config.productionTip = false;

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development';


window.is_init = false;
Vue.mixin({
    methods: {
        get_latest_block() {
            this.$fetch.api_block_info.get_block_height_data()
                .then(({data}) => {
                    window.latest_block_obj = data.block_obj;
                })
                .catch((e) => {
                    console.log('get data failed');
                })
        },
    },
});


new Vue({
  router,
  ...App
}).$mount('mainbody');
