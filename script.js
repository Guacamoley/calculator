const display = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let num1 = "";
let num2 = "";
let currentOperator = "";

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
        if (currentOperator !== "" && num2 === "") {
          clearDisplay();
        }
        populateDisplay(button.textContent);
        if (currentOperator === "") {
          num1 += button.textContent;
        } else {
          num2 += button.textContent;
        }
        break;

      case button.classList.contains("all-clear"):
        clearDisplay();
        num1 = "";
        num2 = "";
        currentOperator = "";
        break;

      case button.className === "clear":
        clearDisplay();
        break;

      case button.className === "operators":
        if (num1 !== "" && num2 !== "") {
          // If both numbers and an operator are already set, calculate and display the result
          const result = operate(currentOperator, num1, num2);
          clearDisplay();
          populateDisplay(result);
          num1 = result;
          num2 = "";
          currentOperator = button.textContent;
        } else {
          // If it's the first operator input or after a calculation, store the operator
          currentOperator = button.textContent;
          if (num1 === "") {
            num1 = currentDisplayValue;
          }
          clearDisplay();
        }
        break;

      case button.className === "equals":
        if (num1 !== "" && num2 !== "") {
          const result = operate(currentOperator, num1, num2);
          clearDisplay();
          populateDisplay(result);
          num1 = result;
          num2 = "";
          currentOperator = "";
        }
        break;

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
