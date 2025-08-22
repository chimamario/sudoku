let cells = Array(36).fill(null)

let number = null

// access number selector
const numDisplay = document.getElementById("select_text")
numText = numDisplay.children

//to make sure you can only select 1 number
let mainNumber = null


const mainGrid = document.getElementById("main_grid")


const but1 = document.getElementById("num_1")
const but2 = document.getElementById("num_2")
const but3 = document.getElementById("num_3")
const but4 = document.getElementById("num_4")
const but5 = document.getElementById("num_5")
const but6 = document.getElementById("num_6")


but1.addEventListener('click', numSelector) 
but2.addEventListener('click', numSelector) 
but3.addEventListener('click', numSelector) 
but4.addEventListener('click', numSelector) 
but5.addEventListener('click', numSelector) 
but6.addEventListener('click', numSelector) 

const right_bottom_idxs = [8,20]
const right_top_idxs = [14,26]
const left_bottom_idxs = [9,21] 
const left_top_idxs = [15,27] 
const bottom_idxs = [6,7,10,11,18,19,22,23]
const top_idxs = [12,13,16,17,24,25,28,29]
const right_idxs = [2,32]
const left_idxs = [3,33]

const testingSet = {
    0:2,
    6:1,
    9:4,
    15:5,
    17:2,
    23:3,
    25:5,
    26:6,
    34:5,
    35:6
}

//check if sudoku logic is sound
const LINES = [
    // Rows
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
  
    // Columns
    [0, 6, 12, 18, 24, 30],
    [1, 7, 13, 19, 25, 31],
    [2, 8, 14, 20, 26, 32],
    [3, 9, 15, 21, 27, 33],
    [4, 10, 16, 22, 28, 34],
    [5, 11, 17, 23, 29, 35],
  
    // 2x3 Boxes
    [0, 1, 2, 6, 7, 8],
    [3, 4, 5, 9, 10, 11],
    [12, 13, 14, 18, 19, 20],
    [15, 16, 17, 21, 22, 23],
    [24, 25, 26, 30, 31, 32],
    [27, 28, 29, 33, 34, 35]
  ];


function renderBoard() {
    mainGrid.innerHTML = ''
    const idxSetList = Object.keys(testingSet).map(Number)
    cells.forEach((value, idx) => {
        const btn = document.createElement('btn')
        // create dark lines
        if (right_bottom_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-r-4 border-b-4 flex items-center justify-center text-black font-bold"
        } else if (right_top_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-r-4 border-t-4 flex items-center justify-center text-black font-bold"
        } else if (left_bottom_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-l-4 border-b-4 flex items-center justify-center text-black font-bold"
        } else if (left_top_idxs.includes(idx)){
            btn.className = "w-16 h-16  border border-black  border-t-4 border-l-4 flex items-center justify-center text-black font-bold"
        } else if (bottom_idxs.includes(idx)){
            btn.className = "w-16 h-16  border border-black  border-b-4 flex items-center justify-center text-black font-bold"
        } else if (top_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-t-4 flex items-center justify-center text-black font-bold"
        } else if (right_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-r-4 flex items-center justify-center text-black font-bold"
        }
        else if (left_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-l-4 flex items-center justify-center text-black font-bold"
        } else {
            btn.className = "w-16 h-16  border border-black flex items-center justify-center text-black font-bold"
        }

        //add initial numbers or leave empty
        if (idxSetList.includes(idx)) {
            btn.textContent = testingSet[idx]
            btn.classList.add("cursor-not-allowed")
            btn.classList.add("bg-grey-100")
        } else {
            btn.textContent = " "
            btn.addEventListener('click', addNumber) //only allowed for blank spaces
        }
        
        
        mainGrid.appendChild(btn)
    })
}

function numSelector(e) {
    e.preventDefault();
    numDisplay.textContent = `number selected: ${e.target.innerText}`
    e.target.classList.add("border","border-green-500")

    if (mainNumber === null) {
        mainNumber = e.target
    } else if (e.target !== mainNumber) {
        mainNumber.classList.remove("border-green-500")
        mainNumber = e.target
    }
  
    console.log(mainNumber)
}

function addNumber(e) {
    e.preventDefault();
    if (mainNumber === null) {
        console.log("select a number")
    } else {
        e.target.textContent = mainNumber.innerText
        e.target.classList.add("text-blue-600")
        console.log(e.target.textContent)
    }
}

// function checkLogic() {
//     for (let line in LINES) {
//         if (line.every(v => v !== null)) {

//         }
//     }
// }





renderBoard()