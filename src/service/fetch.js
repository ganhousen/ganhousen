import store from "../store/index.js";
import bridge from '../../public/static/JsBridge.js';
export default async (type = 'GET', url = '', data = {}, Cookie = false) => {
    if (process.env.NODE_ENV == 'development') {
        type = type.toUpperCase();
        return new Promise(function(resolve, reject) {

            let requestObj;

            if (window.XMLHttpRequest) {


                requestObj = new XMLHttpRequest();

            } else {

                requestObj = new ActiveXObject;

            }

            let sendData = '';

            if (type == 'POST') {

                sendData = data;

            } else if (type == 'GET') {


                let dataStr = ''; //数据拼接字符串

                Object.keys(data).forEach(key => {

                    dataStr += key + '=' + data[key] + '&';

                })

                if (dataStr !== '') {

                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                    //参数拼接
                    url = url + '?' + dataStr;
                }
            }

            requestObj.open(type, url, true);

            if (true) {

                requestObj.withCredentials = true;

            }

            if (type == 'POST') {

                requestObj.setRequestHeader("Content-type", "application/json;charset=utf-8");
                requestObj.send(sendData);

            } else {
                requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                requestObj.send(null);
            }

            requestObj.onreadystatechange = () => {
                if (requestObj.readyState == 4) {
                    if (requestObj.status == 200) {
                        let obj = requestObj.response;
                        if (typeof obj !== 'object') {
                            obj = eval('(' + obj + ')');
                        }
                        return resolve(obj)
                    } else {
                        return reject(url + "  接口请求出错");
                    }
                }
            }
        })
    } else {
        //------------判断 data 参数类型-------------
        if (typeof data == 'string') {
            var useParams = eval('(' + data + ')');
        } else {
            var useParams = data;
        }
        //------------判断使用content-type------------
        if (type == 'POST') {
            var useHeaders = {
                "Content-Type": "application/json;charset=utf-8",
            };
        } else if (type == "GET") {
            var useHeaders = {
                "Content-Type": "application/x-www-form-urlencoded",
            };
        }
        //------------微服务请求参数对象------------
        var params = {};
        params = {
            requestSource: 'internetRequest',
            url: `${url}`,
            params: useParams,
            type: type,
            headers: useHeaders,
        }
        params = JSON.stringify(params);
        // console.log('------------------请求参数--------------------');
        // console.log(params);
        return new Promise((resolve, reject) => {
            bridge.callHandler('nativeRequest_fk', params, (res) => {
                // console.log('--------------------------------------');
                // console.log(url);
                // console.log('接口结果：');
                // console.log(res);
                // console.log('--------------------------------------');
                let obj = res;
                if (typeof obj !== 'object') {
                    obj = eval('(' + obj + ')');
                }
                if (res != undefined) {
                    return resolve(obj);
                } else {
                    return reject(obj);
                }
            })
        });
    }
}