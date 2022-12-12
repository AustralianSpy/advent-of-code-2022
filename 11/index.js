import { INPUT, TEST } from './input.js'

/*
  * Shape of each @monkey after parsing is:
  * {
  *   items: [...],
  *   operation: [operand, num],
  *   test: num,
  *   true: num,
  *   false: num,
  *   count: num,
  * }
*/

function parseInput(input) {
  const monkeys = [];
  const lines = input.split('\n').map(e => e.trim());
  
  const shape = { items: [], operation: ['', 0], test: 0, true: 0, false: 0, count: 0 };

  let currentMonkey = { ...shape };

  lines.forEach(line => {
    if (line.length === 0) {
      monkeys.push(currentMonkey);
      currentMonkey = { ...shape };
    } else {
      if (line.includes('Starting')) {
        currentMonkey.items = line.split('items: ')[1].split(', ').map(e => Number(e));
      }
      if (line.includes('Operation')) {
        const equation = line.split('= old ')[1].split(' ');
        currentMonkey.operation = [equation[0], Number(equation[1])];
      }
      if (line.includes('Test')) {
        currentMonkey.test = Number(line.split('by ')[1]);
      }
      if (line.includes('true')) {
        currentMonkey.true = Number(line.split('monkey ')[1]);
      }
      if (line.includes('false')) {
        currentMonkey.false = Number(line.split('monkey ')[1]);
      }
    }
  });

  monkeys.push(currentMonkey);
  return monkeys;
}

function doOperations(operand, num1, num2) {
  if (isNaN(num2)) num2 = num1;

  switch (operand) {
    case '*':
      return (num1 * num2);
    case '/':
      return (num1 / num2);
    case '+':
      return (num1 + num2);
    case '-':
      return (num1 - num2);
    default:
      return null;
  }
}

function checkWorryLevel(item, num) {
  return item % num === 0;
}

function playKeepAway(monkeys, rounds, relieved) {
  let divisor = monkeys.reduce((acc, monkey) => acc * monkey.test, 1);

  for (let x = 1; x <= rounds; x++) {
    for (let y = 0; y < monkeys.length; y++) {
      const monkey = monkeys[y];
      monkey.count += monkey.items.length;
      if (monkey.items.length === 0) continue;

      const length = [...monkey.items].length;
      
      for (let z = 0; z < length; z++) {
        let item = monkey.items[0];
        item = doOperations(monkey.operation[0], item, monkey.operation[1]);

        if (relieved) item = Math.floor(item / 3);
        if (!relieved) item %= divisor;

        const bool = checkWorryLevel(item, monkey.test);
        monkey.items = monkey.items.slice(1);
        monkeys[monkey[`${bool}`]].items.push(item);
      }
    }
  }

  return monkeys;
}

function calculateMonkeyBusiness(monkeys, num) {
  monkeys.sort((a,b) => b.count - a.count);
  return monkeys.slice(0, num).reduce((a,b) => a.count * b.count);
}

function PartOneCalculate(input) {
  const monkeys = parseInput(input);
  const result = playKeepAway(monkeys, 20, true);
  return calculateMonkeyBusiness(result, 2);
}

function PartTwoCalculate(input) {
  const monkeys = parseInput(input);
  const result = playKeepAway(monkeys, 10000, false);
  return calculateMonkeyBusiness(result, 2);
}

export function DayElevenPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("11-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The level of monkey business after 20 rounds is: ${result}!` : text.innerHTML = '';
}

export function DayElevenPartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("11-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The level of monkey business after 10,000 rounds is: ${result}!` : text.innerHTML = '';
}