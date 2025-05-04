const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.classList.contains("clear")) {
      currentInput = "";
      display.textContent = "0";
      return;
    }

    if (value === "←") {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || "0";
      return;
    }

    if (value === "=") {
      try {
        const sanitizedInput = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
        currentInput = eval(sanitizedInput).toString();
        display.textContent = currentInput;
        resetNext = true;
      } catch (e) {
        display.textContent = "Error";
        currentInput = "";
      }
      return;
    }

    if (resetNext && !isNaN(value)) {
      currentInput = value;
      resetNext = false;
    } else {
      currentInput += value;
    }

    display.textContent = currentInput;
  });
});
