const GRID_WIDTH = document.querySelector('#grid').offsetWidth;
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BG_COLOUR = 'rgba(255,255,255,1)';
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
            let cellWidth = ((GRID_WIDTH-2)/size);
            let cellHeight = ((GRID_WIDTH-2)/size);
            const cell = document.createElement('div');
            cell.classList.add = 'cell';
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellHeight + 'px';
            cell.style.backgroundColor = 'rgba(255,255,255,0)'
            cell.addEventListener('mousedown', mouseClick);
            cell.addEventListener('mouseenter', mouseDrag);
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
    }
}

function initialise(){
    currentColour = 'rgba(0,0,0,1)';
    rgbOn = false;
    createGrid(DEFAULT_GRID_SIZE);
}

function setDefault(){
    currentColour = 'rgba(0,0,0,1)';
    rgbOn = false;
}

function mouseClick(e){
    if(rgbOn){
        e.target.style.backgroundColor = setRGBColour();
    } else if(transparentOn){
        let alpha = getAlphaValue(e.target.style.backgroundColor);
        if(alpha < 1){
            let newBG = increaseTrans(e.target.style.backgroundColor);
            console.log(newBG)
            e.target.style.backgroundColor = newBG;
        }
    } else{
        e.target.style.backgroundColor = 'hsl(0,0%,0%,1)';
    } 
}

function mouseDrag(e){
    if(e.buttons > 0){
        if(rgbOn){
            currentColour = setRGBColour();
            e.target.style.backgroundColor = currentColour;     
        } 
        else if(transparentOn){
            let alpha = getAlphaValue(e.target.style.backgroundColor);
            if(alpha < 1){
                let newBG = increaseTrans(e.target.style.backgroundColor);
                console.log(newBG)
                e.target.style.backgroundColor = newBG;
            }
        }
        else e.target.style.backgroundColor = 'hsl(0,0%,0%,1)';
    }
}

function rgbMode(){
    if(rgbOn){
        rgbOn = false;
        currentColour = 'hsl(0,0,0,1)';
    }else rgbOn = true;
}

function setRGBColour(){
    let randomHue = Math.floor(Math.random()*360);
    currentColour = `hsl(${randomHue}, 100%, 50%)`;
    return currentColour;
}

function transparentMode(){
    if(transparentOn){
        transparentOn = false
    }
    else {
        transparentOn = true;
        rgbOn = false;}
}

function getAlphaValue(rgb){
    return parseFloat(rgb.split(',')[3]);
}

function increaseTrans(value){
    let before = parseFloat(value.split(',')[3]);
    let after = `rgba(0,0,0, ${before + .1})`;
    return after;
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