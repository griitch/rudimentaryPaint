//selectors
const color = document.getElementById("colors"); 
const canvas = document.querySelector(".canvas");
const colorselector = document.getElementById("colors");
const clear = document.getElementById("clear");
const changesize = document.getElementById("changesize");
const eraser = document.getElementById("eraser");
const pencil = document.getElementById("pencil");
const settings = document.getElementById("settings");
const modal = document.querySelector(".modal");

//global variables
var gridDimensions = 16;
var currentcolor = color.value;
var defaultbgcolor = "#FFFFFF";
var isEraser = false;
var isPencil = true; //default

initgrid();

//functions
function initgrid()
{
    canvas.style.gridTemplateRows = `repeat(${gridDimensions},1fr)`;
    canvas.style.gridTemplateColumns = `repeat(${gridDimensions},1fr)`;
    //canvas.style.gridTemplateColumns = "repeat("+gridDimensions+",1fr)" 

    for(let i = 1 ; i <= gridDimensions ** 2 ; i++ )
    {
        let p = document.createElement("div");
        p.style.userSelect = "none";
        p.classList.add("withBorders")
        canvas.appendChild(p);
    }

    var pixels = document.querySelectorAll(".canvas div"); 
    pixels.forEach( (pixel) =>  pixel.addEventListener("mouseover", draw));
    pixels.forEach( (pixel) =>  pixel.addEventListener("click", draw));
}

function draw(e)
{
    if(e.buttons > 0 || e.type === "click" )
    {
        if(isPencil)
            e.target.style.backgroundColor = currentcolor;
        else if(isEraser)
        e.target.style.backgroundColor = defaultbgcolor;
    }
    
}

function clearcanvas()
{
    document.querySelectorAll(".canvas div").forEach( (pixel) => {
        pixel.style.backgroundColor = defaultbgcolor;
    } )
}

function changeSize(){

    var n = prompt("give the new number of pixels, must be smaller than 64");
    if(n == null || n == 0)
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

function erase() {
    isEraser = true;
    isPencil = false;
    eraser.classList.add("activebutton");
    pencil.classList.remove("activebutton");
}

function usePencil() {
    isEraser = false;
    isPencil = true;
    pencil.classList.add("activebutton");
    eraser.classList.remove("activebutton");
}

function opensettings(){
modal.style.display = "inline";
}

function closemodal() 
{
    if(modal.style.display === "inline")
        modal.style.display = "none";
}

function togglelines(e)
{
    if(document.querySelector(".canvas div").classList.toarray().includes("withBorders"))
    //need to fix this last bug and i'm done
        e.target.innerText = "toggle pixel borders: visible";
    else
        e.target.innerText = "toggle pixel borders: invisible";

    document.querySelectorAll(".canvas div").forEach( (pixel) => {pixel.classList.toggle("withBorders")} );
   
}

//event listeners
color.oninput = () => { currentcolor = color.value; }

clear.addEventListener("click",clearcanvas);

changesize.addEventListener("click",changeSize);

eraser.addEventListener("click", erase );
pencil.addEventListener("click", usePencil );

settings.addEventListener("click", opensettings)

document.getElementById("closemodal").addEventListener("click",closemodal);
document.getElementById("lines").addEventListener("click",togglelines)

