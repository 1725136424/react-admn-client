export const parse = (date) => {
    return date.getFullYear() + "-" + parseStr(((date.getMonth()) + 1)) + "-" + parseStr(date.getDate())
        + " " + parseStr(date.getHours()) +  ":" + parseStr(date.getMinutes()) + ":" + parseStr(date.getSeconds())
}

export const parseDate = (date) => {
    return date.getFullYear() + "-" + parseStr(((date.getMonth()) + 1))  + "-" + parseStr(date.getDate())
}


function parseStr(start, num = 10) {
    if (start < num) {
        start = '0' + start
    }
    return start
}
