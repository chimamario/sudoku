let cells = Array(36).fill(null)
// let cell_notes = Array(36).fill(null)
// const cell_notes = Array.from({length: 36}, () => []);
let cell_notes = Array(36).fill(null).map(() => []);

// [ [], [], [], [], [], [] ]

let number = null

// access number selector
const numDisplay = document.getElementById("select_text")
numText = numDisplay.children

//to make sure you can only select 1 number
let mainNumber = null

// for notes mode
let notesMode = false;

// check if grid is complete
let gameOver = false
let incorrectLines = []
let correctLines = 0


const mainGrid = document.getElementById("main_grid")

const numberButtons = Array.from({length:6}, (_, i) => document.getElementById(`num_${i+1}`))
numberButtons.forEach(butt => {
    butt.addEventListener('click', numSelector)
})



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


const notesFormation = {
    // 1: ['container'],
    1: ["absolute", "top-0", "left-0", "text-red-600"],
    2: ["absolute", "top-0", "left-6", "text-red-600"],
    4: ["absolute", "top-8", "left-0", "text-red-600"],
    3: ["absolute","top-0", "right-0", "text-red-600"],
    5: ["absolute", "top-8", "left-6", "text-red-600"],
    6: ["absolute","top-8", "right-0", "text-red-600"]
    // 3: [ "text-red-600"]
}

const numberOptions = [1,2,3,4,5,6]

