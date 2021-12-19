//*******************************日期方法******************//
var getTwoBit = function(n){
    return (n > 9 ? '' : '0') + n
}
//格式化日期或获取今天完整日期
var getTime = function(value,format,split='-'){
    if(value){
        var date = new Date(value);
    }else{
        var date = new Date();
    }
    var y = date.getFullYear();
    var m = getTwoBit(date.getMonth() + 1);
    var d = getTwoBit(date.getDate());
    var h = getTwoBit(date.getHours());
    var min = getTwoBit(date.getMinutes());
    var s = getTwoBit(date.getSeconds());
    var partOne = [y, m, d].join(split);
    var partTwo = [h,min,s].join(':');
    if(format == 'ymd'){
        return partOne
    }else if(format == 'hms'){
        return partTwo;
    }else{
        return partOne + " " + partTwo;
    }
}

//获取前N天日期，第一个参数为 负数，为前几天日期，第二个参数为 正数，为后几天日期
var getBeforeDay = function(val,format,split){
    var date = new Date();
    date.setTime(date.getTime() + 3600 * 1000 * 24 * parseInt(val));
    var beforeDay =  getTime(date,format,split);
    return beforeDay;
}

//isNull
var isNull = function(val){
    if(!val && typeof(val) != 'undefined' && val != 0){
        return true;
    }else{
        return false;
    }
}

//去除特殊字符
var encodestr = function(str){
     var s = '';
    if (str.length === 0) {
        return;
    }
    s = str.replace(/&/g, '');
    s = s.replace(/</g, '');
    s = s.replace(/>/g, '');
    s = s.replace(/ /g, '');
    s = s.replace(/\'/g, '');
    s = s.replace(/\"/g, '');
    s = s.replace(/#/g, '');
    return s;
}
//获取前五十年的年份
var getBeforeYear = function(){
    var date = new Date();
    var y = date.getFullYear();
    var formatYearArray = [];
    for(var i = 0; i < 60; i++){
        formatYearArray.push(y-i);
    }
    return formatYearArray;
}

export{
    getTime,
    getBeforeDay,
    isNull,
    encodestr,
    getBeforeYear
}