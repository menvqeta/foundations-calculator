const numberButtons = document.querySelectorAll(".number-button");
const previousResult = document.querySelector("#previous-result");
const currentResult = document.querySelector("#current-result");
const clearScreenKey = document.querySelector("#clear-screen-key");
const deleteKey = document.querySelector("#delete-key");
const reverseSignKey = document.querySelector("#reverse-sign-key");
const decimalKey = document.querySelector("#decimal-key");

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
    previousResult.textContent = '';
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

addEventListenersToNumbers();

deleteKey.addEventListener('click', () => deleteDigit());

clearScreenKey.addEventListener('click', () => clearScreen());

reverseSignKey.addEventListener('click', () => reverseSign());

decimalKey.addEventListener('click', () => addDecimal());

