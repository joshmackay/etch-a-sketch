function createGrid(size){ //function to create a grid based on row and col values
    for(let r = 0; r < size; r++){
        const row = document.createElement('div');
        row.className = 'row';
        
        for(let c = 0; c < size; c++){
            let cellWidth = (500/size);
            let cellHeight = (500/size);
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.style.backgroundColor = `rgb(${Math.floor( Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
            cell.style.width = cellWidth + 'px';
            cell.style.height = cellHeight + 'px';
            row.appendChild(cell);
        }
        document.querySelector('#grid').appendChild(row);
    }
}

createGrid(100);