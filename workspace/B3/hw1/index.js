window.onload = function () {
  
    var seconds = 00; 
    var tens = 00; 
    var CountTens = document.getElementById("tens")
    var CountSeconds = document.getElementById("seconds")
    var buttonRun = document.getElementById('button-run');
    var buttonStop = document.getElementById('button-stop');
    var buttonClear = document.getElementById('button-clear');
    var Interval ;
  
    buttonRun.onclick = function() {
      
      clearInterval(Interval);
       Interval = setInterval(startTimer, 10);
    }
    
      buttonStop.onclick = function() {
         clearInterval(Interval);
    }
    
  
    buttonClear.onclick = function() {
       clearInterval(Interval);
      tens = "00";
      seconds = "00";
      CountTens.innerHTML = tens;
      CountSeconds.innerHTML = seconds;
    }
    
     
    
    function startTimer () {
      tens++; 
      
      if(tens <= 10){
        CountTens.innerHTML = "0" + tens;
      }
      
      if (tens > 10){
        CountTens.innerHTML = tens;
        
      } 
      
      if (tens > 100) {
        console.log("seconds");
        seconds++;
        CountSeconds.innerHTML = "0" + seconds;
        tens = 0;
        CountTens.innerHTML = "0" + 0;
      }
      
      if (seconds > 10){
        CountSeconds.innerHTML = seconds;
      }
    
    }
    
  
  }