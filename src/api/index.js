//导入模块
import * as api_block_info from './block/block'
import * as api_transaction_info from './transaction/transaction'
import * as api_holder_info from './holder/holder'
import * as api_address_info from './address/address'
import * as api_other_info from './other/other'

const apiObj = {
    //导出接口
    api_block_info,
    api_transaction_info,
    api_holder_info,
    api_address_info,
    api_other_info
};

const install = function (Vue) {
    if (install.installed) return;
    install.installed = true;

    //定义属性到Vue原型中
    Object.defineProperties(Vue.prototype, {
        $fetch: {
            get() {
                return apiObj
            }
        }
    })
};

export default {
    install
}
