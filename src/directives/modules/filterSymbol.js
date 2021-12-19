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
export default{
    update(el,{value,modifiers},vnode){
        try{
            if(!el.value){
                return false;
            }
            el.value = encodestr(el.value);
            if(typeof value != 'undefined'){
                if(el.value.length >= value){
                    el.value = el.value.substr(0,value);
                }
            }
            el.dispatchEvent(new Event(modifiers.lazy ? 'change' : 'input'));
        }catch(e){

        }
    }
}