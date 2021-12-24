function run(){
    let clock = document.getElementById('time')
    let date = new Date
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    clock.innerHTML = `${hour}:${minutes}:${seconds}`  
}
setInterval(run, 1000);