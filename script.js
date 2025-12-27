const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let displayValue = "0";
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = displayValue;
}

function operate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) return "Error";
      return a / b;
    case "%":
      return a % b;
    default:
      return b;
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.type === "number") {
      if (displayValue === "Error") {
        displayValue = "0";
      }
      if (shouldResetDisplay) {
        displayValue = button.textContent;
        shouldResetDisplay = false;
        updateDisplay();
        return;
      }
      if (displayValue === "0") {
        displayValue = button.textContent;
      } else {
        displayValue += button.textContent;
      }
      updateDisplay();
    }
    if (button.textContent === "C") {
      displayValue = "0";
      shouldResetDisplay = false;
      updateDisplay();
    }
    if (button.dataset.type === "decimal") {
      if (shouldResetDisplay) {
        displayValue = "0.";
        shouldResetDisplay = false;
        updateDisplay();
        return;
      }
      if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
      }
    }
    if (button.dataset.type === "action" && button.dataset.value === "delete") {
      if (shouldResetDisplay) return;
      if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
      } else {
        displayValue = "0";
      }
      updateDisplay();
    }
    if (button.dataset.type === "operator") {
      const newOperator = button.dataset.value;
      if (shouldResetDisplay) {
        operator = newOperator;
        return;
      }
      if (operator !== null && firstOperand !== null) {
        const secondOperand = parseFloat(displayValue);
        const result = operate(firstOperand, secondOperand, operator);

        displayValue = String(result);
        updateDisplay();

        firstOperand = result === "Error" ? null : parseFloat(displayValue);
      } else {
        firstOperand = parseFloat(displayValue);
      }
      operator = newOperator;
      shouldResetDisplay = true;
    }
    if (button.dataset.type === "equals") {
      if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(displayValue);
        displayValue = operate(
          firstOperand,
          secondOperand,
          operator
        ).toString();
        firstOperand = null;
        operator = null;
        shouldResetDisplay = true;
        updateDisplay();
      }
    }
  });
});
