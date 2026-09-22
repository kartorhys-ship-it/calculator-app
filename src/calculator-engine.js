/**
 * The calculator engine is the app's rule book.
 *
 * It has no DOM code and no browser side effects. Each action receives the
 * current state and returns a new state, which makes the behavior easy to
 * test and easy to explain.
 */

export const OPERATOR_SYMBOLS = Object.freeze({
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷"
});

const MAX_INPUT_LENGTH = 16;

export class CalculatorError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalculatorError";
  }
}

export function createInitialState() {
  return {
    currentInput: "0",
    previousValue: null,
    pendingOperator: null,
    waitingForOperand: false,
    hasCalculated: false,
    lastOperator: null,
    lastOperand: null,
    expression: "",
    error: null,
    completedCalculation: null
  };
}

export function calculateBinaryOperation(left, operator, right) {
  if (!Object.hasOwn(OPERATOR_SYMBOLS, operator)) {
    throw new CalculatorError("Unknown operation.");
  }

  if (operator === "divide" && right === 0) {
    throw new CalculatorError("Cannot divide by zero.");
  }

  const result = {
    add: left + right,
    subtract: left - right,
    multiply: left * right,
    divide: left / right
  }[operator];

  if (!Number.isFinite(result)) {
    throw new CalculatorError("That result is too large.");
  }

  return roundCalculatorResult(result);
}

export function inputDigit(state, digit) {
  if (!/^\d$/.test(digit)) {
    return state;
  }

  const cleanState = state.error ? createInitialState() : state;
  const startsNewEntry = cleanState.waitingForOperand || cleanState.hasCalculated;
  const nextInput = startsNewEntry
    ? digit
    : cleanState.currentInput === "0"
      ? digit
      : `${cleanState.currentInput}${digit}`;

  if (!startsNewEntry && cleanState.currentInput.length >= MAX_INPUT_LENGTH) {
    return cleanState;
  }

  return {
    ...cleanState,
    currentInput: nextInput,
    waitingForOperand: false,
    hasCalculated: false,
    expression: cleanState.hasCalculated ? "" : cleanState.expression,
    lastOperator: cleanState.hasCalculated ? null : cleanState.lastOperator,
    lastOperand: cleanState.hasCalculated ? null : cleanState.lastOperand,
    completedCalculation: null
  };
}

export function inputDecimal(state) {
  const cleanState = state.error ? createInitialState() : state;
  const startsNewEntry = cleanState.waitingForOperand || cleanState.hasCalculated;

  if (startsNewEntry) {
    return {
      ...cleanState,
      currentInput: "0.",
      waitingForOperand: false,
      hasCalculated: false,
      expression: cleanState.hasCalculated ? "" : cleanState.expression,
      lastOperator: cleanState.hasCalculated ? null : cleanState.lastOperator,
      lastOperand: cleanState.hasCalculated ? null : cleanState.lastOperand,
      completedCalculation: null
    };
  }

  if (cleanState.currentInput.includes(".")) {
    return cleanState;
  }

  return {
    ...cleanState,
    currentInput: `${cleanState.currentInput}.`,
    completedCalculation: null
  };
}

export function chooseOperator(state, operator) {
  if (!Object.hasOwn(OPERATOR_SYMBOLS, operator)) {
    return state;
  }

  if (state.error) {
    return chooseOperator(createInitialState(), operator);
  }

  const symbol = OPERATOR_SYMBOLS[operator];

  if (state.hasCalculated && state.pendingOperator === null) {
    const value = Number(state.currentInput);

    return {
      ...state,
      previousValue: value,
      pendingOperator: operator,
      waitingForOperand: true,
      hasCalculated: false,
      lastOperator: null,
      lastOperand: null,
      expression: `${formatNumericValue(value)} ${symbol}`,
      completedCalculation: null
    };
  }

  if (state.pendingOperator && state.waitingForOperand) {
    return {
      ...state,
      pendingOperator: operator,
      expression: `${formatNumericValue(state.previousValue)} ${symbol}`,
      completedCalculation: null
    };
  }

  if (state.pendingOperator && state.previousValue !== null) {
    try {
      const left = state.previousValue;
      const right = Number(state.currentInput);
      const result = calculateBinaryOperation(left, state.pendingOperator, right);

      return {
        ...state,
        currentInput: normalizeNumber(result),
        previousValue: result,
        pendingOperator: operator,
        waitingForOperand: true,
        hasCalculated: false,
        expression: `${formatNumericValue(result)} ${symbol}`,
        completedCalculation: null
      };
    } catch (error) {
      return createErrorState(state, error.message);
    }
  }

  const value = Number(state.currentInput);

  return {
    ...state,
    previousValue: value,
    pendingOperator: operator,
    waitingForOperand: true,
    hasCalculated: false,
    lastOperator: null,
    lastOperand: null,
    expression: `${formatNumericValue(value)} ${symbol}`,
    completedCalculation: null
  };
}

