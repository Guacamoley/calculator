const display = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let currentDisplayValue = "";
let numHolder = "";
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
  num1 = parseInt(num1, 10);
  num2 = parseInt(num2, 10);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "×":
      return multiply(num1, num2);
    case "÷":
      return divide(num1, num2);
    default:
      return "Invalid operator";
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    switch (true) {
      case button.classList.contains("digits"):
        populateDisplay(button.textContent);
        currentDisplayValue += button.textContent;
        break;

      case button.classList.contains("all-clear"):
        clearDisplay();
        currentDisplayValue = "";
        break;

      case button.className === "clear":
        clearDisplay();
        break;

      case button.className === "operators":
        populateDisplay(button.textContent);
        numHolder = currentDisplayValue;
        operator = button.textContent;
        currentDisplayValue = "";
        clearDisplay();
        break;

      case button.className === "equals":
        clearDisplay();
        total = operate(operator, numHolder, currentDisplayValue);
        currentDisplayValue = "";
        numHolder = "";
        operator = "";
        populateDisplay(total);
      default:
        return;
    }
  });
});

function populateDisplay(textToDisplay) {
  display.value += textToDisplay;
}

function clearDisplay() {
  display.value = "";
}
