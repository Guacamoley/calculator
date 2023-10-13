const display = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let firstNumber = 0;
let secondNUmber = 0;
let operator = "";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.className === "digits") {
      populateDisplay(button);
    }
  });
});

function populateDisplay(button) {
  display.value += button.textContent;
}
