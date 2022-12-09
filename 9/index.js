import { INPUT } from './input.js'

function parseInput(input) {
  return input
    .split('\n')
    .map(line => line.split(' '))
    .map(line => line = { dir: line[0], num: Number(line[1]) });
}

function PartOneCalculate(input) {
  const parsed = parseInput(input);
}

function PartTwoCalculate(input) {

}

export function DayNinePartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("9-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `${result}` : text.innerHTML = '';
}

export function DayNinePartTwo() {
  const result = PartTwoCalculate();
  
  const text = document.getElementById("9-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `${result}` : text.innerHTML = '';
}