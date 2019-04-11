import fetch from 'common/fetch'
import {other_info} from 'common/port_uri'

//
export function get_price_amount_data() {
    return fetch({
        url: other_info.get_price_amount,
    })
}

export function get_days_chart_data() {
    return fetch({
        url: other_info.get_days_chart,
    })
}