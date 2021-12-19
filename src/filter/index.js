//去掉<br>
function replaceBr(value) {
    if (value == "" || isNull(value)) {
        return value;
    } else {
        var reg = new RegExp(/<br>/, "g");
        var formatBr = value.replace(reg, "  ");
        return formatBr;
    }
}

function selectNumFilter(value) {
    var readStatusCh = value;
    switch (value) {
        case "0":
            readStatusCh = "否";
            break;
        case "1":
            readStatusCh = "是";
            break;
    }
    return readStatusCh;
}
export {
    replaceBr,
    selectNumFilter,
}