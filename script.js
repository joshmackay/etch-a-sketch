const GRID_WIDTH = document.querySelector('#grid').offsetWidth;

const DEFAULT_GRID_SIZE = 16;
const DEFAULT_BG_COLOUR = 'hsl(0,100%,100%)';
let currentGridSize = 16;
const clearButton = document.querySelector('#clear-button').addEventListener('click', function(){createGrid(currentGridSize)});
const setSizeButton = document.querySelector('#size-button').addEventListener('click', setSize);
const defaultButton = document.querySelector('#default-button').addEventListener('click', setDefault);
const rgbButton = document.querySelector('#rgb-button').addEventListener('click', rgbMode);
const shadingButton = document.querySelector('#shading').addEventListener('click', shadingMode);
const lightenButton = document.querySelector('#lighten').addEventListener('click', lightenMode);
const eraseButton = document.querySelector('#erase-button').addEventListener('click', eraseMode);
const colourPicker = document.querySelector('#color').addEventListener('change', colourPickerValue);

let bgColour = 'hsl(0,100%,100%)';
let rgbOn = false;
let darkenOn = false;
let lightenOn = false;
let eraseOn = false;
let currentPaintColour = `hsl(0,0%, 0%)`;
let functionMode = 'default';


function createGrid(size){ //function to create a grid based on row and col values
    clear();
    for(let r = 0; r < size; r++){
        const row = document.createElement('div');
        row.className = 'row';
        row.setAttribute('draggable','false');
        for(let c = 0; c < size; c++){
            
            let cellWidth = ((GRID_WIDTH)/size);
            let cellHeight = ((GRID_WIDTH)/size);
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellHeight + 'px';
            cell.style.backgroundColor = bgColour;
            if(r !== 0){
                cell.classList.add('cell-border-top');
            }
            if(c !== 0){
                cell.classList.add('cell-border-left')
            }
            cell.setAttribute('draggable', 'false');
            cell.addEventListener('mousedown', mouseClick);
            cell.addEventListener('mouseenter', mouseDrag);
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
    }
}

function initialise(){
    currentPaintColour = 'hsl(0,0%,0%)';
    rgbOn = false;
    createGrid(DEFAULT_GRID_SIZE);
}

function setDefault(){
    currentPaintColour = 'hsl(0,0%,0%)';
    rgbOn = false;
    darkenOn = false;
    lightenOn = false;
    eraseOn = false;
}

function mouseClick(e){
    e.preventDefault();
    if(rgbOn){
        e.target.style.backgroundColor = setRGBColour();
    } else if(darkenOn){
        let selectedCellColourRGB = e.target.style.backgroundColor;
        e.target.style.backgroundColor = shadeCell(selectedCellColourRGB);  
    } else if(lightenOn){
        let selectedCellColourRGB = e.target.style.backgroundColor;
        e.target.style.backgroundColor = lightenCell(selectedCellColourRGB);
    } else if(eraseOn){
        let selectedCellColourRGB = e.target.style.backgroundColor;
        e.target.style.backgroundColor = lightenCell(selectedCellColourRGB);
    } else{
        e.target.style.backgroundColor = currentPaintColour;
        console.log(e.target.style.backgroundColor);
        
    } 
}

function mouseDrag(e){
    if(e.buttons > 0){
        if(rgbOn){
            e.target.style.backgroundColor = setRGBColour();     
        } 
        else if(darkenOn){
            let selectedCellColourRGB = e.target.style.backgroundColor;
            e.target.style.backgroundColor = shadeCell(selectedCellColourRGB);  
        }
        else if(lightenOn){
            let selectedCellColourRGB = e.target.style.backgroundColor;
            e.target.style.backgroundColor = lightenCell(selectedCellColourRGB);
        } else if(eraseOn){
            e.target.style.backgroundColor = currentPaintColour;
        } else e.target.style.backgroundColor = currentPaintColour;
    }
}

function rgbMode(){
    if(rgbOn){
        rgbOn = false;
        currentPaintColour = 'hsl(0,0%,0%)';
    }else {
        lightenOn = false;
        rgbOn = true;
        darkenOn = false;
        eraseOn = false;
    }
}

function shadingMode(){
    if(darkenOn){
        darkenOn = false
    }
    else {
        darkenOn = true;
        rgbOn = false;
        lightenOn = false;
        raseOn = false;
    }
}

function lightenMode(){
    if(lightenOn){
        lightenOn = false
    }
    else {
        lightenOn = true;
        rgbOn = false;
        darkenOn = false;
        eraseOn = false;
    }
}

function eraseMode(){
    if(eraseOn){
        eraseOn = false;
    } else{
        lightenOn = false;
        rgbOn = false;
        darkenOn = false;
        eraseOn = true;
        currentPaintColour = 'rgb(255,255,255';
    }
}

function setRGBColour(){
    let randomHue = Math.floor(Math.random()*360);
    currentPaintColour = `hsl(${randomHue}, 100%, 50%)`;
    return currentPaintColour;
}



function setSize(){
    const size = prompt('Set a resolution up to 100');
    if(size != null && size > 0 && size < 101){
        currentGridSize = size;
        createGrid(size);
    }
}

function colourPickerValue(e){
    setDefault();
    currentPaintColour = e.target.value;
}

function clear(){
    let existingElements = document.querySelector('#grid');
    existingElements.style.backgroundColor = bgColour;
    existingElements.replaceChildren();
    
}

function shadeCell(rgb){
    let selectedCellColourHSL = convertRGBToHSL(rgb);
    let currentLightness = Number(selectedCellColourHSL[2]);
    let newBG = '';
    if(currentLightness === 0){return newBG = 'rgb(0,0,0)'}
    else{
        let newLightness = currentLightness - 5;
        return `hsl(${Math.round(selectedCellColourHSL[0])},${Math.round(selectedCellColourHSL[1])}%,${Math.round(newLightness)}%)`;
    }
}

function lightenCell(rgb){
    let selectedCellColourHSL = convertRGBToHSL(rgb);
    let currentLightness = Number(selectedCellColourHSL[2]);
    let newBG = '';
    if(currentLightness === 100){return newBG = 'rgb(255,255,255)'}
    else{
        let newLightness = currentLightness + 5;
        return `hsl(${Math.round(selectedCellColourHSL[0])},${Math.round(selectedCellColourHSL[1])}%,${Math.round(newLightness)}%)`;
    }
}

function convertRGBToHSL(rgb){
    let rgbValues = stripRGB(rgb);
    let hslValues = RGBToHSL(Math.round(rgbValues[0]),Math.round(rgbValues[1]),Math.round(rgbValues[2]));
    return hslValues;
}

function stripRGB(rgb){
    let pattern = /([0-9]{1,3})/g;
    let result = rgb.match(pattern);
    return result;
}

function stripHSL(hsl){
    let pattern = /[0-9]{1,3}/g;
    let result = hsl.match(pattern);
    let h = Number(result[0]);
    let s = Number(result[1]);
    let l = Number(result[2]);
    console.log(`${h}, ${s}, ${l}`);
    return l;
}

function RGBToHSL(r, g, b){ //https://www.30secondsofcode.org/js/s/rgb-to-hsl
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
        ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
        : 0;
    return [
        Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
    ];
}

function HSLToRGB(h,s,l) {
// Must be fractions of 1
s /= 100;
l /= 100;

let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c/2,
    r = 0,
    g = 0,
    b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;  
      } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
      } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
      } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
      } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
      } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
    
      return "rgb(" + r + "," + g + "," + b + ")";
}


window.addEventListener('load', initialise);

stripHSL('hsl(100,200,20%)');