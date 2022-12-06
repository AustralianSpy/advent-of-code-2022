import { INPUT } from './input.js'
import Queue from '../lib/queue.js'

function parseInput(input) {
  return input.split(''); // Split into an array for more comfortable iteration.
}

function checkDuplication(size, sequence) {
  return (new Set(sequence).size !== size);
}

function findStart(size, sequence) {
  const signal = new Queue();
  let count = 0;

  for (let i = 0; i < size; i++) {
    signal.enqueue(sequence[i]);
  }

  for (let i = size; i <= sequence.length; i++) {
    signal.dequeue();
    signal.enqueue(sequence[i]);
    const hasDuplicates = checkDuplication(size, signal.flatten());
    if (!hasDuplicates) {
      count = i + 1;
      break;
    }
  }
  return count;
}

function PartOneCalculate(input) {
  return findStart(4, parseInput(input));
}

function PartTwoCalculate(input) {
  const signal = findStart(4, parseInput(input));
  return signal + findStart(14, parseInput(input).slice(signal));
}

export function DaySixPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("6-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The signal packet starts at character: ${result}!` : text.innerHTML = '';
}

export function DaySixPartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("6-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The message starts at character: ${result}!` : text.innerHTML = '';
}