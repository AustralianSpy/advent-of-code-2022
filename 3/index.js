import { INPUT } from './input.js'

function parseInput(input) {
  return input.split('\n');
}

function splitCompartments(input) {
  const result = [];
  input.forEach(line => {
    const mid = line.length / 2;
    const compartment1 = line.slice(0, mid).split('');
    const compartment2 = line.slice(mid).split('');
    result.push([compartment1, compartment2])
  });
  return result;
}

function findUnique(input) {
  const result = [];
  input.forEach(line => {
    const firstUnique = new Set;
    const secondUnique = new Set;

    line.forEach((compartment, i) => {
      compartment.forEach(char => i === 0 ?
        firstUnique.add(char) :
        secondUnique.add(char));
    }); 
    result.push([firstUnique, secondUnique]);
  });
  return result;
}

function findSoloDuplicates(input) {
  const result = [];

  input.forEach(line => {
    line[0].forEach(char => {
      if (line[1].has(char)) result.push(char);
    });
  });

  return result;
}

function findTrioDuplicates(input) {
  const result = [];
  const makeSet = (line) => new Set([...line[0], ...line[1]]);

  for (let i = 0; i < input.length; i = i+3) {
    const first = makeSet(input[i]);
    const second = makeSet(input[i+1]);
    const third = makeSet(input[i+2]);

    first.forEach(char => {
      if (second.has(char) && third.has(char)) {
        result.push(char);
      }
    });
  }
  return result;
}

function findTotal(input) {
  const uppercase = Array.from(Array(26)).map((e, i) => i + 65);
  const lowercase = Array.from(Array(26)).map((e, i) => i + 97);
  const alphabet = [...lowercase.map((x) => String.fromCharCode(x)), ...uppercase.map((x) => String.fromCharCode(x))];
  
  return input.reduce((a,b) => a + alphabet.indexOf(b) + 1, 0);
}

function PartOneCalculate(arr) {
  const parsed = parseInput(arr);
  const split = splitCompartments(parsed);
  const unique = findUnique(split);
  const letters = findSoloDuplicates(unique);
  return findTotal(letters);
}

function PartTwoCalculate(arr) {
  const parsed = parseInput(arr);
  const split = splitCompartments(parsed);
  const unique = findTrioDuplicates(split);
  return findTotal(unique);
}

export function DayThreePartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("3-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The total of the items' priorities is ${result}!` : text.innerHTML = '';
}

export function DayThreePartTwo() {
  const result = PartTwoCalculate(INPUT);

  const text = document.getElementById("3-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The total of the 3 elves' items' priorities is ${result}!` : text.innerHTML = '';
}