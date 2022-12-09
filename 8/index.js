import { INPUT } from './input.js'

function parseRows(input) {
  return input.split('\n').map(line => line.split('').map(char => Number(char)));
}

function parseColumns(input) {
  const columns = [];
  let index = 0;

  while (index < input.length) {
    const current = [];
    input.forEach(line => {
      current.push(line[index]);
    })
    columns.push(current);
    index++;
  }
  return columns;
}

function countEdges(arr) {
  if (arr.length === 1) return arr.length;
  return ((arr.length * 2) + (arr[0].length * 2) - 4);
}

function checkDuplicates(arr, obj) {
  let areDuplicates = false;

  arr.forEach(item => {
    let matches = 0;
    for (let [key, value] of Object.entries(item)) {
      if (item[key] === obj[key]) matches++;
    }
    if (matches === 3) {
      areDuplicates = true;
    }
  })
  
  return areDuplicates;
}

function visibleTrees(rows, columns) {
  const visible = [];

  // Check the rows...
  for (let i = 1; i < rows.length - 1; i++) {
    const row = rows[i];

    // Ignore the edges of the array.
    for (let j = 1; j < row.length - 1; j++) {
      const tree = row[j];
      const left = row.slice(0, j);
      const right = row.slice(j + 1);

      let counter = 0;
      left.forEach(e => {
        if (e < tree) counter++;
      });

      if (counter === left.length) {
        const obj = {row: i, col: j, tree: tree}
        const duplicates = checkDuplicates(visible, obj)
        if (!duplicates) visible.push(obj)
      }
      counter = 0;

      right.forEach(e => {
        if (e < tree) counter++;
      });

      if (counter === right.length) {
        const obj = {row: i, col: j, tree: tree}
        const duplicates = checkDuplicates(visible, obj)
        if (!duplicates) visible.push(obj)
      }
    }
  }

  // Check the columns...
  for (let i = 1; i < columns.length - 1; i++) {
    const column = columns[i];

    // Ignore the edges of the array.
    for (let j = 1; j < column.length - 1; j++) {
      const tree = column[j];
      const up = column.slice(0, j);
      const down = column.slice(j + 1);
      let counter = 0;

      up.forEach(e => {
        if (e < tree) counter++;
      });

      if (counter === up.length) {
        const obj = {row: j, col: i, tree: tree};
        const duplicates = checkDuplicates(visible, obj)
        if (!duplicates) visible.push(obj)
      }
      counter = 0;

      down.forEach(e => {
        if (e < tree) counter++;
      });

      if (counter === down.length) {
        const obj = {row: j, col: i, tree: tree};
        const duplicates = checkDuplicates(visible, obj)
        if (!duplicates) visible.push(obj)
      };
    }
  }

  return visible;
}

function findScenicScores(rows, columns) {
  const result = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    
    for (let j = 0; j < row.length; j++) {
      const column = columns[j];
      const tree = row[j];
      const left = row.slice(0, j).reverse();
      const right = row.slice(j + 1);
      const up = column.slice(0, i).reverse();
      const down = column.slice(i + 1);

      result.push([
        countDirection(left, tree),
        countDirection(right, tree),
        countDirection(up, tree),
        countDirection(down, tree)
      ]);
    }
  }

  return result;
}

function countDirection(direction, tree) {
  if (direction.length === 0) return 0;

  let count = 0;
  
  for (let i = 0; i < direction.length; i++) {
    console.log(direction[i], 'vs', tree,)
    count++;
    if (direction[i] >= tree) break;
  }
  return count;
}

function totalScenicScore(inputs) {
  return inputs.map(tree => tree.reduce((a,b) => Number(a) * Number(b)))
}

function compareScenicScores(inputs) {
  let currentHighScore = 0;

  inputs.forEach(tree => {
    if (tree > currentHighScore) currentHighScore = tree;
  })

  return currentHighScore;
}

function PartOneCalculate(input) {
  const rows = parseRows(input);
  const edges = countEdges(rows);
  const columns = parseColumns(rows);
  return visibleTrees(rows, columns).length + edges;
}

function PartTwoCalculate(input) {
  const rows = parseRows(input);
  const columns = parseColumns(rows);
  const scores = findScenicScores(rows, columns);
  const totals = totalScenicScore(scores);
  return compareScenicScores(totals);
}

export function DayEightPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("8-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `There are ${result} visible trees!` : text.innerHTML = '';
}

export function DayEightPartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("8-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The highest visibility score is: ${result}` : text.innerHTML = '';
}