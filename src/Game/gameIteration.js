import {cloneDeep} from  'lodash';


let gameGrid;

function gameIteration(grid){
  gameGrid = cloneDeep(grid)
  let nextIteration = cloneDeep(gameGrid);
  for(let row = 0; row < gameGrid.length; row++){
    for(let column = 0; column < gameGrid[0].length; column++){
      nextIteration[row][column] = calculateCellState(row, column)
    }
  }
  return nextIteration
}

function calculateCellState(row, column){
  let cellValue = gameGrid[row][column];
  let neighborsSum = livingNeighbors(neighborsCoordinate(row, column));
  let result = 0;
  if(cellValue){
    if(neighborsSum === 2 || neighborsSum === 3){
      result = 1
    } else {
      result = 0
    }
  } else {
    if(neighborsSum === 3){
      result = 1
    } else {
      result = 0
    }
  }
  return result
}

function livingNeighbors(neighborsList){
  let result = 0;
  for(let neighbor of neighborsList){
    let [row, column] = neighbor;
    let cellValue = gameGrid[row][column];
    result += cellValue
  }
  return result
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
    throw new Error('Two arrays should have equal length')
  }
  let result = [];
  for(let i = 0; i < array1.length; i++){
    result.push(array1[i] + array2[i])
  }
  return result
}

export default gameIteration;