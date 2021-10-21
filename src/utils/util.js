export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//节流函数
const throttle = (func, interval=250)=> {
  let timeout;
  let startTime = new Date();
  return function (event) {
    clearTimeout(timeout);
    let curTime = new Date();
    if (curTime - startTime <= interval) {
      //小于规定时间间隔时，用setTimeout在指定时间后再执行
      timeout = setTimeout(() => {
        func.call(this,event);
      }, interval)
    } else {
      //重新计时并执行函数
      startTime = curTime;
      func.call(this, event);
    }
  }
}

// 当前时间+10分钟，向上取整 返回select time
const getSelectTime = () => {
  let date = new Date()
  let first = 0
  let hour = date.getHours()
  const minute = date.getMinutes()
  let num = parseInt(Math.ceil(minute/10) + 1)
  if (num>5) {
    hour = hour + 1
    num = 1
  }
  if (hour > 23) {
    first = 1
    hour = 1
  }
  return [0,hour,num]
}

// 当前时间+10分钟，向上取整 返回时间
const getTimeStr = () => {
  let date = new Date()
  let num = parseInt(Math.ceil(date.getMinutes()/10) + 1) * 10
  date.setMinutes(num)
  
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  console.log([year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':'))
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 传入时间字符串，获取设置date-picker的value值
// 2020-10-28 15:30:00
const getValueByDateStr = (str) => {
  // let date = new Date('2020-11-01 15:30:00')
  let strTime = str.replace(/-/g, "/")
  let date = new Date(strTime)
  let strYMD = strTime.substring(0,strTime.length-9)
  let endTime = new Date(strYMD);
  // 当前系统时间
  let nowTime = new Date();
  const year = nowTime.getFullYear()
  const month = nowTime.getMonth() + 1
  const day = nowTime.getDate()
  let nowTimeYMD = [year, month, day].map(formatNumber).join('/')
  let t = endTime.getTime() - new Date(nowTimeYMD).getTime();
  let d = Math.floor(t / 1000 / 60 / 60 / 24); // 间隔天数
  console.log([d,date.getHours(),date.getMinutes()/10])
  return [d,date.getHours(),date.getMinutes()/10]
}

const formatMinutes = (value) => {
  let result = parseInt(Math.abs(value))
  if (result === 0 ) {
    return '0分钟'
  } else {
    // let h = Math.floor(result / 3600);
    let h = Math.floor((result / 60 % 60));
    let m = Math.floor((result % 60));

    let res = '';
    if (h != '0') res += `${h}小时`;
    if (m != '0') res += `${m}分钟`;
    return res;
  }
}

// export default{
//   formatTime,
//   throttle,
//   getSelectTime,
//   getValueByDateStr,
//   getTimeStr,
//   formatMinutes
// }
