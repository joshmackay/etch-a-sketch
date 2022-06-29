const GRID_WIDTH = document.querySelector('#grid').offsetWidth;
const DEFAULT_GRID_SIZE = 16;
let currentGridSize = 16;
const clearButton = document.querySelector('#clear-button').addEventListener('click', function(){createGrid(currentGridSize)});
const setSizeButton = document.querySelector('#size-button').addEventListener('click', setSize);
const defaultButton = document.querySelector('#default-button').addEventListener('click', setDefault);
const rgbButton = document.querySelector('#rgb-button').addEventListener('click', rgbMode);
const transparentButton = document.querySelector('#transparent').addEventListener('click', transparentMode);

let rgbOn = false;
let transparentOn = false;
let eraseMode = false;
let currentColour = `hsl(0,0,0,1)`;
let functionMode = 'default';


function createGrid(size){ //function to create a grid based on row and col values
    clear();
    for(let r = 0; r < size; r++){
        const row = document.createElement('div');
        row.className = 'row';
        
        for(let c = 0; c < size; c++){
            let cellWidth = (GRID_WIDTH/size);
            let cellHeight = (GRID_WIDTH/size);
            const cell = document.createElement('div');
            cell.classList.add = 'cell';
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellHeight + 'px';
            cell.addEventListener('mousedown', mouseClick);
            cell.addEventListener('mouseenter', mouseDrag);
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
    }
}

function initialise(){
    console.log('in');
    setDefault();
    createGrid(currentGridSize);
}

function mouseClick(e){
    if(rgbOn){e.target.style.backgroundColor = rgbMode}
    e.target.style.backgroundColor = `${currentColour}`;

}

function mouseDrag(e){
    if(e.buttons > 0){
        if(rgbOn === true){
            currentColour = setRGBColour();
            e.target.style.backgroundColor = currentColour;     
        } 
        else e.target.style.backgroundColor = currentColour;
    }
}

function setDefault(){
    currentColour = 'black';
    createGrid(DEFAULT_GRID_SIZE);

}

function rgbMode(){
    if(rgbOn){
        rgbOn = false;
    }else rgbOn = true;
}

function setRGBColour(){
    let randomHue = Math.floor(Math.random()*360);
    currentColour = `hsl(${randomHue}, 100%, 50%)`;
    return currentColour;
}

function transparentMode(){
    if(transparentOn){transparentOn = false}else transparentOn = true;
}



function setSize(){
    const size = prompt('Set a resolution up to 100');
    if(size != null && size > 0 && size < 101){
        currentGridSize = size;
        createGrid(size);
    }
}

function changeColour(){
    console.log('fired');
}

function getRandomRGB(){
    return `rgb(${Math.floor( Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
    
}

function clear(){
    let existingElements = document.querySelector('#grid');
    existingElements.replaceChildren();
    
}
console.log('front');
window.addEventListener('load', initialise);
console.log('back');



