const GRID_WIDTH = document.querySelector('#grid').offsetWidth;
const resetButton = document.querySelector('#reset-button').addEventListener('click', reset);

function createGrid(size){ //function to create a grid based on row and col values
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
            cell.addEventListener('mouseover', function(e){
                e.target.style.backgroundColor = 'black';
            });
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
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
    createGrid(16)
}

document.querySelector('body').addEventListener('load', createGrid(50));

console.log(GRID_WIDTH);

