const GRID_WIDTH = document.querySelector('#grid').offsetWidth;
let currentGridSize = 16;
const resetButton = document.querySelector('#reset-button').addEventListener('click', function(){createGrid(currentGridSize)});
const setSizeButton = document.querySelector('#size-button').addEventListener('click', setSize);
let mode = 'defualt';


function createGrid(size){ //function to create a grid based on row and col values
    reset();
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
            cell.addEventListener('mousedown', function(e){
                e.target.style.backgroundColor = 'black';
            });
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
    }
}

function colourMode(){
    switch:
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

function reset(){
    let existingElements = document.querySelector('#grid');
    existingElements.replaceChildren();
    
}

document.querySelector('body').addEventListener('load', createGrid(16));



