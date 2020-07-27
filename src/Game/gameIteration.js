let gameGrid;

function gameIteration(coordinates, grid){
  gameGrid = grid
  let nextIteration = gameGrid.slice();
  for(let row = 0; row < gameGrid.length; row++){
    for(let column = 0; column < gameGrid[0].length; column++){
      nextIteration[row][column] = calculateCellState(row, column)
    }
  }
}

function calculateCellState(row, column){
  let cellValue = gameGrid[row][column];
}

function neighborsCoordinate(row, column){
  const biases = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]];
  let neighbors = [];
  for(let bias of biases){
    let neighbor = sumOfArray([row, column], bias);
    if(neighbor[0] < 0){
      neighbor[0] = gameGrid[0].length - 1
    } else if(neighbor[0] > gameGrid[0].length - 1){
      neighbor[0] = 0
    }
    if(neighbor[1] < 0){
      neighbor[1] = gameGrid.length - 1
    } else if(neighbor[1] > gameGrid.length - 1){
      neighbor[1] = 0
    }
    neighbors.push(neighbor)
  }
  return neighbors
}

function sumOfArray(array1, array2){
  if(array1.length !== array2.length){
    throw 'Two arrays should have equal length'
  }
  let result = [];
  for(let i = 0; i < array1.length; i++){
    result.push(array1[i] + array2[i])
  }
  return result
}

export default gameIteration;