import { INPUT } from './input.js'

function parseInput(input) {
  return input.split('\n')
    .map(e => e.split(',')
      .map(f => f.split('-')));
}

function makeRanges(input) {
  const start = Number(input[0]);
  const end = Number(input[1]);
  const length = end - start + 1;

  if (length === 1) return [start];
  return Array.from(Array(length)).map((e, i) => i + start);
}

function fullOverlap(a, b) {
  const first = makeRanges(a);
  const second = makeRanges(b);

  let isOverlap = 0;

  if (second.includes(Number(a[0])) && second.includes(Number(a[1]))) {
    isOverlap = 1;
  }
  if (first.includes(Number(b[0])) && first.includes(Number(b[1]))) {
    isOverlap = 1;
  }

  return isOverlap;
}

function partialOverlap(a, b) {
  const first = makeRanges(a);
  const second = makeRanges(b);

  let isOverlap = 0;

  if (second.includes(Number(a[0])) || second.includes(Number(a[1]))) {
    isOverlap = 1;
  }
  if (first.includes(Number(b[0])) || first.includes(Number(b[1]))) {
    isOverlap = 1;
  }

  return isOverlap;
}

function calculateTotals(input, comparison) {
  const firstPair = input[0]
  const base = comparison(firstPair[0], firstPair[1]) ? 1 : 0;
  
  return input.reduce((a,b) => a + comparison(b[0], b[1]), base);
}

function PartOneCalculate(arr) {
  const parsed = parseInput(arr);
  const total = calculateTotals(parsed, fullOverlap);
  return total;
}

function PartTwoCalculate(arr) {
  const parsed = parseInput(arr);
  const total = calculateTotals(parsed, partialOverlap);
  return total;
}

export function DayFourPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("4-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `${result} pairs fully contain the other!` : text.innerHTML = '';
}

export function DayFourPartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("4-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `${result} pairs have partial overlap!` : text.innerHTML = '';
}