import fetch from 'common/fetch'
import fetch_paginate from 'common/fetch_paginate'
import {holder_info} from 'common/port_uri/index'

export function get_holder_data() {
    return fetch({
        url: holder_info.get_holder_data,
    })
}

export function get_holder_info_data(tx_id) {
    return fetch({
        url: holder_info.get_holder_info_data + tx_id,

    })
}

export function get_holder_paginate_data(url) {
    return fetch_paginate({
        url: url,
    })
}