function renderBoard() {
    mainGrid.innerHTML = ''
    const idxSetList = Object.keys(testingSet).map(Number)
    cells.forEach((value, idx) => {
        const btn = document.createElement('btn')
        // create dark lines
        if (right_bottom_idxs.includes(idx)) {
            btn.className = "relative w-16 h-16  border border-black  border-r-4 border-b-4 flex items-center justify-center text-black font-bold"
        } else if (right_top_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-r-4 border-t-4 flex items-center justify-center text-black font-bold"
        } else if (left_bottom_idxs.includes(idx)) {
            btn.className = "w-16 h-16  border border-black  border-l-4 border-b-4 flex items-center justify-center text-black font-bold"
        } else if (left_top_idxs.includes(idx)){
            btn.className = "relative w-16 h-16  border border-black  border-t-4 border-l-4 flex items-center justify-center text-black font-bold"
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
            cells[idx] = testingSet[idx]
        } else {
            btn.dataset.index = idx
            btn.textContent = " "
            btn.id = `${idx}`
            btn.addEventListener('click', addNumbers) //only allowed for blank spaces
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
    } else if (e.target.innerText !== mainNumber) {
        mainNumber.classList.remove("border-green-500")
        mainNumber = e.target
    }
    
}



function renderNumbers() {

    cells.forEach((value, idx) => { //first clear all cells before running through real and notes numbers
        const button = document.getElementById(`${idx}`);
        if (!button) return;
        button.innerText = ""; // clear previous value
        //remove all unique classes that distinguiah beteen notes and number
        button.classList.remove("flex", "items-center", "justify-center")

    })
    cells.forEach((value, idx) => {
        const button = document.getElementById(`${idx}`);
        if (!button) return;

        // reset button first
        
        

        if (value !== null) {
            button.classList.add("flex", "items-center", "justify-center", "text-blue-600");
            button.innerText = value;
        }
    })
    cell_notes.forEach((value,idx) => {
        const button = document.getElementById(`${idx}`);
        if (!button) return;

        const red_nums = cell_notes[idx]

        if (red_nums && red_nums.length > 0) {

             //remove so that we an adjust placement

            
            const redDiv = document.createElement('div')
            redDiv.classList.add('relative')
            
            red_nums.forEach((num,idx) => {//iterate through each number on the list
            const redChild = document.createElement('p')

            redChild.textContent = `${num}`

            red_classes = notesFormation[num] //get respective class values from number 
            red_classes.forEach((cls, idx) => {      
                redChild.classList.add(cls)  
            })
            redDiv.appendChild(redChild)
            })
        
        button.appendChild(redDiv)     
        } else {}

        // console.log(cells)
    
    
        
    })
    
    logicChecker()

    };


function logicChecker() {

    incorrectLines = []
    correctLines = 0

    LINES.forEach((line, index) => {

        //get cells values thorugh line idx
        let cellsList = []
        line.forEach((value, idx) => {
            cellsList.push(cells[value])
        })

        if (cellsList.includes(null)) return;

        
        
        const seen = new Set();
        for (const value of cellsList) {
            if (seen.has(value)) {
                // console.log(`duplicated value: ${value}`)
                // console.log(`line ${index} has duplicate values`)
                incorrectLines.push(index)
                break;
            } else {
                seen.add(value)
            }
        }

        if (seen.size == 6) {
            correctLines = correctLines +1
        }
        
    })

    if (incorrectLines.length > 0) {
        console.log(`incorrectLines List: ${incorrectLines}`)
        //u could change class of each button for incorrect lines, then it'll reset if user changes
        //you'll have to change classes back at begining of function (maybe give it a 2 sec timeout so that user chan be notified if error still occures)
    } 

    if (correctLines == 18) {
        gameOver == true;
        console.log('YOU COMPLETED THE GAME')
        // need to test out, and need to add visuals to front end.
    }
    

    

}



function addNumbers(e) { //this function works with the renderNumbers function to place numbers every frame based on what is in cells and cell_notes
    // we manipuate cells and cell_notes and call rendersNumbers to run with every click
    e.preventDefault()
    if (mainNumber === null) {
        console.log("select a number")
    } else {
        if (notesMode == false) {
            
            //check if cell is null, same number as main, or is a different number
            if (cells[e.target.dataset.index] === null && cell_notes[e.target.dataset.index] === null) {// should it be [] instead of null? check when other errors occur
                cells[e.target.dataset.index] = Number(mainNumber.innerText)
            } else if (cells[e.target.dataset.index] === null && cell_notes[e.target.dataset.index] !== null) {
                cells[e.target.dataset.index] = Number(mainNumber.innerText)
                cell_notes[e.target.dataset.index] =  [] //removing notes if we click in false notes mode
            } else if (cells[e.target.dataset.index] === Number(mainNumber.innerText)) { //if condition is met, there is no notes number wrt index
                cells[e.target.dataset.index] = null
            } else if (cells[e.target.dataset.index] !== null) {
                cells[e.target.dataset.index] = null
                cells[e.target.dataset.index] = Number(mainNumber.innerText)
            }
            // break down
            renderNumbers()

        } else { //notesMode = true

            num_idx = Number(e.target.dataset.index)
            if (cell_notes[num_idx] && cell_notes[num_idx].length == 0 && cells[num_idx] === null) {
                
                cell_notes[num_idx].push(mainNumber.innerText)
               
            } else if (cell_notes[num_idx] && cell_notes[num_idx].length == 0 && cells[num_idx] !== null) {
                cells[e.target.dataset.index] = null
                cell_notes[num_idx].push(mainNumber.innerText)
            }
            
            else if (cell_notes[num_idx] && cell_notes[num_idx].includes(mainNumber.innerText)){ //remove notes number if its already there
                cell_notes[num_idx] = cell_notes[num_idx].filter(num => num !== mainNumber.innerText)
            } else if (cell_notes[num_idx] && !cell_notes[num_idx].includes(mainNumber.innerText)) { // add notes number
                cell_notes[num_idx].push(mainNumber.innerText)
            } else {
                console.log('skipped all my conditions')

            }
            renderNumbers()
        }
        
    }


}



function addNotes(e) {
    e.preventDefault();
    if (notesMode == false) {
        notesMode = true
        e.target.classList.add("bg-green-400")

        numberButtons.forEach((button, idx) => {
            button.classList.add('italic','font-light', 'text-red-600')
        })

    } else if (notesMode == true) {
        notesMode = false
        e.target.classList.remove("bg-green-400")

        numberButtons.forEach((button, idx) => {
            button.classList.remove('italic','font-light', 'text-red-600')
        })
    }
    
}




const notesButton = document.getElementById("notes_button");

notesButton.addEventListener('click', addNotes)


const gameStatus = document.getElementById("end_game_status" )

const statusText = document.createElement('h1')
let w_or_l = "not complete :("
statusText.innerText = `Game Status: ${w_or_l}`

gameStatus.appendChild(statusText)

function changeGameStatus() {
    if (gameOver == false) {
        // add if statement for if an incorrect value is in a line.
    } else if (gameOver == true) {
        w_or_l = "COMPLETE!!!!"
        statusText.innerText = `Game Status: ${w_or_l}`
        statusText.className = "text-green-600 text-xl"
    }
}


changeGameStatus()
renderBoard()