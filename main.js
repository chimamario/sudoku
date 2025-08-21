let grid = Array(36).fill(null)

let number = null

const numDisplay = document.getElementById("select_text")

numText = numDisplay.children


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
// but2 
// but3 
// but4 
// but5 
// but6 

function numSelector(e) {
    e.preventDefault();
    numDisplay.textContent = `number selected: ${e.target.innerText}`
    console.log(numText)
}