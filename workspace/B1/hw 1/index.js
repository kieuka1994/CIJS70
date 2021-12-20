document.getElementById("button").onclick = () => {
    let colNum = document.getElementById("1").value;
    let rowNum = document.getElementById("2").value;
    let table = document.getElementById("table");
    table.border = 2;
    for (let i = 0; i < rowNum; ++i) {
      let tableRow = document.createElement("tr");
      table.appendChild(tableRow);
      for (let k = 0; k < colNum; ++k) {
        tableRow.appendChild(document.createElement("td"));
      }
    }
  };
