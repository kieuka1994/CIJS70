let item = document.getElementById('div');
item.addEventListener("mouseover",()=>{
  item.setAttribute("style", "background-color:yellow;")
})

item.addEventListener("mouseout",()=>{
    item.setAttribute("style", "background-color: '';" )
})