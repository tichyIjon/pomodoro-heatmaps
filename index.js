let cnt1 = document.querySelector('.container1');

// color variables

let columnSelectorColor = 'red'
let gridLinesColor = '#928374'

// grid dimensions
let contHeight = 700;
let contWidth = 1600;

let sqrHeight = contHeight / 25;
let sqrWidth = contWidth / 30;

// grid generation
for (let i = 0; i < 750; i++) {
    let square = document.createElement('div')
    square.setAttribute('class',`sqr sqr${i}`)
    square.setAttribute('style',` height: ${sqrHeight}px; width: ${sqrWidth}px;`)
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

// function for column selecting
function selectColumn(column) {
    let upperBound = column + 721; 

    for (let i = 0; i < 750; i ++) {
      let sqr = document.querySelector(`.sqr${i}`) 
      sqr.style.border = `none`;
    }

    for (let i = column; i <= upperBound; i += 30) {
      let sqr = document.querySelector(`.sqr${i}`)
      sqr.style.borderLeft = `3px solid #ebbdb2`;
      sqr.style.borderRight = `3px solid #ebbdb2`;
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
          totalPomodoros -= 1;
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
            if (columnsUncoloredDivs[columnKey] >= 21 && columnsUncoloredDivs[columnKey] <= 25) {
                sqr.classList.add('blockColor')
            } else if (columnsUncoloredDivs[columnKey] >= 17 && columnsUncoloredDivs[columnKey] <= 21) {
                sqr.classList.add('blockColor1')
            } else if (columnsUncoloredDivs[columnKey] >= 13 && columnsUncoloredDivs[columnKey] <= 17) {
                sqr.classList.add('blockColor2')
            } else if (columnsUncoloredDivs[columnKey] >= 9 && columnsUncoloredDivs[columnKey] <= 13) {
                sqr.classList.add('blockColor3')
            } else if (columnsUncoloredDivs[columnKey] >= 5 && columnsUncoloredDivs[columnKey] <= 9) {
                sqr.classList.add('blockColor4')
            } else if (columnsUncoloredDivs[columnKey] >= 1 && columnsUncoloredDivs[columnKey] <= 5) {
                sqr.classList.add('blockColor5')
            } else if (columnsUncoloredDivs[columnKey] < 1) {
                sqr.classList.add('blockColor6')
            }
            totalPomodoros += 1;
        }
    }
}

// calculate how much hours have you worked in this month
let totalPomodoros = 0;
function calculateHours() {
    let totalHours = Math.round(((totalPomodoros * 25) / 60) * 10) / 10
    let totalHoursDisplay = document.querySelector('.total-hours')
    totalHoursDisplay.textContent = `${totalHours}`
}

// function to save data in browser localStorage
let colorLog = {}
function save() {

    for (let i = 0; i <= 750; i++) {
        if($(`.sqr${i}`).hasClass('blockColor')) {
            colorLog[`.sqr${i}`] = "blockColor";

        } else if ($(`.sqr${i}`).hasClass('blockColor1')) {
            colorLog[`.sqr${i}`] = "blockColor1";

        } else if ($(`.sqr${i}`).hasClass('blockColor2')) {
            colorLog[`.sqr${i}`] = "blockColor2";

        } else if ($(`.sqr${i}`).hasClass('blockColor3')) {
            colorLog[`.sqr${i}`] = "blockColor3";

        } else if ($(`.sqr${i}`).hasClass('blockColor4')) {
            colorLog[`.sqr${i}`] = "blockColor4";

        } else if ($(`.sqr${i}`).hasClass('blockColor5')) {
            colorLog[`.sqr${i}`] = "blockColor5";

        } else if ($(`.sqr${i}`).hasClass('blockColor6')) {
            colorLog[`.sqr${i}`] = "blockColor6";

        }
    }

    let colorLog_serialized = JSON.stringify(colorLog)
    localStorage.setItem('colorLog',colorLog_serialized)

    let columnsUncoloredDivs_serialized = JSON.stringify(columnsUncoloredDivs)
    localStorage.setItem('columnsUncoloredDivs',columnsUncoloredDivs_serialized)

    console.log('data saved to localStorage')
}

// functions to load data from browser localStorage
function colorOnLoad() {
    for (let i = 0; i < 750; i++) {

        if (colorLog[`.sqr${i}`] === 'blockColor') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor')

        } else if (colorLog[`.sqr${i}`] === 'blockColor1') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor1')

        } else if (colorLog[`.sqr${i}`] === 'blockColor2') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor2')

        } else if (colorLog[`.sqr${i}`] === 'blockColor3') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor3')

        } else if (colorLog[`.sqr${i}`] === 'blockColor4') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor4')

        } else if (colorLog[`.sqr${i}`] === 'blockColor5') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor5')

        } else if (colorLog[`.sqr${i}`] === 'blockColor6') {
            let sqr = document.querySelector(`.sqr${i}`)
            sqr.classList.add('blockColor6')
        }
    }
}

function load() {
    let columnsUncoloredDivs_deserialized = JSON.parse(localStorage.getItem('columnsUncoloredDivs'))
    columnsUncoloredDivs = columnsUncoloredDivs_deserialized

    let colorLog_deserialized = JSON.parse(localStorage.getItem('colorLog'))
    colorLog = colorLog_deserialized

    colorOnLoad()
    alert('data loaded from localStorage')
}

// fullscreen option
function goFullscreen() {
    document.body.requestFullscreen();
}

// clear grid function
function gridClear() {
    document. location. reload() 
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
            calculateHours()
        } 
    } else if (event.key === 'Enter') {
        if (selectedColumn !== -1) {
            colorDiv(selectedColumn, columnsUncoloredDivs);
            calculateHours()
        }
    } else if (event.key === 'Backspace') {
      if (selectedColumn !== -1) {
          uncolorDiv(selectedColumn, columnsUncoloredDivs);
      }
    } else if (event.key === 's') {
        alert('data saved to localStorage')
        save()
    } else if (event.key === 'l') {
        load()   
    } else if (event.key === 'f') {
        goFullscreen()
    } else if (event.key === 'c') {
        gridClear()
    }
})