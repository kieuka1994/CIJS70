let num = Math.floor(Math.random()*40)

let arr =[]

function findEven(){
  if(num > 4){
      for(let i = 4 ; i < num ; i++){
        if (i % 2 == 0) {
            arr.push(i)
        }
    }
  }
    
}
findEven()
console.log(arr)