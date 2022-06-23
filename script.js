function createGrid(rowCells, colCells){ //function to create a grid based on row and col values
    for(let r = 0; r < rowCells; r++){
        const row = document.createElement('div');
        row.className = 'row';
        document.querySelector('#grid').appendChild(row);
        for(let c = 0; c < colCells; c++){
            const cell = document.createElement('div');
            cell.className = 'cell';
            row.appendChild(cell);
        }
    }
}

createGrid(20,20);