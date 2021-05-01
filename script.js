//selectors
var gridDimensions = 16;
const color = document.getElementById("colors"); 
var currentcolor = color.value;
const canvas = document.querySelector(".canvas");
const colorselector = document.getElementById("colors");
const clear = document.getElementById("clear");
const changesize = document.getElementById("changesize");

var pixels = document.querySelectorAll(".canvas div");
initgrid();

//functions
function initgrid()
{
    canvas.style.gridTemplateRows = `repeat(${gridDimensions},1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${gridDimensions},1fr)`;

    for(let i = 1 ; i <= gridDimensions*gridDimensions ; i++ )
    {
        canvas.appendChild(document.createElement("div"));
    }

    pixels = document.querySelectorAll(".canvas div"); 
    pixels.forEach( (pixel) => {
        pixel.addEventListener("mouseover", (e)=> {
             e.target.style.backgroundColor = currentcolor;} );
    })
}

function clearcanvas()
{
    pixels.forEach( (pixel) => {
        pixel.style.backgroundColor = "#FFFFFF";
    } )
}

function changeSize(){

    var n = prompt("give the new number of pixels, must be smaller than 64");
    if(n == null)
    return;
    else if(n>64)
        alert("the given number is bigger than 64 ");
    else
    {
        canvas.innerHTML = "";
        gridDimensions = n;
        initgrid();
    }   
    
}

//event listeners
color.oninput = () => { currentcolor = color.value; }

clear.addEventListener("click",clearcanvas)

changesize.addEventListener("click",changeSize)