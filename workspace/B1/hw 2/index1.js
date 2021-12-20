primeNumber = (n) => {
    for (let i = 2; i <= n / 2; ++i) if (!(n % i)) return false;
    return true;
  };
  
  document.getElementById("button").onclick = () => {
    let num1 = document.getElementById("1").value;
    let num2 = document.getElementById("2").value;
    let result = [];
    for (let i = num1; i <= num2; ++i) if (primeNumber(i)) result.push(i);
    alert(`Prime numbers is  ${result}`);
  };