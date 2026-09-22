# Stage 04 — Implementation Map

## Required action-to-function map

| User action | Engine function | UI entry point | Proof |
| --- | --- | --- | --- |
| Type a digit | `inputDigit` | keypad `data-action="digit"` or keyboard | leading-zero test |
| Add decimal point | `inputDecimal` | keypad `data-action="decimal"` or `.` key | one-decimal test |
| Choose operation | `chooseOperator` | operator button or `+ - * /` key | chaining test |
| Calculate | `calculateResult` | equals button or Enter | arithmetic and repeat-equals tests |
| Clear | `clearCalculator` | AC, Escape, Delete | reset test |
| Delete one character | `deleteLastCharacter` | DEL, Backspace | delete test |
| Change sign | `toggleSign` | ± button | sign test |
| Apply percent | `applyPercent` | % button or `%` key | percent test |
| Translate a key | `pressKey` | `handleKeyboardInput` | keyboard equivalence test |
| Show typed number | `formatEntryValue` | `render` | formatting test |
| Show status | `getStatusMessage` | `render` | UI accessibility state |

## UI functions

- `findElements` — collect the DOM nodes once.
- `bindEvents` — attach click and keyboard listeners.
- `handleButtonClick` — translate a button’s data attributes.
- `handleKeyboardInput` — translate a supported keyboard key.
- `performAction` — dispatch a button action to the engine.
- `recordCompletedCalculation` — add a newly completed result to session history.
- `clearHistory` — clear only the history panel.
- `render` — update the display and status.
- `renderHistory` — rebuild the small history list from data.

## Why the separation matters

If the color or layout changes, the engine does not need to change. If a math rule changes, the HTML does not need to change. If a test fails, the function name points directly to the rule responsible.
