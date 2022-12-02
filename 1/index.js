import { INPUT } from './input.js'

function parseInput(input) {
  const result = [];
  const arr = input.split('\n');
  let subArr = [];

  arr.forEach(str => {
    if (str === '') {
      result.push(subArr);
      subArr = [];
    } else {
      subArr.push(Number(str));
    }
  });
  return result;
}

function totalCalories(input) {
  return input.map(arr => arr.reduce((a,b) => a + b, 0)).sort((a, b) => b - a);
}

function PartOneCalculate(arr) {
  return arr[0];
}

function PartTwoCalculate(arr) {
  return [arr[0], arr[1], arr[2]].reduce((a,b) => a + b, 0);
}

export function DayOnePartOne() {
  const arr = totalCalories(parseInput(INPUT));
  const result = PartOneCalculate(arr);

  const text = document.getElementById("1-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The top elf is carrying ${result} calories!` : text.innerHTML = '';
}

export function DayOnePartTwo() {
  const arr = totalCalories(parseInput(INPUT));
  const total = PartTwoCalculate(arr);
  
  const text = document.getElementById("1-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The top three elves are carrying ${total} calories in total!` : text.innerHTML = '';
}