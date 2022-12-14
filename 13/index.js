import { INPUT, TEST } from './input.js'

const DIVIDERS = [[[2]],[[6]]]

function parseInput(input) {
  return input.split('\n').filter(line => line !== '').map(line=> JSON.parse(line));
}

function compareArrays(left, right) {
  const length = (left.length > right.length ? left.length : right.length);

  for (let i = 0; i < length; i++) {
    const ordered = comparePairs(left[i], right[i]);
    if (ordered !== 0) return ordered;
  }

  return 0;
}

function comparePairs(left, right) {
  if (!left && left !==0 ) return 1;
  if (!right && right !== 0) return -1;

  if (Array.isArray(left) || Array.isArray(right)) {
    const newLeft = Array.isArray(left) ? left : [left];
    const newRight = Array.isArray(right) ? right : [right];
    return compareArrays(newLeft, newRight);
  }

  if (left === right) return 0;
  return left > right ? -1 : 1;
}

function totalIndexes(input) {
  const indexes = [];

  let counter = 1;
  for (let i = 0; i < input.length - 2; i+=2) {
    const left = input[i];
    const right = input[i + 1];
    const ordered = comparePairs(left, right)

    if (ordered !== -1) indexes.push(counter);
    counter++;
  }
  return indexes.reduce((a,b) => a + b, 0);
}

function PartOneCalculate(input) {
  const parsed = parseInput(input);
  return totalIndexes(parsed);
}

function PartTwoCalculate(input) {
  const parsed = parseInput(input).concat(DIVIDERS);
  const sorted = parsed.sort((a,b) => comparePairs(b, a));
  const dividerOne = sorted.findIndex(line => comparePairs(line, DIVIDERS[0]) === 0) + 1;
  const dividerTwo = sorted.findIndex(line => comparePairs(line, DIVIDERS[1]) === 0) + 1;
  return dividerOne * dividerTwo;
}

export function DayThirteenPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("13-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The sum of the indices of the properly-ordered pairs is: ${result}!` : text.innerHTML = '';
}

export function DayThirteenPartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("13-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The decoder key for the distress signal is: ${result}!` : text.innerHTML = '';
}