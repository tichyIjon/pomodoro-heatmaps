let cnt1 = document.querySelector('.container1');
window.onbeforeunload = function(event) {
    return confirm();
}

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
          if (columnsUncoloredDivs[columnKey] < 25) {
            columnsUncoloredDivs[columnKey] += 1;
          }
          let sqr = document.querySelector(`.sqr${lowestDivIndex}`);
            sqr.classList.remove('blockColor')
            sqr.classList.remove('blockColor1')
            sqr.classList.remove('blockColor2')
            sqr.classList.remove('blockColor3')
            sqr.classList.remove('blockColor4')
            sqr.classList.remove('blockColor5')
            sqr.classList.remove('blockColor6')
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
        }
    }
}

// current month label generation
let month = document.querySelector('.month') 
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()
month.textContent = `${currentMonth}/${currentYear}`

// calculate how much hours have you worked in this month
function calculateHours() {

    logColors(colorLog)
    let totalPomodoros = Object.keys(colorLog).length

    let totalHours = Math.round(((totalPomodoros * 25) / 60) * 10) / 10
    let totalHoursDisplay = document.querySelector('.total-hours')
    totalHoursDisplay.textContent = `${totalHours}`
}

// function to save data in browser localStorage
let colorLog = {}
function logColors(colorLog) {
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
}

function save() {

    logColors(colorLog)

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
}

// fullscreen option
function goFullscreen() {
    document.body.requestFullscreen();
}

// clear grid function
function gridClear() {
    window.onbeforeunload = function(event) {
    return confirm();
};
    document. location. reload() 
}

// keypress animations
function pressAnimationDown(key) {
    key.style.transition = 'all 0.05s linear'
    key.style.backgroundColor = '#799999'
    key.style.marginLeft = '25px'
    key.style.marginTop = '5px'
    key.style.boxShadow = '4px 4px 0px 0px rgba(66, 68, 90, 1)'
}

function pressAnimationUp(key) {
    key.style.transition = 'all 0.1s linear'
    key.style.backgroundColor = '#282828'
    key.style.marginLeft = '20px'
    key.style.marginTop = '0px'
    key.style.boxShadow = '8px 8px 0px 0px rgba(66, 68, 90, 1)'
}

function showAlert(alertText) {
    let cnt = document.querySelector('.container1')
    let alert = document.createElement('div')
    alert.textContent = alertText
    alert.classList.add('alert')
    alert.setAttribute('style','background-color: rgba(141, 179, 179, 0.5); position: absolute; right: 50px; bottom: 50px; font-size: 2rem; color: rgba(255, 255, 255, 0.7) ')
    cnt.append(alert)
}

// keyboard controls
let selectedColumn = -1;
document.addEventListener('keydown',(event) => {
    if (event.key === 'a') {
        let key = document.querySelector('.a-button')
        pressAnimationDown(key)

        if (selectedColumn > 0) {
            selectedColumn -= 1;
            selectColumn(selectedColumn)
        }

    } else if (event.key === 'd') {
        let key = document.querySelector('.d-button')
        pressAnimationDown(key)

        if (selectedColumn < 29) {
            selectedColumn += 1;
            selectColumn(selectedColumn)
        } 
    } else if (event.key === 'Enter') {
        let key = document.querySelector('.enter-button')
        pressAnimationDown(key)

        if (selectedColumn !== -1) {
            colorDiv(selectedColumn, columnsUncoloredDivs);
            calculateHours()
        }
    } else if (event.key === 'Backspace') {
        let key = document.querySelector('.bcksp-button')
        pressAnimationDown(key)

        uncolorDiv(selectedColumn, columnsUncoloredDivs);
        calculateHours()
    } else if (event.key === 's') {
        let key = document.querySelector('.s-button')
        pressAnimationDown(key)

        save()
        showAlert('data saved to localStorage')
    } else if (event.key === 'l') {
        let key = document.querySelector('.l-button')
        pressAnimationDown(key)

        load()   
        calculateHours()
        showAlert('data loaded from localStorage')
    } else if (event.key === 'f') {
        let key = document.querySelector('.f-button')
        pressAnimationDown(key)

        goFullscreen()
    } else if (event.key === 'c') {
        let key = document.querySelector('.c-button')
        pressAnimationDown(key)

        gridClear()
        calculateHours()
    }

    //keypress animations
    document.addEventListener('keyup', (event) => {
        if (event.key === 'a') {
            let key = document.querySelector('.a-button')
            pressAnimationUp(key)
        } else if (event.key === 'd') {
            let key = document.querySelector('.d-button')
            pressAnimationUp(key)
        } else if (event.key === 'Enter') {
            let key = document.querySelector('.enter-button')
            pressAnimationUp(key)
        } else if (event.key === 'Backspace') {
            let key = document.querySelector('.bcksp-button')
            pressAnimationUp(key)
        } else if (event.key === 's') {
            let key = document.querySelector('.s-button')
            pressAnimationUp(key)
        } else if (event.key === 'l') {
            let key = document.querySelector('.l-button')
            pressAnimationUp(key)
        } else if (event.key === 'f') {
            let key = document.querySelector('.f-button')
            pressAnimationUp(key)
        } else if (event.key === 'c') {
            let key = document.querySelector('.c-button')
            pressAnimationUp(key)
        }
    })
})