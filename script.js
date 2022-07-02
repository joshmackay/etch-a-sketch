const GRID_WIDTH = document.querySelector('#grid').offsetWidth;
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BG_COLOUR = 'rgba(255,255,255,1)';
let currentGridSize = 16;
const clearButton = document.querySelector('#clear-button').addEventListener('click', function(){createGrid(currentGridSize)});
const setSizeButton = document.querySelector('#size-button').addEventListener('click', setSize);
const defaultButton = document.querySelector('#default-button').addEventListener('click', setDefault);
const rgbButton = document.querySelector('#rgb-button').addEventListener('click', rgbMode);
const transparentButton = document.querySelector('#transparent').addEventListener('click', transparentMode);

let bgColour = '#ffffff';
let rgbOn = false;
let transparentOn = false;
let eraseMode = false;
let currentPaintColour = `#000000`;
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
            cell.setAttribute('draggable', 'false');
            //cell.style.backgroundColor = 'transparent';
            cell.addEventListener('mousedown', mouseClick);
            cell.addEventListener('mouseenter', mouseDrag);
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
    }
}

function initialise(){
    currentPaintColour = '#000000';
    rgbOn = false;
    createGrid(DEFAULT_GRID_SIZE);
}

function setDefault(){
    currentPaintColour = '#000000';
    rgbOn = false;
    transparentOn = false;
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
        e.target.style.backgroundColor = currentPaintColour;
        console.log('clilc');
    } 
}

function mouseDrag(e){
    if(e.buttons > 0){
        if(rgbOn){
            e.target.style.backgroundColor = setRGBColour();     
        } 
        // else if(transparentOn){
        //     let alpha = getAlphaValue(e.target.style.backgroundColor);
        //     if(alpha < 1){
        //         let newBG = increaseTrans(e.target.style.backgroundColor);
        //         console.log(newBG)
        //         e.target.style.backgroundColor = newBG;
        //     }
        // }
        else e.target.style.backgroundColor = currentPaintColour;
        console.log('drag');
    }
}

function rgbMode(){
    if(rgbOn){
        rgbOn = false;
        currentPaintColour = 'hsl(0,0,0,1)';
    }else rgbOn = true;
}

function setRGBColour(){
    let randomHue = Math.floor(Math.random()*360);
    currentPaintColour = `hsl(${randomHue}, 100%, 50%)`;
    return currentPaintColour;
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

function clear(){
    let existingElements = document.querySelector('#grid');
    existingElements.style.backgroundColor = bgColour;
    existingElements.replaceChildren();
    
}

// function HSLtoHEX(h,s,l){
//     s /= 100;
//     l /= 100;
//     const k = n => (n + h / 30) % 12;
//     const a = s * Math.min(l, 1 - l);
//     const f = n =>
//         l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
//     const r = Math.round(255 * f(0)); 
//     const g = Math.round(255 * f(8)); 
//     const b = Math.round(255 * f(4));

//     r = r.toString(16);
//     g = g.toString(16);
//     b = b.toString(16);

//     if (r.length == 1)
//         r = "0" + r;
//     if (g.length == 1)
//         g = "0" + g;
//     if (b.length == 1)
//         b = "0" + b;

//     return "#" + r + g + b;

// }

window.addEventListener('load', initialise);
