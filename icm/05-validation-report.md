# Stage 05 — Validation and handoff

This stage records what was checked, what the results support, and what remains outside the evidence.

## Automated check

Run this command from the app folder:

```text
npm test
```

Observed result on 2026-09-22: **11 tests passed, 0 failed.**

The engine tests cover:

- The initial state.
- Digits and leading-zero behavior.
- Decimal entry.
- The four binary operations.
- Chained operations in entry order.
- Repeated equals.
- Division-by-zero errors.
- Clear, delete, sign, and percent.
- Keyboard mapping, including the `C`/`c` clear shortcut.
- Display formatting.

## Manual checks recorded

- [x] The page has a display, keypad, history panel, and keyboard hints.
- [x] Native buttons are used for actions.
- [x] Symbol-only operations have readable accessible labels.
- [x] Focus-visible outlines are present.
- [x] The layout collapses to one column on narrow screens.
- [x] Reduced-motion users do not receive unnecessary transitions.
- [x] The app avoids `eval` and does not execute user-entered text.
- [x] History is limited to the current browser session.

These checks come from the recorded manual validation work. A later change should rerun any manual check whose assumptions it affects.

## Feature status

| Feature | Status | Supporting evidence |
|---|---|---|
| Four operations | Implemented | Engine tests and UI controls |
| Decimal input | Implemented | Engine test |
| Percent | Implemented | Engine test |
| Sign toggle | Implemented | Engine test |
| Delete and clear | Implemented | Engine tests and UI controls |
| Repeated equals | Implemented | Engine test |
| Keyboard input | Implemented | `pressKey` test and event map, including `C`/`c` clear |
| Error state | Implemented | Division-by-zero test |
| Session history | Implemented | App state and history rendering |
| Scientific math | Unsupported | Outside the defined scope |
| Parentheses or precedence parser | Unsupported | Outside the defined scope |
| Persistent history | Unsupported | Outside the defined scope |

## Known limitation

The calculator follows the order in which operations are pressed. That is a product decision, not an accidental parser bug. A future version could use a tokenizer and a precedence-aware evaluator, but that would be a new scope decision with a new set of tests.

## Handoff

The implementation is complete for the stated v1 scope. To understand it, start with [`README.md`](../README.md), then read [`src/calculator-engine.js`](../src/calculator-engine.js), [`src/app.js`](../src/app.js), and the ICM documents.

The EEM demonstration for the `C`/`c` shortcut is recorded in [`06-eem-work-record.md`](06-eem-work-record.md). Its automated verification passed; its human explanation check remains pending until the owner can explain the relevant boundaries in their own words.
