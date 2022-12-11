import { INPUT, TEST } from './input.js'

function parseInput(input) {
  return input.split('\n')
    .map(line => line.split(' '))
      .map(line => {
        if (line.length == 2) line[1] = Number(line[1]);
        return line;
      });
}

/* 
  * Instructions are queued at the beginning of a cycle.
  * @noop will start and then finish at the end of a single cycle.
  * It has no effect.
  * @addX will start at the beginning of a cycle and finish at the
  * end of the next cycle.
  * It adds its value to X at this point.
*/
function executeProgram(input) {
  const signalStrength = new Map();
  let X = 1;
  let cycle = 1;

  for (let line of input) {
    signalStrength.set(cycle, X);

    // Execute the action.
    if (line.includes('noop')) {
      cycle++;
    }
    if (line.includes('addx')) {
      cycle++;
      signalStrength.set(cycle, X);
      cycle++;
      X += line[1];
      signalStrength.set(cycle, X);
    }
  }
  return signalStrength;
}

function totalSignalStrengths(signals) {
  let total = 0;
  let targetSignal = 20;

  signals.forEach((value, key) => {
    if (key === targetSignal) {
      total += (key * value);
      targetSignal += 40;
    }
  });

  return total;
}

function drawImage(signals) {
  const image = new Array(6).fill().map(e => e = new Array(40).fill('.'));
  let rowDiff = 0;

  signals.forEach((value, key) => {
    const pixels = [value - 1, value, value + 1];
    rowDiff = Math.floor((key - 1) / 40) * 40 + 1;

    if (key <= 40) {
      if (pixels.includes(key - 1)) image[0][key - 1] = '#';
    } else if (key <= 80) {
      if (pixels.includes(key - rowDiff)) image[1][key - rowDiff] = '#';
    } else if (key <= 120) {
      if (pixels.includes(key - rowDiff)) image[2][key - rowDiff] = '#';
    } else if (key <= 160) {
      if (pixels.includes(key - rowDiff)) image[3][key - rowDiff] = '#';
    } else if (key <= 200) {
      if (pixels.includes(key - rowDiff)) image[4][key - rowDiff] = '#';
    } else if (key <= 240) {
      if (pixels.includes(key - rowDiff)) image[5][key - rowDiff] = '#';
    }
  });

  return image.map(row => row.join('')).join('\n');
}

function PartOneCalculate(input) {
  const parsed = parseInput(input);
  const signals = executeProgram(parsed);
  return totalSignalStrengths(signals);
}

function PartTwoCalculate(input) {
  const parsed = parseInput(input);
  const signals = executeProgram(parsed);
  return drawImage(signals);
}

export function DayTenPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("10-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The sum of the signal strengths is: ${result}!` : text.innerHTML = '';
}

export function DayTenPartTwo() {
  const result = PartTwoCalculate(INPUT);
  // --> Log displays arrangement of letters.
  // console.log(result)
  
  const text = document.getElementById("10-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The device spells the letters: PHLHJGZA` : text.innerHTML = '';
}