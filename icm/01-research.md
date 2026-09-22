# Stage 01 — Research and Behavior Extraction

## Research question

What knowledge is required to make a small calculator understandable, safe, keyboard-friendly, and testable?

## Evidence from platform documentation

1. Native HTML buttons already represent labeled interactive controls. WAI recommends concise accessible names and prefers visible text when it names the control. The calculator therefore uses real `<button>` elements and explicit labels for symbol-only controls.
   - [WAI: Providing Accessible Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
   - [WAI: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
   - [WHATWG: HTML form elements](https://html.spec.whatwg.org/multipage/form-elements.html)

2. `KeyboardEvent.key` represents the user-facing key value, including printable characters and named keys such as `Enter`, `Escape`, and `Backspace`. The app maps those key values to the same engine actions used by clicks.
   - [MDN: KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

3. JavaScript arithmetic follows language operator precedence, but this app does not use a JavaScript expression evaluator. It chooses and documents the simpler “operation as entered” behavior of a basic pocket calculator.
   - [MDN: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

4. `Intl.NumberFormat`/`Number.prototype.toLocaleString()` provide locale-aware number formatting. The app uses a fixed `en-US` formatter for predictable grouping in this learning project and keeps typed input separate so `1.` remains visible while the user is entering it.
   - [MDN: Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)
   - [MDN: CSS color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme)

## Behavior extraction

No reference calculator was supplied, so the target behavior is an explicit reconstruction of a common four-function pocket calculator:

- A number is typed as a string until an operation needs its numeric value.
- Choosing an operator remembers the left value and waits for the right value.
- Choosing another operator completes the pending operation first.
- Equals completes the pending operation.
- Equals again repeats the last operator and operand.
- Percent divides the current entry by 100.
- Clear resets the working calculation.
- Division by zero becomes a readable error state.

## Design assumptions

- The user wants a browser UI, not a command-line calculator.
- The first version should be easy to explain to a non-coder.
- A small, dependency-free app is preferable to a framework for this teaching goal.
- Session history is useful, but persistence is not required for the first version.

## Open questions intentionally deferred

- Scientific operations, parentheses, memory buttons, and algebraic operator precedence.
- Locale switching and currency formatting.
- Durable history across browser sessions.
