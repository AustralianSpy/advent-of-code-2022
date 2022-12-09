// import { INPUT } from './input.js'

function parseInput(input) {
  return input.split('\n');
}

function PartOneCalculate(input) {

}

function PartTwoCalculate(input) {

}

export function DayOnePartOne() {
  const result = PartOneCalculate();

  const text = document.getElementById("-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `${result}` : text.innerHTML = '';
}

export function DayOnePartTwo() {
  const result = PartTwoCalculate();
  
  const text = document.getElementById("-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `${result}` : text.innerHTML = '';
}