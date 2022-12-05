import { DayOnePartOne, DayOnePartTwo } from './1/index.js';
import { DayTwoPartOne, DayTwoPartTwo } from './2/index.js';
import { DayThreePartOne, DayThreePartTwo } from './3/index.js';
import { DayFourPartOne, DayFourPartTwo } from './4/index.js'
import { DayFivePartOne, DayFivePartTwo } from './5/index.js'

document.getElementById("1-p1").addEventListener("click", DayOnePartOne)
document.getElementById("1-p2").addEventListener("click", DayOnePartTwo)

document.getElementById("2-p1").addEventListener("click", DayTwoPartOne)
document.getElementById("2-p2").addEventListener("click", DayTwoPartTwo)

document.getElementById("3-p1").addEventListener("click", DayThreePartOne)
document.getElementById("3-p2").addEventListener("click", DayThreePartTwo)

document.getElementById("4-p1").addEventListener("click", DayFourPartOne)
document.getElementById("4-p2").addEventListener("click", DayFourPartTwo)

document.getElementById("5-p1").addEventListener("click", DayFivePartOne)
document.getElementById("5-p2").addEventListener("click", DayFivePartTwo)