import {
  applyPercent,
  calculateResult,
  chooseOperator,
  clearCalculator,
  createInitialState,
  deleteLastCharacter,
  formatEntryValue,
  getStatusMessage,
  inputDecimal,
  inputDigit,
  pressKey,
  toggleSign
} from "./calculator-engine.js";

const MAX_HISTORY_ITEMS = 8;

let state = createInitialState();
let history = [];

const elements = findElements();
bindEvents();
render();

function findElements() {
  return {
    keypad: document.querySelector(".keypad"),
    expressionDisplay: document.querySelector("#expression-display"),
    displayValue: document.querySelector("#display-value"),
    statusMessage: document.querySelector("#status-message"),
    historyList: document.querySelector("#history-list"),
    clearHistoryButton: document.querySelector('[data-action="clear-history"]')
  };
}

function bindEvents() {
  elements.keypad.addEventListener("click", handleButtonClick);
  elements.clearHistoryButton.addEventListener("click", clearHistory);
  window.addEventListener("keydown", handleKeyboardInput);
}

function handleButtonClick(event) {
  const button = event.target.closest("button[data-action]");

  if (!button || button.dataset.action === "clear-history") {
    return;
  }

  performAction(button.dataset.action, button.dataset.value);
}

function handleKeyboardInput(event) {
  const key = event.key;
  const isSupportedKey = /^\d$/.test(key)
    || [".", ",", "+", "-", "*", "x", "X", "/", "÷", "Enter", "=", "Escape", "Delete", "Backspace", "%"].includes(key);

  if (!isSupportedKey) {
    return;
  }

  event.preventDefault();
  const nextState = pressKey(state, key);
  recordCompletedCalculation(nextState);
  state = nextState;
  render();
}

function performAction(action, value) {
  let nextState = state;

  switch (action) {
    case "digit":
      nextState = inputDigit(state, value);
      break;
    case "decimal":
      nextState = inputDecimal(state);
      break;
    case "operator":
      nextState = chooseOperator(state, value);
      break;
    case "equals":
      nextState = calculateResult(state);
      break;
    case "clear":
      nextState = clearCalculator();
      break;
    case "delete":
      nextState = deleteLastCharacter(state);
      break;
    case "sign":
      nextState = toggleSign(state);
      break;
    case "percent":
      nextState = applyPercent(state);
      break;
    default:
      return;
  }

  recordCompletedCalculation(nextState);
  state = nextState;
  render();
}

function recordCompletedCalculation(nextState) {
  if (!nextState.completedCalculation || nextState.completedCalculation === state.completedCalculation) {
    return;
  }

  history = [nextState.completedCalculation, ...history].slice(0, MAX_HISTORY_ITEMS);
}

function clearHistory() {
  history = [];
  renderHistory();
}

function render() {
  const displayText = state.error ? "Error" : formatEntryValue(state.currentInput);

  elements.expressionDisplay.textContent = state.expression || "Ready for input";
  elements.displayValue.textContent = displayText;
  elements.displayValue.setAttribute("aria-label", state.error ? `Calculator error: ${state.error}` : `Calculator display: ${displayText}`);
  elements.statusMessage.textContent = getStatusMessage(state);
  elements.displayValue.classList.toggle("has-error", Boolean(state.error));
  renderHistory();
}

function renderHistory() {
  elements.historyList.replaceChildren();

  if (history.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-history";
    emptyMessage.textContent = "Your completed calculations will appear here.";
    elements.historyList.append(emptyMessage);
    return;
  }

  for (const entry of history) {
    const item = document.createElement("article");
    const expression = document.createElement("p");
    const result = document.createElement("p");

    item.className = "history-item";
    expression.className = "history-expression";
    result.className = "history-result";
    expression.textContent = entry.expression;
    result.textContent = entry.result;
    item.append(expression, result);
    elements.historyList.append(item);
  }
}
