/**
 * ThermoCalc — Temperature Converter
 * Core conversion logic (Celsius ↔ Fahrenheit ↔ Kelvin)
 */

function convertTemperature() {

  const value = document.getElementById("temperature").value.trim();
  const unit  = document.getElementById("unit").value;

  const error = document.getElementById("error");
  const c     = document.getElementById("celsius");
  const f     = document.getElementById("fahrenheit");
  const k     = document.getElementById("kelvin");

  // Clear previous state
  error.innerHTML = "";
  setResult(c, "—");
  setResult(f, "—");
  setResult(k, "—");

  // Validation
  if (value === "") {
    error.innerHTML = "⚠ Please enter a temperature value.";
    return;
  }

  if (isNaN(value)) {
    error.innerHTML = "⚠ Only numeric values are allowed.";
    return;
  }

  let temp = parseFloat(value);
  let celsius, fahrenheit, kelvin;

  // --- Celsius input ---
  if (unit === "C") {
    if (temp < -273.15) {
      error.innerHTML = "⚠ Temperature cannot be below Absolute Zero (−273.15 °C).";
      return;
    }
    celsius    = temp;
    fahrenheit = (temp * 9 / 5) + 32;
    kelvin     = temp + 273.15;
  }

  // --- Fahrenheit input ---
  else if (unit === "F") {
    celsius = (temp - 32) * 5 / 9;
    if (celsius < -273.15) {
      error.innerHTML = "⚠ Temperature cannot be below Absolute Zero (−459.67 °F).";
      return;
    }
    fahrenheit = temp;
    kelvin     = celsius + 273.15;
  }

  // --- Kelvin input ---
  else {
    if (temp < 0) {
      error.innerHTML = "⚠ Kelvin cannot be less than 0 K (Absolute Zero).";
      return;
    }
    kelvin     = temp;
    celsius    = temp - 273.15;
    fahrenheit = (celsius * 9 / 5) + 32;
  }

  // Display results with animation
  setResult(c, celsius.toFixed(2));
  setResult(f, fahrenheit.toFixed(2));
  setResult(k, kelvin.toFixed(2));
}

/**
 * Set a result card value with a pop animation.
 * @param {HTMLElement} el - The .card-value element
 * @param {string} text    - The value to display
 */
function setResult(el, text) {
  el.classList.remove("updated");
  // Force reflow so the animation replays
  void el.offsetWidth;
  el.textContent = text;
  if (text !== "—") el.classList.add("updated");
}