import axios from 'axios'
import {message} from 'antd'


// 设置全局请求
axios.defaults.baseURL = 'http://localhost:3000/api';

function ajax (url, method = 'GET', params = {}) {
    return new Promise((resolve, reject) => {
        if (method === 'GET') {
            axios.get(url, {
                params
            })
                .then(({data}) => {
                    resolve(data)
                })
                .catch(e => {
                    // 全局处理异常
                    message.error(e.message)
                })
        } else if (method === 'POST') {
            axios.post(url, params)
                .then(({data}) => {
                    resolve(data)
                })
                .catch(e => {
                    // 全局处理异常
                    message.error(e.message)
                })
        }
    })
}

// GET请求
export const GET = (url, params) => ajax(url,  'GET', params)

// POST请求
export const POST = (url, params) => ajax(url,  'POST', params)
