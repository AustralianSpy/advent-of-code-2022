import { INPUT } from './input.js'

function parseInput(input) {
  return input
    .split('\n')
    .map(line => line.split(' '))
    .map(line => line = { dir: line[0], num: Number(line[1]) });
}

function checkMovement(H, T) {
  const difX = H[0] - T[0];
  const difY = H[1] - T[1];

  if (Math.hypot(difX, difY) > 2) {
    return [T[0] + Math.sign(difX), T[1] + Math.sign(difY)];
  } else if (Math.abs(difX) == 2) {
    return [T[0] + Math.sign(difX), T[1]];
  } else if (Math.abs(difY) == 2) {
    return [T[0], T[1] + Math.sign(difY)];
  } else {
    return T;
  }
}

function walkRope(input, knots) {
  const rope = new Array(knots).fill(0).map(e => e = [0,0] );
  const H = rope[0];
  const steps = new Set().add('0,0');

  input.forEach(line => {
    const direction = line.dir;
    const distance = line.num;

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "R":
          H[1] = H[1] + 1;
          break;
        case "L":
          H[1] = H[1] - 1;
          break;
        case "U":
          H[0] = H[0] + 1;
          break;
        case "D":
          H[0] = H[0] - 1;
          break;
        default:
          break;
      }

      for (let j = 1; j < rope.length; j++) {
        const follow = checkMovement(rope[j-1], rope[j]);
        if (follow) {
          rope[j] = follow;
        }
      }
      steps.add(`${rope[rope.length-1][0]},${rope[rope.length-1][1]}`)
    }
  })

  return steps.size;
}

function PartOneCalculate(input) {
  const parsed = parseInput(input);
  return walkRope(parsed, 2);
}

function PartTwoCalculate(input) {
  const parsed = parseInput(input);
  return walkRope(parsed, 10);
}

export function DayNinePartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("9-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `With 2 knots, the tail visits ${result} points at least once!` : text.innerHTML = '';
}

export function DayNinePartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("9-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `With 10 knots, the tail visits ${result} points at least once!` : text.innerHTML = '';
}