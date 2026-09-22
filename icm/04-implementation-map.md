# Stage 04 — Implementation map

This page gives a reader a direct route from something the user does to the code that handles it and the check that supports it.

## User action → code → proof

| What the user does | Rule in the engine | Browser entry point | Check or evidence |
|---|---|---|---|
| Types a digit | `inputDigit` | Keypad `data-action="digit"` or keyboard | Leading-zero test |
| Adds a decimal point | `inputDecimal` | Keypad `data-action="decimal"` or `.` key | One-decimal test |
| Chooses an operation | `chooseOperator` | Operator button or `+ - * /` key | Chaining test |
| Calculates a result | `calculateResult` | Equals button or Enter | Arithmetic and repeat-equals tests |
| Clears the calculation | `clearCalculator` | AC, Escape, Delete, or `C`/`c` | Reset and keyboard-clear tests |
| Deletes one character | `deleteLastCharacter` | DEL or Backspace | Delete test |
| Changes the sign | `toggleSign` | ± button | Sign test |
| Applies percent | `applyPercent` | % button or `%` key | Percent test |
| Presses a keyboard key | `pressKey` | `handleKeyboardInput` | Keyboard-equivalence test |
| Shows a typed number | `formatEntryValue` | `render` | Formatting test |
| Shows status or an error | `getStatusMessage` | `render` | UI accessibility state |

## What the UI functions do

- `findElements` collects the page elements once.
- `bindEvents` attaches click and keyboard listeners.
- `handleButtonClick` reads a button's data attributes and turns them into an action.
- `handleKeyboardInput` filters supported keys and sends them to the same engine path.
- `performAction` sends a button action to the matching engine function.
- `recordCompletedCalculation` adds a newly completed result to session history.
- `clearHistory` clears only the history panel.
- `render` updates the display and status message.
- `renderHistory` rebuilds the history list from the stored entries.

## Why the split helps

If the color or layout changes, the engine does not need to change. If a math rule changes, the HTML does not need to change. If a test fails, the function name points toward the rule responsible.
