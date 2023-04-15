import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/util/auth'
let cancel = null;

// create an axios instance
const service = axios.create({
    baseURL: '', //正式域名
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 100000 // request timeout
})


// request interceptor
service.interceptors.request.use(
    config => {
        if (getToken('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the
            // actual situation
            config.headers['X-CSRF-TOKEN'] = getToken('token')
        } else {
            Message({
                message: '尚未登录',
                type: 'error',
                duration: 5 * 1000
            })
        }
        //请求防抖
        // config.cancelToken = new axios.CancelToken(function(c) {
        //     // executor 函数接收一个 cancel 函数作为参数
        //     console.log(c)
        //     cancel = c;
        // });
        // if (cancel != null) {
        //     console.log(cancel)
        //     cancel();
        // } else {
        //     cancel = null;
        // }
        // console.log('require', config)
        return config
    },
    error => {
        // cancel = null;
        // do something with request error
        console.log('require_err', error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // cancel = null;
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        // if (res.code !== 200) {
        //     console.log(response)
        //     Message({
        //         message: res.msg || 'Error',
        //         type: 'error',
        //         duration: 5 * 1000
        //     })
        //     // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        //     if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        //         // to re-login
        //         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
        //             confirmButtonText: 'Re-Login',
        //             cancelButtonText: 'Cancel',
        //             type: 'warning'
        //         }).then(() => {
        //             store.dispatch('user/resetToken').then(() => {
        //                 location.reload()
        //             })
        //         })
        //     }
        //     return res
        // } else {
        //     return res
        // }
        return res
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service