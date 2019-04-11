import fetch from 'common/fetch'
import fetch_paginate from 'common/fetch_paginate'
import {block_info} from 'common/port_uri'

//
export function get_block_height_data() {
    return fetch({
        url: block_info.get_block_latest,
    })
}

export function get_block_data() {
    return fetch({
        url: block_info.get_block_data,
    })
}

export function get_block_info_data(block_id) {
    return fetch({
        url: block_info.get_block_info_data + block_id,
    })
}

export function get_block_paginate_data(url) {
    return fetch_paginate({
        url: url,
    })
}

export function get_block_transaction_info_data(block_id) {
    return fetch({
        url: block_info.get_block_transaction_info_data + block_id,
    })
}

export function get_block_transaction_paginate_data(url) {
    return fetch_paginate({
        url: url,
    })
}

