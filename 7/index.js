import { INPUT } from './input.js'

const ROOT = '.';

function parseInput(input) {
  return input.split('\n');
}

function parseTypes(input) {
  if (input[0] === '$') return 'command';
  if (input[0] === 'dir') return 'directory';
  return 'file'
}

function navigateDirectory(input) {
  const currentDirectories = [ROOT];
  const lines = parseInput(input);
  const directories = new Map();

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i].split(' ');
    const type = parseTypes(line);

    if (type === 'command') {
      const [a, command, arg] = lines[i].split(' ');

      if (command === 'cd') {
        if (arg === '/') {
          currentDirectories.splice(1)
        } else if (arg === '..') {
          currentDirectories.pop()
        } else {
          currentDirectories.push(arg);
        }
      }
    }

    if (type === 'file') {
      const size = Number(lines[i].split(' ')[0]);
      const directory = currentDirectories.join('/');

      directories.set(directory, (directories.get(directory) || 0) + size);

      if (currentDirectories.length > 1) {
        for (let i = currentDirectories.length - 1; i > 0; i--) {
          const parent = currentDirectories.slice(0, i).join('/');
          directories.set(parent, (directories.get(parent) || 0) + size);
        }
      }
    }
  }

  return directories;
}

function totalsLessThan(directories, max) {
  let total = 0;
  
  for (let size of directories.values()) {
    if (size <= max) total += size;
  }
  return total;
}

function freeSpace(directories, max, needed) {
  const current = directories.get(ROOT);
  const difference = needed - (max - current);
  let smallest = current;

  for (let size of directories.values()) {
    if (size < smallest && size >= difference) {
      smallest = size;
    }
  }
  return smallest;
}

function PartOneCalculate(input) {
  const directory = navigateDirectory(input);
  return totalsLessThan(directory, 100_000);
}

function PartTwoCalculate(input) {
  const directory = navigateDirectory(input);
  return freeSpace(directory, 70_000_000, 30_000_000);
}

export function DaySevenPartOne() {
  const result = PartOneCalculate(INPUT);

  const text = document.getElementById("7-p1-a");
  (text.innerHTML === '') ? text.innerHTML = `The filesize of the small-(ish) directories is: ${result}!` : text.innerHTML = '';
}

export function DaySevenPartTwo() {
  const result = PartTwoCalculate(INPUT);
  
  const text = document.getElementById("7-p2-a");
  (text.innerHTML === '') ? text.innerHTML = `The minimum amount of space that needs freed is: ${result}!` : text.innerHTML = '';
}