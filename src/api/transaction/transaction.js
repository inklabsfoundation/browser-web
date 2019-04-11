import fetch from 'common/fetch'
import fetch_paginate from 'common/fetch_paginate'
import {transaction_info} from 'common/port_uri/index'

//
export function get_transaction_amount_data() {
    return fetch({
        url: transaction_info.get_transaction_amount,
    })
}

export function get_transaction_data() {
    return fetch({
        url: transaction_info.get_transaction_data,
    })
}

export function get_transaction_info_data(tx_id) {
    return fetch({
        url: transaction_info.get_transaction_info_data + tx_id,

    })
}

export function get_transaction_paginate_data(url) {
    return fetch_paginate({
        url: url,
    })
}
