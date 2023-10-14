const display = document.getElementById("result");
const buttons = document.querySelectorAll("button");
let isDecimal = false;
let num1 = "";
let num2 = "";
let currentOperator = "";

// Operate function to do math calculations when 3 inputs are made by user
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

// Main listener for button functionality
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    handleButtonClick(button);
  });
});

document.addEventListener("keydown", function (event) {
  const key = event.key;
  const button = mapKeyboard(key);
  // For testing purposes
  console.log(event.key);
  console.log(button);
  if (button) {
    handleButtonClick(button);
  }
});

function handleButtonClick(button) {
  switch (true) {
    case button.classList.contains("digits"):
      // If we're in a chain calculation, then clear the screen when a new digit is pressed
      if (currentOperator !== "" && num2 === "") {
        clearDisplay();
      }
      // Otherwise populate display and have either num1/2 hold the value
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
      // Only 1 decimal is allowed per number input
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

    case button.className === "equals" || button === "=":
      // Equals is only allowed if num1 and num2 have values
      if (num1 !== "" && num2 !== "") {
        // Operate on the current calculation, clear display and update it with the new value
        const result = operate(currentOperator, num1, num2);
        clearDisplay();
        populateDisplay(result);
        // Num1 gets the result and everything else gets reset for further calculations
        num1 = result;
        num2 = "";
        currentOperator = "";
        isDecimal = false;
      }
      break;

    case button.classList.contains("all-clear"):
      // Complete reset of the calculator and its values
      clearDisplay();
      num1 = "";
      num2 = "";
      currentOperator = "";
      isDecimal = false;
      break;

    // Just clears the current num value and the screen
    case button.className === "clear":
      clearDisplay();
      currentOperator === "" ? (num1 = "") : (num2 = "");
      break;

    case button.className === "backspace":
      if (currentOperator === "") {
        // If there is no operator, clear the last digit from num1
        num1 = num1.slice(0, -1); // Remove the last character
        clearDisplay();
        populateDisplay(num1);
      } else {
        // If there is an operator, clear the last digit from num2
        num2 = num2.slice(0, -1);
        clearDisplay();
        populateDisplay(num2);
      }
      break;

    default:
      return;
  }
}

// Maps keyboard keys to calculator button ids/classes
function mapKeyboard(key) {
  const buttonMappings = {
    1: "#digit-1",
    2: "#digit-2",
    3: "#digit-3",
    4: "#digit-4",
    5: "#digit-5",
    6: "#digit-6",
    7: "#digit-7",
    8: "#digit-8",
    9: "#digit-9",
    0: "#digit-0",
    "+": "#plus",
    "-": "#subtract",
    "*": "#multiply",
    "/": "#divide",
    ".": ".decimal",
    Enter: ".equals",
    Escape: ".all-clear",
    Backspace: ".backspace",
  };

  return document.querySelector(buttonMappings[key]) || null;
}

// Populates display
function populateDisplay(textToDisplay) {
  display.value += textToDisplay;
}

// Function to clear display
function clearDisplay() {
  display.value = "";
}
