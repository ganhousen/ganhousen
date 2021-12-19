//将一维数组转化为二维数组
var oneArrToTwo = function(list){
    let len = list.length;
    let n = 5;
    let lineNum = len % 5 == 0? len /5 : Math.floor((len /5) + 1);
    let res = [];
    for(let i = 0;i < lineNum;i++){
        let temp = list.slice(i*n,i*n+n);
        res.push(JSON.parse(JSON.stringify(temp)));
    }
    return res;
}
//数组对象添加 参数和值
function ArrayAddData(array,params){
    array.forEach((item,index) => {
        Object.assign(item,params)
    });
    return array;
};
//停止滚动
function stopScroll(){
    var mo = function(e){e.preventDefault();};
    document.body.style.overflow = 'hidden';
    document.addEventListener('touchmove',mo,false);
}
//数组去重
function ArrayReduce(array){
    var obj = {};
    var redArray = array.reduce((cur,next) => {
        obj[next.key] ? "" : obj[next.key] = true && cur.push(next);
        return cur;
    },[]);
    return redArray;
}
//单纯数组去重
function ArrayUniq(arr){
    var temp = [];
    for(var i = 0;i < arr.length ;i++){
        if(temp.indexOf(arr[i]) == -1){
            temp.push(arr[i]);
        }
    }
    return temp;
}
//hash判断数组是否有重复元素
function isRepeat(arr){
    var hash = {};
    for(var i in arr){
        if(hash[arr[i]]){
            return true;
        }
        hash[arr[i]] = true;
    }
    return false;
}
//获取COOKIE
function getCookie(name){
    var arr = '';
    var reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr = document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
//树形结构转化
function treeDataTranslate(data,id = 'id',pid = 'parent_id'){
    var res = [];
    var temp = {};
    for(var i = 0; i < data.length;i++){
        temp[data[i][id]] = data[i];
    }
    for(var k = 0;k < data.length;k++){
        if(temp[data[k][pid]] && data[k][id] !== data[k][pid]){
            if(!temp[data[k][pid]]['children']){
                temp[data[k][pid]]['children'] = [];
            }
            if(!temp[data[k][pid]]['_level']){
                temp[data[k][pid]]['_level'] = 1;
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1;
            temp[data[k][pid]]['children'].push(data[k]);
        }else{
            res.push(data[k]);
        }
    }
    return res;
}
export{
    oneArrToTwo,
    ArrayAddData,
    stopScroll,
    ArrayReduce,
    treeDataTranslate,
    getCookie,
    ArrayUniq,
    isRepeat
}