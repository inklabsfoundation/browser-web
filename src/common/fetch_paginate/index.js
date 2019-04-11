//导入模块
import axios from 'axios'
import {server_base_url} from 'common/config'

export default function fetch(options) {
    const axios_instance = axios.create({
        baseURL: server_base_url,
        url: options.url,
        method: 'get',
        headers: {
            'Proudly-Powered-By': 'Toby && Malrin',
        },
        validateStatus: (status)=>{
            return status >= 200 && status < 300; // default
        },
    });
    axios_instance.interceptors.request.use(function (config) {
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });
    axios_instance.interceptors.response.use(function (response) {
        // Do something with response data
        return response;
    }, function (error) {
        // Do something with response error
        return Promise.reject(error);
    });
    return new Promise((resolve, reject) => {
        axios_instance.request()
            .then((response)=>{
                let data = response.data;
                resolve({data});
            })
            .catch((error) => {
                reject(error);
            });
    });
}
