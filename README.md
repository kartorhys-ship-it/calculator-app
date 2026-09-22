# Orbit Calculator

Orbit Calculator is a small, browser-based four-function calculator built as a reverse-engineering exercise. The implementation is intentionally plain HTML, CSS, and JavaScript so the behavior is visible instead of hidden behind a framework.

## Live demo

Open the calculator in your browser: **[Launch Orbit Calculator](https://kartorhys-ship-it.github.io/calculator-app/)**

No installation is needed for the live version. It is published from this repository with GitHub Pages.

## AI use disclosure

I used AI assistance to research, plan, implement, test, document, and present this project. I directed the scope and reviewed the resulting code, behavior, documentation, and UI. The automated tests and manual browser checks recorded in this repository are part of that review.

## Run it

From this folder, start any local static web server. One option is:

```text
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

The JavaScript module must be served over HTTP rather than opened directly as a `file://` page.

## Run the tests

```text
npm test
```

## Supported behavior

- Digits `0`–`9`
- Decimal input with one decimal point per number
- Addition, subtraction, multiplication, and division
- Percent as “divide the current number by 100”
- Positive/negative toggle
- Delete the last typed character
- Clear the current calculation
- Repeated equals repeats the last operation
- Keyboard input: digits, `.`, `+`, `-`, `*`, `/`, `%`, `Enter`, `Escape`, `Delete`, `Backspace`, and `C`/`c` to clear
- A session-only calculation history
- Division-by-zero and non-finite result errors

## Important rule

This is modeled as a basic pocket calculator: operations are resolved in the order entered. For example, `8 + 2 × 3` becomes `30`, because `8 + 2` is completed when the multiplication button is pressed. It is not a full algebraic expression parser.

## Code anatomy

### `src/calculator-engine.js`

The engine is the calculator’s brain. It owns the state and the rules. Each user action is a small function that receives a state and returns a new state:

- `inputDigit` — add one digit to the current number
- `inputDecimal` — add a decimal point when one is not already present
- `chooseOperator` — remember an operation or finish a chained operation
- `calculateResult` — finish the current operation or repeat the last one
- `clearCalculator` — return to the initial state
- `deleteLastCharacter` — remove the last typed character
- `toggleSign` — switch between positive and negative
- `applyPercent` — divide the current number by 100
- `pressKey` — translate keyboard keys into the same actions as buttons

The engine does not know that a browser exists. That separation is what makes the rules testable.

### `src/app.js`

The app module is the translator between the engine and the page. It wires button clicks and keyboard events to engine functions, then renders the returned state into the display and history panel.

### `index.html`

The HTML is the visible structure: display, keypad, history, and keyboard hints. Native `<button>` elements give the controls meaningful keyboard and assistive-technology behavior.

### `styles.css`

The stylesheet owns visual design, responsive layout, focus styles, reduced-motion behavior, and light-touch visual hierarchy. It does not contain calculator rules.

## Reverse-engineering vocabulary

When explaining the code to another person, use this simple mapping:

| Product idea | Code idea |
| --- | --- |
| What the calculator currently knows | `state` |
| A thing the user does | an action function |
| The calculator’s rules | `calculator-engine.js` |
| The screen’s current picture | `render()` |
| A stored past answer | `history` |
| A proof that a rule works | a test in `calculator-engine.test.js` |

The full ICM reasoning trail lives in [`icm/ICM.md`](./icm/ICM.md).
