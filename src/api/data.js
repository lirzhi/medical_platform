import store from "@/store";
import axios from "axios";
import nprogress from 'nprogress';
import "nprogress/nprogress.css";

// 注：第一个页面里面两个上传文件的部分也有baseUrl，如果要改的话，一起改
// export const baseUrl = '/api'
export const baseUrl = 'http://123.56.13.213:9090'

// post请求
export const postForm = (requestUrl, params, queryParams, This, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;

    // 构建带有查询参数的 URL
    let queryStr = Object.keys(queryParams).map(key => `${key}=${queryParams[key]}`).join('&');
    let fullUrl = baseUrl + requestUrl + (queryStr ? '?' + queryStr : '');

    axios.request({
        url: fullUrl,
        method: 'post',
        data: params,
        headers: {
            Authorization: "Bearer " + TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', fullUrl, res);
        if (res.code === 200) { 
            callback(res) 
        } else {
            This.$message({
                message: res.error,
                type: 'error'
            });
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('postForm 的 error: ', fullUrl, err);
    })
}


// get请求
export const getForm = (requestUrl, This, callback) => {
    nprogress.start();
    console.log('getForm 的表单', requestUrl)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get',
        headers: {
            Authorization: TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('getForm 的 response: ', requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.error,
                type: 'error'
            });
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('getForm 的 error: ', requestUrl, err);
    })
}
// put请求
export const putForm = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('putForm 的表单', requestUrl, params)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'put',
        data: params,
        headers: {
            Authorization: "Bearer "+TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('putForm 的 response: ', requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.error,
                type: 'error'
            });
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('putForm 的 error: ', requestUrl, err);
    })
}
// delete请求
export const deleteRequest = (requestUrl, This, callback) => {
    nprogress.start();
    console.log('deleteRequest 的路径参数', requestUrl)
    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'delete',
        headers: {
            Authorization: "Bearer "+TokenValue
        }
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('deleteRequest 的 response: ', requestUrl, res);
        if (res.code === 200) { 
            callback(res) 
        }
        else {
            This.$message({
                message: res.error,
                type: 'error'
            });
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('deleteRequest 的 error: ', requestUrl, err);
    })
}

// 登录
export const loginRequest = (requestUrl, params, This, callback) => {
    nprogress.start();
    console.log('postForm 的表单', requestUrl, params)
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
    }).then(({ data: res }) => {
        nprogress.done()
        console.log('postForm 的 response: ', requestUrl, res);
        if (res.code === 200) { 
                store.commit('setToken', res.data.accessToken)
                store.commit('setUsername', params.username)
                store.commit('setUserType', 'admin')
                callback({code: 200, msg: '登录成功'})
            callback(res) 
        }
        else {
            This.$message({
                message: res.error,
                type: 'error'
            });
        }
    })
    .catch((err) => {
        nprogress.done()
        console.log('postForm 的 error: ', requestUrl, err);
    })
}