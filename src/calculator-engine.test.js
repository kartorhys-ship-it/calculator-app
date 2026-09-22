import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyPercent,
  calculateBinaryOperation,
  calculateResult,
  chooseOperator,
  clearCalculator,
  createInitialState,
  deleteLastCharacter,
  formatEntryValue,
  inputDecimal,
  inputDigit,
  pressKey,
  toggleSign
} from "./calculator-engine.js";

function typeDigits(state, digits) {
  return [...digits].reduce(inputDigit, state);
}

test("starts with a clean zero state", () => {
  assert.deepEqual(createInitialState(), {
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
  });
});

test("enters digits without allowing leading zero noise", () => {
  let state = createInitialState();
  state = inputDigit(state, "0");
  state = inputDigit(state, "4");
  state = inputDigit(state, "2");
  assert.equal(state.currentInput, "42");
});

test("supports one decimal point and preserves a trailing decimal while typing", () => {
  let state = inputDigit(createInitialState(), "1");
  state = inputDecimal(state);
  state = inputDecimal(state);
  state = inputDigit(state, "5");
  assert.equal(state.currentInput, "1.5");
});

test("calculates the four binary operations", () => {
  assert.equal(calculateBinaryOperation(8, "add", 2), 10);
  assert.equal(calculateBinaryOperation(8, "subtract", 2), 6);
  assert.equal(calculateBinaryOperation(8, "multiply", 2), 16);
  assert.equal(calculateBinaryOperation(8, "divide", 2), 4);
});

test("chains operations in the order entered, like a basic pocket calculator", () => {
  let state = typeDigits(createInitialState(), "8");
  state = chooseOperator(state, "add");
  state = typeDigits(state, "2");
  state = chooseOperator(state, "multiply");
  state = typeDigits(state, "3");
  state = calculateResult(state);

  assert.equal(state.currentInput, "30");
  assert.equal(state.completedCalculation.result, "30");
});

test("repeats the last operation when equals is pressed again", () => {
  let state = typeDigits(createInitialState(), "5");
  state = chooseOperator(state, "add");
  state = typeDigits(state, "2");
  state = calculateResult(state);
  state = calculateResult(state);

  assert.equal(state.currentInput, "9");
});

test("returns a readable error instead of producing Infinity", () => {
  let state = typeDigits(createInitialState(), "9");
  state = chooseOperator(state, "divide");
  state = typeDigits(state, "0");
  state = calculateResult(state);

  assert.equal(state.error, "Cannot divide by zero.");
  assert.equal(state.currentInput, "0");
});

test("clear, delete, sign, and percent each have one focused behavior", () => {
  let state = typeDigits(createInitialState(), "120");
  state = deleteLastCharacter(state);
  assert.equal(state.currentInput, "12");

  state = toggleSign(state);
  assert.equal(state.currentInput, "-12");

  state = applyPercent(state);
  assert.equal(state.currentInput, "-0.12");

  state = clearCalculator();
  assert.equal(state.currentInput, "0");
});

test("keyboard input maps to the same engine actions as buttons", () => {
  let state = createInitialState();
  for (const key of ["6", "+", "7", "Enter"]) {
    state = pressKey(state, key);
  }

  assert.equal(state.currentInput, "13");
});

test("C and c clear the current calculation through the keyboard path", () => {
  let state = typeDigits(createInitialState(), "42");
  state = pressKey(state, "+");
  state = pressKey(state, "C");

  assert.deepEqual(state, createInitialState());

  state = typeDigits(state, "17");
  state = pressKey(state, "c");

  assert.deepEqual(state, createInitialState());
});

test("formats typed values without losing a trailing decimal", () => {
  assert.equal(formatEntryValue("1234"), "1,234");
  assert.equal(formatEntryValue("1234.5"), "1,234.5");
  assert.equal(formatEntryValue("-0.5"), "−0.5");
});
