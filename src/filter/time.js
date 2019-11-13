export default function Totime(n){

    let date = new Date(parseInt(n))
    // console.log(date)
    let year = date.getFullYear()
    // console.log(year,'年')
    let month = date.getMonth()+1 >=10 ? date.getMonth()+1 : "0" +( date.getMonth()+1)
    let day = date.getDate() >=10 ? date.getDate() : "0"+ date.getDate()
    // console.log(day,'天')
    // 时分秒
    let hour=date.getHours()>=10?date.getHours():'0'+(date.getHours())
    let minute=date.getMinutes()>=10?date.getMinutes():'0'+(date.getMinutes())
    let second=date.getSeconds()>=10?date.getSeconds():'0'+(date.getSeconds())
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}