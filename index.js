let cnt1 = document.querySelector('.container1');

// grid dimensions
let contHeight = 700;
let contWidth = 1600;

let sqrHeight = contHeight / 25;
let sqrWidth = contWidth / 30;

// grid generation
for (let i = 0; i < 750; i++) {
    let square = document.createElement('div')
    square.setAttribute('class',`sqr sqr${i}`)
    square.setAttribute('style',`border: 1px dotted black; height: ${sqrHeight}px; width: ${sqrWidth}px;`)
    cnt1.append(square)
}

// xAxis label generation
let list = document.querySelector('.list-xAxis')
for (let i = 1; i <= 30; i++) {
  let li = document.createElement('li')
  li.setAttribute('class',`list-item li${i}`)
  li.setAttribute('style',`width: ${sqrWidth}px; height: ${sqrHeight}px;`)
  li.textContent = `${i}`
  list.append(li)
}

// yAxis label generation
let listYaxis = document.querySelector('.list-yAxis')
for (let i = 1; i <= 25; i++) {
  let li = document.createElement('li')
  li.setAttribute('class',`list-item li${i}`)
  li.setAttribute('style',`width: ${sqrWidth}px; height: ${sqrHeight}px;`)
  li.textContent = `${i}`
  listYaxis.append(li)
}


// function for column selecting
function selectColumn(column) {
    let upperBound = column + 721; 

    for (let i = 0; i < 750; i ++) {
      let sqr = document.querySelector(`.sqr${i}`) 
      sqr.style.border = '1px dotted black';
    }

    for (let i = column; i <= upperBound; i += 30) {
      let sqr = document.querySelector(`.sqr${i}`)
      sqr.style.border = '2px dotted red';
    }
}

// all this shit is used whe calculating which div to color
let columnsUncoloredDivs = {};
for (let i = 0; i < 30; i++) {
    columnsUncoloredDivs[`column${i}UnColoredDivs`] = 25;
}

function uncolorDiv(column, columnsUncoloredDivs) {
  if (column >= 0 && column < 30) {
      let columnKey = `column${column}UnColoredDivs`;

      if (columnsUncoloredDivs[columnKey] > 0) {
          let lowestDivIndex = column + (30 * columnsUncoloredDivs[columnKey]) - 30;
          columnsUncoloredDivs[columnKey] += 1;
          let sqr = document.querySelector(`.sqr${lowestDivIndex}`);
          sqr.style.backgroundColor = 'white';
      }
  }
}

function colorDiv(column, columnsUncoloredDivs) {
    if (column >= 0 && column < 30) {
        let columnKey = `column${column}UnColoredDivs`;

        if (columnsUncoloredDivs[columnKey] > 0) {
            let lowestDivIndex = column + (30 * columnsUncoloredDivs[columnKey]) - 30;
            columnsUncoloredDivs[columnKey] -= 1;
            let sqr = document.querySelector(`.sqr${lowestDivIndex}`);
            sqr.style.backgroundColor = 'coral';
        }
    }
}

// keyboard controls
let selectedColumn = -1;
document.addEventListener('keydown',(event)=> {
    console.log(event.key)
    if (event.key === 'a') {
        if (selectedColumn > 0) {
            console.log(selectedColumn)
            selectedColumn -= 1;
            selectColumn(selectedColumn)
            console.log(selectedColumn)
        }
    } else if (event.key === 'd') {
        if (selectedColumn < 29) {
            console.log(selectedColumn)
            selectedColumn += 1;
            selectColumn(selectedColumn)
            console.log(selectedColumn)
        } 
    } else if (event.key === 'Enter') {
        if (selectedColumn !== -1) {
            colorDiv(selectedColumn, columnsUncoloredDivs);
        }
    } else if (event.key === 'Backspace') {
      if (selectedColumn !== -1) {
          uncolorDiv(selectedColumn, columnsUncoloredDivs);
      }
    }
})