# Stage 03 — Architecture and Function Boundaries

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

## State model

| Field | Meaning |
| --- | --- |
| `currentInput` | The number currently being typed, kept as text |
| `previousValue` | The left side of a pending operation |
| `pendingOperator` | The operation waiting for a right-side number |
| `waitingForOperand` | Whether the next digit should start a new number |
| `hasCalculated` | Whether the current display is a completed result |
| `lastOperator` / `lastOperand` | The pair used by repeated equals |
| `expression` | Small display line for the current or completed calculation |
| `error` | A user-readable failure message, when present |
| `completedCalculation` | A one-action signal for adding a result to history |

## Ownership rules

- The engine owns calculator rules and never touches the DOM.
- The app owns event listeners, DOM updates, and session history.
- The HTML owns semantic structure and accessible labels.
- The stylesheet owns visual design only.
- Tests call engine functions directly, so UI rendering is not required to prove arithmetic behavior.

## Arithmetic decision

The engine performs one binary operation at a time. This is deliberate: it is a smaller, more interpretable model than accepting a raw expression string. User input is never executed as code.

## Error behavior

Invalid operators, division by zero, and non-finite results become a calculator error state. The UI displays “Error” while the accessible status message explains the cause. Clear or the next digit returns the calculator to a usable state.

## Formatting decision

Typed entries remain strings so incomplete values like `0.` are not destroyed by number conversion. Completed numbers are rounded to a practical 12 significant digits and formatted with `en-US` grouping.
