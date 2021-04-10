export const parse = (date) => {
    return date.getFullYear() + "-" + ((date.getMonth() * 1) + 1) + "-" + date.getDate()
        + " " + date.getHours() +  ":" + date.getMinutes() + ":" + date.getSeconds()
}
