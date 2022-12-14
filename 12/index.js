import { INPUT, TEST } from './input.js'
import Queue from '../lib/queue.js'

function parseInput(input) {
  return input.split('\n').map(line => line.split(''));
}

const ALPHABET = Array.from(Array(26)).map((e, i) => i + 97).map((x) => String.fromCharCode(x));
const START = 'S';
const END = 'E';

function findPoint(map, point) {
  for (let i = 0; i < map.length; i++) {
    const index = map[i].indexOf(point);
    if (index !== -1) return [i, index];
  }
}

// function navigate(map, index = [0,0]) {
//   let row = index[0];
//   let cell = index[1];
//   let result = '';

//   if (map[row][cell] === END) return result;

//   const currentValue = ALPHABET.indexOf(map[row][cell]);



//   if (cell < map[row].length - 1 && canMove(currentValue, map[row][cell+1])) {
//     result = 'R';
//     return result + navigate(map, [row, (cell + 1)]);
//   }
//   if (row < map.length - 1 && canMove(currentValue, map[row+1][cell])) {
//     result = 'D';
//     return result + navigate(map, [(row + 1), cell]);
//   }
//   if (row > 0 && canMove(currentValue, map[row - 1][cell])) {
//     result = 'U';
//     return result + navigate(map, [(row - 1), cell]);
//   }
//   if (cell > 0 && canMove(currentValue, map[row][cell-1])) {
//     result = 'L';
//     return result + navigate(map, [row, (cell -1)]);
//   }
// }

function canMove(current, destination) {
  
  if (current === "S") current = 'a';
  if (current === "E") current = 'z';
  if ((ALPHABET.indexOf(destination) - ALPHABET.indexOf(current)) >= 2) return false;
  return true;
}

function navigate(map) {
  const start = findPoint(map, START);
  const end = findPoint(map, END);

  const nodes = new Queue()
  nodes.enqueue(start);
  const visited = [];
  visited.add(start.join('-'));

  while (!nodes.isEmpty()) {
    const location = nodes.dequeue();

    const possibilities = [];
    const row = location[0];
    const cell = location[1];
    
    if (cell < map[row].length - 1) {
      if (canMove(map[row][cell], map[row][cell+1]) && !visited.has([[row],[cell+1]].join('-'))) {
        possibilities.push([row, (cell + 1)]);
      }
    }
    if (row < map.length - 1) {
      if (canMove(map[row][cell], map[row+1][cell]) && !visited.has([[row+1],[cell]].join('-'))) {
        possibilities.push([(row + 1), cell]);
      }
    }
    if (row > 0) {
      if (canMove(map[row][cell], map[row - 1][cell]) && !visited.has([[row - 1],[cell]].join('-'))) {
        possibilities.push([(row - 1), cell]);
      }
    }
    if (cell > 0) {
      if (canMove(map[row][cell], map[row][cell-1]) && !visited.has([[row],[cell-1]].join('-'))) {
        possibilities.push([row, (cell -1)]);
      }
    }

    possibilities.forEach(node => {
      nodes.enqueue(node);
      visited.add(node.join('-'));
    })
  }
  console.log(visited)

  return visited.size;
}

function PartOneCalculate(input) {
  const map = parseInput(input);
  
  const result = navigate(map);
  console.log(result);
}

function PartTwoCalculate(input) {

}

export function DayTwelvePartOne() {
  const result = PartOneCalculate(TEST);

  const text = document.getElementById("12-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `${result}` : text.innerHTML = '';
}

export function DayTwelvePartTwo() {
  const result = PartTwoCalculate();
  
  const text = document.getElementById("12-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `${result}` : text.innerHTML = '';
}