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
let decimalAdded = false;

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
    if (decimalAdded) {
        addDigitAfterDecimal(number);
    }
    else {
        addDigitAtTheEnd(number);
    }
    
    currentResult.textContent = numOnLowerScreen;
}

function addDigitAtTheEnd(number) {
    numOnLowerScreen *= 10;
    numOnLowerScreen += +number;
}

function addDigitAfterDecimal(number) {
    numOnLowerScreen = parseFloat(numOnLowerScreen);
    numOnLowerScreen += (number / Math.pow(10, decimalAdded));
    numOnLowerScreen = numOnLowerScreen.toFixed(decimalAdded);
    decimalAdded++;
}

function deleteDigit() {
    if(decimalAdded) {
        removeLastDecimalDigit();
    }
    else {
        removeLastDigit();
    }
    
}

function removeLastDigit() {
    let remainder = numOnLowerScreen % 10;
    numOnLowerScreen -= remainder;
    numOnLowerScreen /= 10;
    currentResult.textContent = numOnLowerScreen;
}

function removeLastDecimalDigit() {
    decimalAdded--;
    numOnLowerScreen = parseFloat(numOnLowerScreen.toFixed(decimalAdded));
    currentResult.textContent = numOnLowerScreen;
}

function clearScreen() {
    firstNumOfUpperScreen = '';
    secondNumOfUpperScreen = '';
    operator = '';
    numOnLowerScreen = 0;
    decimalAdded = false;
    currentResult.textContent = numOnLowerScreen;
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
}

function reverseSign() {
    numOnLowerScreen*=(-1);
    currentResult.textContent = numOnLowerScreen;
}

function addDecimal() {
    if (!decimalAdded) {
        decimalAdded = 1;
        if (currentResult.textContent === '') {
            currentResult.textContent = '0.';
        } else {
            currentResult.textContent += '.';
        }
    }
}

function changePreviousResult(sign) {
    if(!firstNumOfUpperScreen) {
        useOperationForTheFirstTime(sign);
    }
    else {
        if(numOnLowerScreen === 0) {
            changeSign(sign);

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
            if(decimalAdded) {
                result = parseFloat(result.toFixed(10));
            }
            firstNumOfUpperScreen = result;
            numOnLowerScreen = 0;
            operator = sign;
            previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
            currentResult.textContent = numOnLowerScreen;            
        }
    }
    decimalAdded = false;
}

function changeSign(sign) {
    operator = sign;
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
    currentResult.textContent = numOnLowerScreen;
}

function useOperationForTheFirstTime(sign) {
    firstNumOfUpperScreen = numOnLowerScreen;
    operator = sign;
    numOnLowerScreen = 0;
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen}`;
    currentResult.textContent = numOnLowerScreen;
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
    if(!firstNumOfUpperScreen) {
        return;
    }
    let result = calculate(firstNumOfUpperScreen, numOnLowerScreen, operator);
    if(result === 'WOOPS') {
        handleDivideByZero(result);
        return;
    }
    if(decimalAdded) {
        result = parseFloat(result.toFixed(10)); 
    }
    decimalAdded = false;
    secondNumOfUpperScreen = numOnLowerScreen;
    numOnLowerScreen = result;
    previousResult.textContent = `${firstNumOfUpperScreen} ${operator} ${secondNumOfUpperScreen} =`;
    currentResult.textContent = numOnLowerScreen;
}

function addEventListenersForOperatorKeys() {
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
}


addEventListenersToNumbers();

addEventListenersForOperatorKeys();

