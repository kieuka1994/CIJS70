import cal from "./Bt1"

const num1 = document.getElementsById('num1')
const num2 = document.getElementsById('num2')

const congCal = document.getElementById('cong');
const truCal = document.getElementById('tru');
const nhanCal = document.getElementById('nhan');
const chiaCal = document.getElementById('chia');
const result = document.getElementById('result');

function check (a,b){
    if (isNaN(a) || isNaN(b) || a.length === 0 || b.length === 0) return false;
    return true;
}

function validate (sth){
    sth.textContent = "Kiểm tra đúng kêt quả không";
}

congCal.addEventListener('click', () =>{
    if (check(num1.value, num2.value) === false ) 
        validate (result);
     else { 
        result.textContent = cal.add (parseInt(num1.value),parseInt(num2.value));
    }
})
truCal.addEventListener('click', () =>{
    if (check(num1.value, num2.value) === false ) 
        validate (result);
    else { 
        result.textContent = cal.sub (parseInt(num1.value),parseInt(num2.value));
    }
})
nhanCal.addEventListener('click', () =>{
    if (check(num1.value, num2.value) === false ) 
        validate (result);
     else { 
        result.textContent = cal.multiply(parseInt(num1.value),parseInt(num2.value));
    }
})
chiaCal.addEventListener('click', () =>{
    if (check(num1.value, num2.value) === false ) 
        validate (result);
     else { 
        result.textContent = cal.divide (parseInt(num1.value),parseInt(num2.value));
    }
})