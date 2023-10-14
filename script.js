const display = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let isDecimal = false;
let num1 = "";
let num2 = "";
let currentOperator = "";

function operate(operator, num1, num2) {
  num1 = new Decimal(num1);
  num2 = new Decimal(num2);
  let result;

  switch (operator) {
    case "+":
      result = num1.plus(num2);
      break;
    case "-":
      result = num1.minus(num2);
      break;
    case "×":
      result = num1.times(num2);
      break;
    case "÷":
      result = num1.dividedBy(num2);
      break;
    default:
      return "Invalid operator";
  }

  // Round the result to 10 decimal places
  return result.toDecimalPlaces(4).toString();
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

      case button.className === "operators":
        isDecimal = false;
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

      case button.className === "decimal":
        if (!isDecimal) {
          if (currentOperator === "") {
            isDecimal = true;
            num1 += button.textContent;
            populateDisplay(button.textContent);
          } else {
            isDecimal = true;
            num2 += button.textContent;
            populateDisplay(button.textContent);
          }
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
          isDecimal = false;
        }
        break;

      case button.classList.contains("all-clear"):
        clearDisplay();
        num1 = "";
        num2 = "";
        currentOperator = "";
        isDecimal = false;
        break;

      case button.className === "clear":
        clearDisplay();
        currentOperator === "" ? (num1 = "") : (num2 = "");
        break;

      default:
        return;
    }
  });
});

// Populates display
function populateDisplay(textToDisplay) {
  display.value += textToDisplay;
}

// Function to clear display
function clearDisplay() {
  display.value = "";
}
