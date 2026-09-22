# EEM Work Record — Add `C`/`c` clear shortcut

## Context

**Outcome:** Let a keyboard user clear the current calculation by pressing `C` or `c`, while keeping the existing Escape, Delete, and AC controls unchanged.

**Mode:** Feature or behavior change in an existing system.

**Rigor:** Lightweight. The change is local, reversible, and uses the calculator's existing keyboard path. It does not change stored data, arithmetic rules, or external interfaces.

**Related scope:** [`icm/02-scope.md`](02-scope.md) and the keyboard behavior described in [`README.md`](../README.md).

## Scope and contract

### Included

- Accept `C` and `c` from the browser keyboard.
- Route both keys through the same clear behavior used by Escape and Delete.
- Keep the existing button behavior and other keyboard shortcuts unchanged.

### Excluded

- Changing what the clear action does.
- Clearing session history when `C`/`c` is pressed.
- Adding a new UI control.

### Contract

When `KeyboardEvent.key` is `C` or `c`, the app resets the current calculation to the initial calculator state. The history panel remains unchanged.

## Acceptance criteria

1. `pressKey(state, "C")` returns the initial calculator state.
2. `pressKey(state, "c")` returns the initial calculator state.
3. The browser event filter passes both keys to `pressKey`.
4. Escape, Delete, AC, and the other keyboard shortcuts keep their existing behavior.
5. The README and implementation map describe the new shortcut.

## Implementation map

| Requirement | Code boundary | Verification |
|---|---|---|
| `C`/`c` clears the calculation | `src/calculator-engine.js` → `pressKey` → `clearCalculator` | Keyboard clear test |
| Browser accepts both keys | `src/app.js` → `handleKeyboardInput` | Source inspection plus the same keyboard test path |
| Existing clear behavior remains | `clearCalculator` and existing clear controls | Existing test suite |

## Verification

Command:

```text
npm test
```

Result: 11 tests passed, 0 failed on 2026-09-22.

Evidence: `npm test` from the app folder; the new keyboard clear test passed along with the existing suite.

## Human explanation check

Pending. The owner should be able to explain why the shortcut belongs in both `pressKey` and `handleKeyboardInput`, and why it clears the current calculation without clearing history.

## Status

- Implementation: complete
- Verification: passed for the listed automated checks
- Human explanation: pending
- Work disposition: ready for human explanation check
- Release: not requested
