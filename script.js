const numberButtons = document.querySelectorAll(".number-button");
let previousResult = document.querySelector("#previous-result");
let currentResult = document.querySelector("#current-result");
const clearScreenKey = document.querySelector("#clear-screen-key");
const deleteKey = document.querySelector("#delete-key");
const reverseSignKey = document.querySelector("#reverse-sign-key");
const decimalKey = document.querySelector("#decimal-key");
const percentKey = document.querySelector("#percent-key");
const addKey = document.querySelector("#add-key");
const subtractKey = document.querySelector("#subtract-key");
const multiplyKey = document.querySelector("#multiply-key");
const divideKey = document.querySelector("#divide-key");

function addEventListenersToNumbers() {
    for (let i = 0; i < numberButtons.length; i++) {
        let numberButton = numberButtons[i];
        let number = +numberButton.getAttribute('id');
        numberButton.addEventListener('click', () => selectDigit(number));
    }
}

function selectDigit(number) {
    let currentNum = currentResult.textContent;
    currentNum = currentNum.trim();
    if((currentNum.length >= 1) && (currentNum.charAt(0) === '0')) {
        currentNum = '';
    }
    currentNum+=number;
    currentResult.textContent = currentNum;
}

function deleteDigit() {
    let currentNum = currentResult.textContent;
    currentNum = currentNum.slice(0, -1);
    if(currentNum.length === 0) {
        currentNum = '0';
    }
    currentResult.textContent = currentNum;
}

function clearScreen() {
    currentResult.textContent = 0;
    previousResult.textContent = '\n';
}

function reverseSign() {
    let currentNum = +currentResult.textContent;
    currentNum*=(-1);
    currentResult.textContent = currentNum;
}

function doesNumberContainDecimal(number) {
    for(let i=0; i<number.length; i++) {
        let c = number.charAt(i);
        if(c === '.') {
            return true;
        }
    }
    return false;
}

function addDecimal() {
    let currentNum = currentResult.textContent;
    let containsDecimal = doesNumberContainDecimal(currentNum);
    if(!containsDecimal) {
        currentNum+='.';
    }
    currentResult.textContent = currentNum;
}

function changePreviousResult(sign) {
    if(previousResult.textContent.trim().length === 0) {
        let prevNum = +currentResult.textContent.trim();
        currentResult.textContent = '\n';
        previousResult.textContent = `${prevNum} ${sign}`;
    }
    else {
        let prevNum = +previousResult.textContent.slice(0, -1).trim();
        if(currentResult.textContent.trim().length === 0) {
            previousResult.textContent = `${prevNum} ${sign}`;
            return;
        }
        let currentNum = +currentResult.textContent.trim();
        let result = calculate(prevNum, currentNum, sign);
        currentResult.textContent = '\n\n';
        previousResult.textContent = `${result} ${sign}`;
    }
}

function calculate(first, second, sign) {
    if(sign === '+') {
        return +first + +second;
    }
    else if(sign === '-') {
        return +first - +second;
    }
    else if(sign === '*') {
        return +first * +second;
    }
    else if(sign === '÷') {
        return +first / +second;
    }
}

addEventListenersToNumbers();

deleteKey.addEventListener('click', () => deleteDigit());

clearScreenKey.addEventListener('click', () => clearScreen());

reverseSignKey.addEventListener('click', () => reverseSign());

decimalKey.addEventListener('click', () => addDecimal());


addKey.addEventListener('click', () => changePreviousResult('+'));
subtractKey.addEventListener('click', () => changePreviousResult('-'));
multiplyKey.addEventListener('click', () => changePreviousResult('*'));
divideKey.addEventListener('click', () => changePreviousResult('÷'));

