import { INPUT, SCORES, VALUES } from './input.js'

function parseInput(input) {
  return input.split('\n').map(item => item.split(' '));
}

function parseValues(game) {
  return game.map(round => {
    return round.map(r => {
      if (VALUES[1].includes(r)) return r = 1
      if (VALUES[2].includes(r)) return r = 2
      if (VALUES[3].includes(r)) return r = 3
    });
  });
}

function parseScoresOne(game) {
  return game.map(round => {
    if (round[0] === round[1]) return round = SCORES['D'] + round[1];
    if (round[0] === 1) {
      if (round[1] === 3) return round = SCORES['L'] + round[1];
      return round = SCORES['W'] + round[1];
    }
    if (round[0] === 2) {
      if (round[1] === 1) return round = SCORES['L'] + round[1];
      return round = SCORES['W'] + round[1];
    }
    if (round[0] === 3) {
      if (round[1] === 2) return round = SCORES['L'] + round[1];
      return round = SCORES['W'] + round[1];
    }
  });
}

function parseScoresTwo(game) {
  return game.map(round => {
    if (round[1] === 1) {
      if (round[0] === 1) round[1] = 3;
      if (round[0] === 2) round[1] = 1;
      if (round[0] === 3) round[1] = 2;
      return round;
    }
    if (round[1] === 2) {
      if (round[0] === 1) round[1] = 1;
      if (round[0] === 2) round[1] = 2;
      if (round[0] === 3) round[1] = 3;
      return round;
    }
    if (round[1] === 3) {
      if (round[0] === 1) round[1] = 2;
      if (round[0] === 2) round[1] = 3;
      if (round[0] === 3) round[1] = 1;
      return round;
    }
  });
}

function totalScore(game) {
  return game.reduce((a,b) => a + b, 0);
}

function PartOneCalculate(game) {
  const parsed = parseInput(game);
  const values = parseValues(parsed);
  const scores = parseScoresOne(values);
  return totalScore(scores);
}

function PartTwoCalculate(game) {
  const parsed = parseInput(game);
  const values = parseValues(parsed);
  const passOne = parseScoresTwo(values);
  const scores = parseScoresOne(passOne);
  return totalScore(scores);
}

export function DayTwoPartOne() {
  const total = PartOneCalculate(INPUT);

  const text = document.getElementById("2-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `Your total score is: ${total}!` : text.innerHTML = '';
}

export function DayTwoPartTwo() {
  const total = PartTwoCalculate(INPUT);

  const text = document.getElementById("2-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `Your total score is: ${total}!` : text.innerHTML = '';
}