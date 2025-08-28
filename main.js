let cells = Array(36).fill(null)
let cell_notes = Array(36).fill(null)
let number = null

// access number selector
const numDisplay = document.getElementById("select_text")
numText = numDisplay.children

//to make sure you can only select 1 number
let mainNumber = null

// for notes mode
let notesMode = false;


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


const notesFormation = {
    // 1: ['container'],
    1: ["absolute", "top-0", "left-0", "text-red-600"],
    3: ["absolute","top-0", "right-0", "text-red-600"],
    6: ["absolute","bottom-0", "right-0", "text-red-600"]
    // 3: [ "text-red-600"]
}

const dataPosDict = {
    1: "top-left",
    3: "top-right"
}


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
        } else {
            btn.dataset.index = idx
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
  
}

function addNumber(e) {
    e.preventDefault();
    if (mainNumber === null) {
        console.log("select a number")
    } else {
        if (notesMode == false) {

            if (e.target.textContent == mainNumber.innerText) {
                e.target.textContent = " "
            } else {
                e.target.textContent = mainNumber.innerText
                cells[e.target.dataset.index] = mainNumber.innerText
                e.target.classList.add("flex", "items-center", "justify-center")
                e.target.classList.add("text-blue-600")
                
            }
            
        } else if (notesMode == true){

            if (cell_notes[e.target.dataset.index] === null) { 
                
                // adjust formatting for notes
                e.target.classList.remove("flex", "items-center", "justify-center")
                e.target.classList.remove("flex", "items-center", "justify-center")

                // create notes_list
                let notes_list = []
                notes_list.push(mainNumber.innerText)

                //display number notes section
                const notes_div = document.createElement('div')
                notes_div.classList.add('relative')
                // notes_div.classList.add('inset-0')
                // notes_div.classList.add('translate-y-2')
                notes_list.forEach((num, idx) => {
                    let num_child = document.createElement('p')
                    num_child.textContent = `${num}`
                    num_classes = notesFormation[num]
                    num_classes.forEach((cls, idx) => {
                        
                        num_child.classList.add(cls)
                        
                    })
                    num_child.dataset.pos = dataPosDict[num]
                    notes_div.appendChild(num_child)
                })
                
                e.target.appendChild(notes_div)

                cell_notes[e.target.dataset.index] = notes_list //add notes numbers to global array
               
                
            } else {

                notes_list = cell_notes[e.target.dataset.index]

                //removes old div since new one is created below
                const currentDiv = e.target.querySelector("div")
                // if (oldDiv) oldDiv.remove()
                
                if (notes_list.includes(mainNumber.innerText)) {
                    notes_list.splice(mainNumber.innerText)

                } else {
                    notes_list.push(mainNumber.innerText)

                    const notes_div = document.createElement('div')
                    currentDiv.classList.add('relative')
                    notes_list.forEach((num, idx) => {
                        let num_child = document.createElement('p')
                        num_child.textContent = `${num}`
                        num_classes = notesFormation[num]
                        num_classes.forEach((cls, idx) => {
                        
                            num_child.classList.add(cls)
                            
                        })
                        currentDiv.appendChild(num_child)
                    })
                    
                    e.target.appendChild(currentDiv)
                }

                // console.log(notes_list)
                console.log(e.target)
                
                
            }

        }
        
    }
}

//create function to add notes




but_list = [but1, but2, but3, but4, but5, but6]

function addNotes(e) {
    e.preventDefault();
    if (notesMode == false) {
        notesMode = true
        e.target.classList.add("bg-green-400")

        but_list.forEach((button, idx) => {
            button.classList.add('italic','font-light', 'text-red-600')
        })

    } else if (notesMode == true) {
        notesMode = false
        e.target.classList.remove("bg-green-400")

        but_list.forEach((button, idx) => {
            button.classList.remove('italic','font-light', 'text-red-600')
        })
    }
    
}


// function checkLogic() {
//     for (let line in LINES) {
//         if (line.every(v => v !== null)) {

//         }
//     }
// }

// game relavent clicks below

const notesButton = document.getElementById("notes_button");

notesButton.addEventListener('click', addNotes)



renderBoard()