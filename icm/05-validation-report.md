# Stage 05 — Validation and Handoff

## Automated validation

Command:

```text
npm test
```

Observed result on 2026-09-22: 10 tests passed, 0 failed.

The engine test suite covers:

- Initial state
- Digits and leading zero behavior
- Decimal entry
- Four binary operations
- Chained entry-order operations
- Repeated equals
- Division-by-zero error handling
- Clear, delete, sign, and percent
- Keyboard mapping
- Display formatting

## Manual validation checklist

- [x] The page has a display, keypad, history panel, and keyboard hints.
- [x] Native buttons are used for actions.
- [x] Symbol-only operations have readable accessible labels.
- [x] Focus-visible outlines are present.
- [x] The layout collapses to one column on narrow screens.
- [x] Reduced-motion users do not receive unnecessary transitions.
- [x] The app avoids `eval` and does not execute user-entered text.
- [x] History is limited to the current browser session.

## Feature matrix

| Feature | Status | Evidence |
| --- | --- | --- |
| Four operations | Implemented | engine tests + UI controls |
| Decimal input | Implemented | engine test |
| Percent | Implemented | engine test |
| Sign toggle | Implemented | engine test |
| Delete and clear | Implemented | engine test + UI controls |
| Repeated equals | Implemented | engine test |
| Keyboard input | Implemented | `pressKey` test + event map |
| Error state | Implemented | division-by-zero test |
| Session history | Implemented | app state + history rendering |
| Scientific math | Unsupported | explicitly out of scope |
| Parentheses / precedence parser | Unsupported | explicitly out of scope |
| Persistent history | Unsupported | explicitly out of scope |

## Known limitation

The calculator follows the order in which operations are pressed. That is a product decision, not an accidental parser bug. A future version could replace the engine’s one-operation model with a tokenizer and precedence-aware evaluator, but that would be a new scope decision and a new test surface.

## Handoff

The implementation is complete for the stated v1 scope. Start with `README.md`, then read `src/calculator-engine.js`, then `src/app.js`, and finally the ICM documents if you want to explain both the code and the reasoning process.
