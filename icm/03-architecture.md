# Stage 03 — Architecture and function boundaries

This stage answers: **Which part of the project owns each responsibility?**

The app uses two main layers. The engine knows the calculator rules. The app module knows the browser page. Keeping those jobs separate makes the system easier to test and explain.

## Data flow

```text
button click / keyboard key
          |
          v
   app.js translates intent
          |
          v
calculator-engine.js returns new state
          |
          v
   app.js renders display + history
```

In plain language: the page reports what the user did, the engine decides what that means, and the page shows the new state.

## What the state fields mean

| Field | Plain meaning |
|---|---|
| `currentInput` | The number currently being typed, kept as text so values such as `0.` survive |
| `previousValue` | The left side of an operation that is waiting for another number |
| `pendingOperator` | The operation waiting for its right-side number |
| `waitingForOperand` | Whether the next digit should start a new number |
| `hasCalculated` | Whether the display currently shows a completed result |
| `lastOperator` / `lastOperand` | The pair used when the user presses equals again |
| `expression` | The small line that shows the current or completed calculation |
| `error` | A readable failure message, when one exists |
| `completedCalculation` | A one-action signal that tells the UI to add a result to history |

## Who owns what?

- **The engine** owns calculator rules and never touches the DOM.
- **The app module** owns event listeners, DOM updates, and session history.
- **The HTML** owns semantic structure and accessible labels.
- **The stylesheet** owns visual design only.
- **The tests** call engine functions directly, so arithmetic behavior can be checked without rendering a browser page.

## Arithmetic decision

The engine performs one binary operation at a time. This is a deliberate, smaller model than accepting a raw expression string. User input is never executed as code.

For example, `8 + 2 × 3` becomes `30`: pressing `×` completes `8 + 2` before the multiplication starts.

## Error behavior

Unknown operators, division by zero, and non-finite results become a calculator error state. The UI displays “Error” while the accessible status message explains the cause. Clear, the next digit, or the `C`/`c` shortcut returns the calculator to a usable state.

## Formatting decision

Typed entries remain strings so incomplete values such as `0.` are not destroyed by number conversion. Completed numbers are rounded to a practical 12 significant digits and formatted with `en-US` grouping.
