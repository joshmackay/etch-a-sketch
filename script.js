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
        row.setAttribute('draggable','false');
        for(let c = 0; c < size; c++){
            let cellWidth = ((GRID_WIDTH-2)/size);
            let cellHeight = ((GRID_WIDTH-2)/size);
            const cell = document.createElement('div');
            cell.classList.add = 'cell';
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellHeight + 'px';
            cell.setAttribute('draggable', 'false');
            cell.style.backgroundColor = 'transparent';
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
    e.preventDefault();
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
        else if(transparentOn){
            if(e.target.style.backgroundColor === 'transparent' || e.target.style.backgroundColor === ' '){
                e.target.style.backgroundColor = '#ffffff';
            } 
            let alpha = getAlphaValue(e.target.style.backgroundColor);
            if(alpha < 1){
                let newBG = increaseTrans(e.target.style.backgroundColor);
                console.log(newBG)
                e.target.style.backgroundColor = newBG;
            } 
            
            
        }
        else e.target.style.backgroundColor = currentPaintColour;
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

function ColorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

// function HSLtoHEX(h,s,l){
//     s /= 100;
//     l /= 100;
//     const k = n => (n + h / 30) % 12;
//     const a = s * Math.min(l, 1 - l);
//     const f = n =>
//         l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
//     let r = Math.round(255 * f(0)); 
//     let g = Math.round(255 * f(8)); 
//     let b = Math.round(255 * f(4));

//     r = r.toString(16);
//     g = g.toString(16);
//     b = b.toString(16);

//     if (r.length == 1)
//         r = "0" + r;
//     if (g.length == 1)
//         g = "0" + g;
//     if (b.length == 1)
//         b = "0" + b;
//     console.log("#" + r + g + b);
//     HEXtoHSL("#" + r + g + b);
//     //return "#" + r + g + b;

// }

function hslToHex(h, s, l) {//javascript by Witty Wildebeest on Apr 29 2021 Comment
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    console.log(`#${f(0)}${f(8)}${f(4)}`);
  }

function stripHSL(hsl){
    let pattern = /[0-9]{1,3}/g;
    let result = hsl.match(pattern);
    let h = Number(result[0]);
    let s = Number(result[1]);
    let l = Number(result[2]);
    console.log(hslToHex(h,s,l) + 'yes');
    
}
stripHSL('hsl(100,100,50%)');

function HEXtoHSL(hex) {//https://www.html-code-generator.com/javascript/color-converter-script
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
        return null;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);
    console.log(h + ' ' + s + ' ' + l);
    //return 'hsl(' + h + ' ' + s + ' ' + l + ')';
}

window.addEventListener('load', initialise);

