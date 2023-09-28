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
const remainderKey = document.querySelector("#percent-key");
const equalsKey = document.querySelector("#equals-key");

let firstNumOfUpperScreen = '';
let secondNumOfUpperScreen = '';
let operator = '';
let numOnLowerScreen = 0;

function addEventListenersToNumbers() {
    for (let i = 0; i < numberButtons.length; i++) {
        let numberButton = numberButtons[i];
        let number = +numberButton.getAttribute('id');
        numberButton.addEventListener('click', () => selectDigit(number));
    }
}

function selectDigit(number) {
    numOnLowerScreen*=10;
    numOnLowerScreen += +number;
    currentResult.textContent = numOnLowerScreen;
}

function deleteDigit() {
    let remainder = numOnLowerScreen%10;
    numOnLowerScreen-=remainder;
    numOnLowerScreen/=10;
    currentResult.textContent = numOnLowerScreen;
}

function clearScreen() {
    firstNumOfUpperScreen = '';
    secondNumOfUpperScreen = '';
    operator = '';
    numOnLowerScreen = 0;
    currentResult.textContent = numOnLowerScreen;
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
}

function reverseSign() {
    numOnLowerScreen*=(-1);
    currentResult.textContent = numOnLowerScreen;
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
    if(!firstNumOfUpperScreen) {
        firstNumOfUpperScreen = numOnLowerScreen;
        operator = sign;
        numOnLowerScreen = 0;
        previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
        currentResult.textContent = numOnLowerScreen;
    }
    else {
        if(numOnLowerScreen === 0) {
            operator = sign;
            previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
            currentResult.textContent = numOnLowerScreen;

        }
        else if(secondNumOfUpperScreen) {
            firstNumOfUpperScreen = numOnLowerScreen;
            operator = sign;
            secondNumOfUpperScreen = '';
            numOnLowerScreen = 0;
            previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
            currentResult.textContent = numOnLowerScreen; 
        }
        else {
            let result = calculate(firstNumOfUpperScreen, numOnLowerScreen, operator);
            if(result === 'WOOPS') {
                handleDivideByZero(result);
                return;
            }
            firstNumOfUpperScreen = result;
            numOnLowerScreen = 0;
            operator = sign;
            previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
            currentResult.textContent = numOnLowerScreen;            
        }
    }
}

function handleDivideByZero(result) {
    firstNumOfUpperScreen = '';
    secondNumOfUpperScreen = '';
    numOnLowerScreen = result;
    operator = '';
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
    currentResult.textContent = numOnLowerScreen;
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
        if(second === 0) {
            return "WOOPS";
        }
        return +first / +second;
    }
    else if(sign === '%') {
        return +first % +second;
    }
}

function afterEquals() {
    let result = calculate(firstNumOfUpperScreen, numOnLowerScreen, operator);
    if(result === 'WOOPS') {
        handleDivideByZero(result);
        return;
    }
    secondNumOfUpperScreen = numOnLowerScreen;
    numOnLowerScreen = result;
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen} =`;
    currentResult.textContent = numOnLowerScreen;
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
remainderKey.addEventListener('click', () => changePreviousResult('%'));
equalsKey.addEventListener('click', () => afterEquals());
