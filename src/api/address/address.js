import fetch from 'common/fetch'
import fetch_paginate from 'common/fetch_paginate'
import {address_info} from 'common/port_uri'

//
export function get_address_amount_data() {
    return fetch({
        url: address_info.get_address_amount,
    })
}

export function get_address_info_data(address_id) {
    return fetch({
        url: address_info.get_address_info_data + address_id,
    })
}


export function get_address_transaction_info_data(address_id) {
    return fetch({
        url: address_info.get_address_transaction_info_data + address_id,
    })
}

export function get_address_transaction_paginate_data(url) {
    return fetch_paginate({
        url: url,
    })
}