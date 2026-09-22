# Stage 02 — Scope and Acceptance

## Goal

Build a polished, browser-based, four-function calculator whose behavior can be understood from small, named functions.

## In scope

- Digits 0–9
- Decimal point
- Addition, subtraction, multiplication, division
- Equals and repeated equals
- Clear, delete, sign toggle, percent
- Keyboard input
- `C`/`c` keyboard shortcut for clearing the current calculation
- Error state for division by zero and non-finite results
- Session calculation history
- Responsive and keyboard-visible UI
- Unit tests for the pure calculator engine

## Explicit non-goals

- Full expression parsing or parentheses
- Scientific functions
- Memory registers
- Database or server storage
- User accounts
- Cross-session history persistence
- Multiple locales

## Guarantee statement

The app guarantees correct behavior for the listed four operations and input actions within normal JavaScript numeric limits. It does not promise arbitrary-precision math or algebraic operator precedence.

## Acceptance checks

1. A user can enter `12.5 + 7.5 =` and see `20`.
2. A user can enter `8 + 2 × 3 =` and see `30`, matching the documented entry-order rule.
3. Pressing equals twice repeats the last operation.
4. A second decimal point is ignored.
5. Delete removes the last typed character.
6. Percent changes `25` to `0.25`.
7. Sign changes `12` to `-12`.
8. `9 ÷ 0 =` shows a readable error and does not show `Infinity`.
9. Keyboard and mouse input produce the same engine results.
10. Completed calculations appear in session history and can be cleared.
11. `npm test` passes from the app folder.
12. The page remains usable on narrow screens and shows a visible focus ring.
13. Pressing `C` or `c` clears the current calculation without clearing session history.
