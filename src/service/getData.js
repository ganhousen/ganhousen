//引入请求方法
import fetch from './fetch.js';
/**
 * 请求超时的处理
 *
 */
function _fetch(fetch, timeout) {
    return Promise.race([
        fetch,
        new Promise(function(resolve, reject) {
            setTimeout(() => reject(new Error('request timeout')), timeout);
        })
    ]);
}
//设置模式
if (process.env.NODE_ENV == 'development') {

    var ip = "";

} else {

    var ip = "";
    
}
//----------------------------登录部分------------------------
//正式iam登录接口
var TestGet = (data) => fetch('GET', ip + '/xxx', data);
//-----------------------------------------------------------
//各类型项目数量
var TestPost = (data) => fetch('POST', ip + '/xxx', data);

export{
    TestPost,
    TestGet
}