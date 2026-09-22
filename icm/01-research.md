# Stage 01 — Research and behavior extraction

This stage answers one question: **What do we need to understand before building a small calculator that is safe, keyboard-friendly, and easy to explain?**

The research is deliberately small. It covers the platform rules that affect the design, then turns the expected calculator behavior into explicit assumptions.

## What the platform documentation tells us

### 1. Use real buttons

Native HTML buttons already represent interactive controls. Accessibility guidance recommends concise names and visible text when the visible text already names the control.

That is why the calculator uses real `<button>` elements and adds accessible labels for controls that use symbols such as `÷` or `±`.

- [WAI: Providing Accessible Names and Descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
- [WAI: Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WHATWG: HTML form elements](https://html.spec.whatwg.org/multipage/form-elements.html)

### 2. Keyboard events give us the key the user pressed

`KeyboardEvent.key` contains user-facing values such as `Enter`, `Escape`, `Backspace`, `C`, and `c`. The app can map those values to the same engine actions used by mouse clicks.

- [MDN: KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key)

### 3. The calculator should not evaluate a raw expression

JavaScript has its own operator precedence, but this app does not pass a string such as `8 + 2 * 3` to a JavaScript evaluator. It follows the simpler behavior of a basic pocket calculator: operations are completed in the order the user presses them.

- [MDN: Operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence)

### 4. Formatting should not destroy what the user is typing

`Intl.NumberFormat` and `Number.prototype.toLocaleString()` can format completed numbers. The app uses a fixed `en-US` format for predictable grouping in this learning project. It keeps the current entry as text so an unfinished value such as `1.` remains visible while the user is typing.

- [MDN: Number.prototype.toLocaleString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)

## Behavior extracted for this version

No reference calculator was supplied, so the target behavior is an explicit reconstruction of a common four-function pocket calculator:

- A typed number stays as text until an operation needs its numeric value.
- Choosing an operator remembers the left value and waits for the right value.
- Choosing another operator completes the pending operation first.
- Equals completes the pending operation.
- Pressing equals again repeats the last operator and operand.
- Percent divides the current entry by 100.
- Clear, including `C`/`c`, resets the working calculation without clearing session history.
- Division by zero becomes a readable error state.

## Design assumptions

- The user wants a browser UI rather than a command-line calculator.
- The first version should be easy to explain to someone who is not a programmer.
- A small dependency-free app is a better fit for this teaching goal than a framework-heavy setup.
- Session history is useful, but saving it between browser sessions is outside the first version.

## Questions intentionally left for later

These are scope decisions for a future version, not unfinished requirements for this one:

- Scientific operations, parentheses, memory buttons, and algebraic operator precedence.
- Locale switching and currency formatting.
- Durable history across browser sessions.
