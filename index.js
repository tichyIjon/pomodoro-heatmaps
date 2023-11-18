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
for (let i = 25; i > 0; i -= 1) {
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

// function to save data in browser localStorage
function save() {
    let columnsUncoloredDivs_serialized = JSON.stringify(columnsUncoloredDivs)
    localStorage.setItem('columnsUncoloredDivs',columnsUncoloredDivs_serialized)
    console.log('data saved to localStorage')
}

// functions to load data from browser localStorage

function colorOnLoad(columnsUncoloredDivs) {
    let columnKey;
    for (let i = 0; i <= 30; i++ ) {
        columnKey = `column${i}UnColoredDivs`
        if (columnsUncoloredDivs[columnKey] !== 25) {
            let lowestColoredDivIndex = i + 720;
            let highestColoredDivIndex = lowestColoredDivIndex - ((24 - columnsUncoloredDivs[columnKey]) * 30)
            for (let i = highestColoredDivIndex; i <= lowestColoredDivIndex; i += 30) {
                let sqr = document.querySelector(`.sqr${i}`);
                sqr.style.backgroundColor = 'coral';
            }
        }
    }
}

function load() {
    let columnsUncoloredDivs_deserialized = JSON.parse(localStorage.getItem('columnsUncoloredDivs'))
    columnsUncoloredDivs = columnsUncoloredDivs_deserialized

    colorOnLoad(columnsUncoloredDivs)
    alert('data loaded from localStorage')
}


// keyboard controls
let selectedColumn = -1;
document.addEventListener('keydown',(event)=> {
    if (event.key === 'a') {
        if (selectedColumn > 0) {
            selectedColumn -= 1;
            selectColumn(selectedColumn)
        }
    } else if (event.key === 'd') {
        if (selectedColumn < 29) {
            selectedColumn += 1;
            selectColumn(selectedColumn)
        } 
    } else if (event.key === 'Enter') {
        if (selectedColumn !== -1) {
            colorDiv(selectedColumn, columnsUncoloredDivs);
        }
        save()
    } else if (event.key === 'Backspace') {
      if (selectedColumn !== -1) {
          uncolorDiv(selectedColumn, columnsUncoloredDivs);
      }
      save()
    } else if (event.key === 's') {
        alert('data saved to localStorage')
        save()
    } else if (event.key === 'l') {
        load()
    }
})