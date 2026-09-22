# EEM Work Record — Add the `C`/`c` clear shortcut

This record shows how one small change moves through EEM. It keeps the goal, code boundary, checks, and remaining human explanation in one place.

## The change

**Outcome:** A keyboard user can clear the current calculation by pressing `C` or `c`. The existing Escape, Delete, and AC controls keep working as before.

**Workflow:** Feature or behavior change in an existing system.

**Rigor:** Lightweight. The change is local and reversible. It uses the calculator's existing keyboard path and does not change stored data, arithmetic rules, or external interfaces.

**Related documents:** [`02-scope.md`](02-scope.md), [`04-implementation-map.md`](04-implementation-map.md), and [`README.md`](../README.md).

## Scope and contract

### Included

- Accept `C` and `c` from the browser keyboard.
- Send both keys through the same clear behavior used by Escape and Delete.
- Keep the existing button behavior and other keyboard shortcuts unchanged.

### Excluded

- Changing what the clear action does.
- Clearing session history when `C`/`c` is pressed.
- Adding a new UI control.

### Contract in plain language

When the browser reports `C` or `c`, the app resets the current calculation to its initial state. The history panel stays as it is.

## Acceptance criteria

The change is acceptable when:

1. `pressKey(state, "C")` returns the initial calculator state.
2. `pressKey(state, "c")` returns the initial calculator state.
3. The browser input filter passes both keys to `pressKey`.
4. Escape, Delete, AC, and the other keyboard shortcuts keep their existing behavior.
5. The README and implementation map describe the new shortcut.

## Path through the code

| Requirement | Code boundary | Check |
|---|---|---|
| `C`/`c` clears the calculation | `src/calculator-engine.js` → `pressKey` → `clearCalculator` | Keyboard-clear test |
| The browser accepts both keys | `src/app.js` → `handleKeyboardInput` | Source inspection and the keyboard path |
| Existing clear behavior remains | `clearCalculator` and existing clear controls | Existing test suite |

## Verification

Command:

```text
npm test
```

Result: **11 tests passed, 0 failed** on 2026-09-22.

The new keyboard-clear test passed with the existing suite. The test proves the engine behavior. Source inspection confirms that the browser event filter allows both key values.

## Human explanation check

Pending. The owner should be able to explain:

- Why `pressKey()` handles the product meaning of `C`/`c`.
- Why `handleKeyboardInput()` must allow those key values through the browser filter.
- Why clearing the current calculation does not clear session history.

An assistant's explanation can help prepare for this walkthrough, but it does not complete the check on the owner's behalf.

## Status

- **Implementation:** complete
- **Verification:** passed for the listed automated checks
- **Human explanation:** pending
- **Work disposition:** ready for the human explanation check
- **Release:** not requested
