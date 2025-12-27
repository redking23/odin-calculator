const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let displayValue = "0";

function updateDisplay() {
  display.value = displayValue;
}
updateDisplay();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.type === "number") {
      if (displayValue === "0") {
        displayValue = button.textContent;
      } else {
        displayValue += button.textContent;
      }
      updateDisplay();
    }
    if (button.textContent === "C") {
      displayValue = "0";
      updateDisplay();
    }
  });
});