export function calculateResult(state) {
  if (state.error) {
    return state;
  }

  const hasNewOperation = state.pendingOperator && state.previousValue !== null && !state.waitingForOperand;
  const hasRepeatedOperation = !state.pendingOperator && state.lastOperator && state.lastOperand !== null;

  if (!hasNewOperation && !hasRepeatedOperation) {
    return state;
  }

  const operator = hasNewOperation ? state.pendingOperator : state.lastOperator;
  const left = hasNewOperation ? state.previousValue : Number(state.currentInput);
  const right = hasNewOperation ? Number(state.currentInput) : state.lastOperand;

  try {
    const result = calculateBinaryOperation(left, operator, right);
    const expression = `${formatNumericValue(left)} ${OPERATOR_SYMBOLS[operator]} ${formatNumericValue(right)} =`;
    const completedCalculation = {
      expression,
      result: formatNumericValue(result)
    };

    return {
      ...state,
      currentInput: normalizeNumber(result),
      previousValue: null,
      pendingOperator: null,
      waitingForOperand: true,
      hasCalculated: true,
      lastOperator: operator,
      lastOperand: right,
      expression,
      error: null,
      completedCalculation
    };
  } catch (error) {
    return createErrorState(state, error.message);
  }
}

export function clearCalculator() {
  return createInitialState();
}

export function deleteLastCharacter(state) {
  if (state.error) {
    return createInitialState();
  }

  if (state.waitingForOperand || state.hasCalculated) {
    return state;
  }

  const shortenedInput = state.currentInput.slice(0, -1);
  const nextInput = shortenedInput === "" || shortenedInput === "-" ? "0" : shortenedInput;

  return {
    ...state,
    currentInput: nextInput,
    completedCalculation: null
  };
}

export function toggleSign(state) {
  if (state.error || state.waitingForOperand || state.currentInput === "0") {
    return state;
  }

  const currentInput = state.currentInput.startsWith("-")
    ? state.currentInput.slice(1)
    : `-${state.currentInput}`;

  return {
    ...state,
    currentInput,
    completedCalculation: null
  };
}

export function applyPercent(state) {
  if (state.error || state.waitingForOperand) {
    return state;
  }

  const percentValue = Number(state.currentInput) / 100;

  return {
    ...state,
    currentInput: normalizeNumber(percentValue),
    hasCalculated: false,
    expression: state.hasCalculated ? "" : state.expression,
    lastOperator: state.hasCalculated ? null : state.lastOperator,
    lastOperand: state.hasCalculated ? null : state.lastOperand,
    completedCalculation: null
  };
}

export function pressKey(state, key) {
  if (/^\d$/.test(key)) {
    return inputDigit(state, key);
  }

  if (key === "." || key === ",") {
    return inputDecimal(state);
  }

  const operatorKeys = {
    "+": "add",
    "-": "subtract",
    "*": "multiply",
    "x": "multiply",
    "X": "multiply",
    "/": "divide",
    "÷": "divide"
  };

  if (Object.hasOwn(operatorKeys, key)) {
    return chooseOperator(state, operatorKeys[key]);
  }

  if (key === "Enter" || key === "=") {
    return calculateResult(state);
  }

  if (key === "Escape" || key === "Delete") {
    return clearCalculator();
  }

  if (key === "Backspace") {
    return deleteLastCharacter(state);
  }

  if (key === "%") {
    return applyPercent(state);
  }

  return state;
}

export function formatEntryValue(input) {
  const [wholePart, decimalPart] = input.split(".");
  const isNegative = wholePart.startsWith("-");
  const unsignedWholePart = isNegative ? wholePart.slice(1) : wholePart;
  const groupedWholePart = Number(unsignedWholePart || "0").toLocaleString("en-US");
  const sign = isNegative ? "−" : "";

  return decimalPart === undefined
    ? `${sign}${groupedWholePart}`
    : `${sign}${groupedWholePart}.${decimalPart}`;
}

export function formatNumericValue(value) {
  return Number(value).toLocaleString("en-US", {
    maximumFractionDigits: 12,
    maximumSignificantDigits: 15
  });
}

export function getStatusMessage(state) {
  if (state.error) {
    return state.error;
  }

  if (state.pendingOperator) {
    return `Waiting for the second number. ${OPERATOR_SYMBOLS[state.pendingOperator]} is selected.`;
  }

  return state.hasCalculated ? `Result: ${formatNumericValue(state.currentInput)}` : "Ready for input.";
}

function normalizeNumber(value) {
  const rounded = Number.parseFloat(Number(value).toPrecision(12));
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

function roundCalculatorResult(value) {
  const rounded = Number.parseFloat(Number(value).toPrecision(12));
  return Object.is(rounded, -0) ? 0 : rounded;
}

function createErrorState(state, message) {
  return {
    ...state,
    currentInput: "0",
    previousValue: null,
    pendingOperator: null,
    waitingForOperand: false,
    hasCalculated: false,
    lastOperator: null,
    lastOperand: null,
    error: message,
    completedCalculation: null
  };
}
