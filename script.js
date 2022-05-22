
let currentNumber = [0,1,false];
let operator = null;
let savedNumber = [0,1,false];
let isFloat = false;

function operate(d) {
   
    if (currentNumber[0] < 1000000000000000) {
        if (typeof d == 'number') {
            currentNumber[2] = true;
            if (isFloat === false) {
                currentNumber[0] *= 10;
                currentNumber[0] += d;
                display(currentNumber[0]);
            } else if (isFloat === true) {
                currentNumber[0] *= 10;
                currentNumber[0] += d;
                currentNumber[1] *= 10;
                display((currentNumber[0] / currentNumber[1]));
                currentNumber[2] = true;
            }
        }

    } 

    if (d === 'clear') {
        currentNumber = [0,1,false];
        operator = null;
        savedNumber = [0,1,false];
        isFloat = false;
        display('');
    }

    if (d === 'backspace') {
        if (isFloat === false) {
            currentNumber[0] = Math.floor(currentNumber[0]/10);
            display(currentNumber[0]);
        }
        if (isFloat === true) {
            currentNumber[0] = Math.floor(currentNumber[0]/10);
            currentNumber[1] = currentNumber[1] / 10;
            if (currentNumber[1] === 1) {
                isFloat = false;
            }
            display(currentNumber[0] / currentNumber[1]);
        }

    }
    
    if (d === '.') {
        isFloat = true;
    }

    if ((d === '=') && (savedNumber[2] === true && operator !== null && currentNumber[2] == true)) {
        calculate();
        
    } else if ((d === '+' || d === '-' || d === '*' || d === '/') && (savedNumber[2] === true && operator !== null && currentNumber[2] === true)) {
        calculate();
        savedNumber = currentNumber;
        isFloat = false;
        operator = d;
        currentNumber = [0,1,false];
    } else if (d === '+' || d === '-' || d === '*' || d === '/') {
        savedNumber = currentNumber;
        operator = d;
        isFloat = false;
        currentNumber = [0,1,false];
    }
}

function display(s) {
        const screen = document.querySelector('#display');
        const x = s.toString();
        screen.innerText = x; 

}


function calculate() {
    if (operator == null) {
        operate('clear');
        display('no operator');
    } else if (operator === '/') {
        if (currentNumber[0] == 0) {
            operate('clear');
            display('Divide by zero error!');
        } else {
            currentNumber = divide(savedNumber, currentNumber);
            savedNumber = [0,1,false];
            display(currentNumber[0] / currentNumber[1]);
        }
    } else if (operator === '*') {
        currentNumber = multiply(savedNumber, currentNumber);
        savedNumber = [0,1,false];
        display(currentNumber[0] / currentNumber[1]);
    } else if (operator === '-') {
        equalize(savedNumber, currentNumber);
        currentNumber = subtract(savedNumber, currentNumber);
        savedNumber = [0,1,false];
        display(currentNumber[0] / currentNumber[1]);
    } else if (operator === '+') {
        equalize(savedNumber, currentNumber);
        currentNumber = add(savedNumber, currentNumber);
        savedNumber = [0,1,false];
        display(currentNumber[0] / currentNumber[1]);
    }
}
function add(x, y) {
    let a = x[0] + y[0];
    return [a, x[1], true];
}

function subtract(x, y) {
    let a = x[0] - y[0];
    return [a, x[1], true];
}

function multiply(x, y) {
    let a = (x[0] * y[0]);
    let b = (x[1] * y[1]);
    return [a, b, true];
}

function divide(x, y) {
    let a = (x[0] / y[0]);
    let b = (x[1] / y[1]);
    return [a, b, true];    
    }

function equalize(x, y) {
    if (x[1] != y[1]) {
        if (x[1] > y[1]) {
            let a = x[1] / y[1];
            currentNumber[0] = currentNumber[0] * a;
            currentNumber[1] = currentNumber[1] * a;
        } else {
            let a = y[1] / x[1];
            savedNumber[0] = savedNumber[0] * a;
            savedNumber[1] = savedNumber[1] * a;
        }
    }
}