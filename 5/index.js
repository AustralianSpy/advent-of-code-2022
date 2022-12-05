import { INPUT, PROCEDURES } from './input.js'

function parseProcedures(input) {
  const NUM_INDEXES = [1, 3, 5];

  // returns: [quantity, at row, to row]
  return input.split('\n')
    .map(line => line.split(' ')
      .filter((word, i) => (NUM_INDEXES.includes(i)))
        .map(num => Number(num)));
}

function moveCratesSolo(procedures, input) {
  const crates = input.map(arr => arr.slice())

  procedures.forEach(row => {
    const quant = row[0];
    const start = row[1] - 1;
    const end = row[2] - 1;

    for (let i = 1; i <= quant; i++) {
      const stack = crates[start];
      const moving = stack.pop();
      crates[end].push(moving);
    }
  });
  return crates;
}

function moveCratesBunch(procedures, input) {
  const crates = input.map(arr => arr.slice())

  procedures.forEach(row => {
    const quant = row[0];
    const start = row[1] - 1;
    const end = row[2] - 1;

    const stack = crates[start];
    const moving = stack.splice(-quant);
    crates[end].push(...moving);
  });
  return crates;
}

function findCratesAt(crates, index = 0) {
  // defaults to top with no argument passed
  const result = [];

  if (index === 0) {
    crates.forEach(stack => {
      if (stack.length > 0) {
        const crate = stack.pop();
        result.push(crate);
      };
    });
  } else {
    crates.forEach(stack => {
      const crate = stack[index + 1];
      result.push(crate[0]);
    });
  }
  
  return result;
}

function PartOneCalculate() {
  const procedures = parseProcedures(PROCEDURES);
  const moved = moveCratesSolo(procedures, INPUT);
  return findCratesAt(moved).join('');
}

function PartTwoCalculate() {
  const procedures = parseProcedures(PROCEDURES);
  const moved = moveCratesBunch(procedures, INPUT);
  return findCratesAt(moved).join('');
}

export function DayFivePartOne() {
  const result = PartOneCalculate();

  const text = document.getElementById("5-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `Crates ${result} are on top!` : text.innerHTML = '';
}

export function DayFivePartTwo() {
  const result = PartTwoCalculate();
  
  const text = document.getElementById("5-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `Crates ${result} are on top!` : text.innerHTML = '';
}