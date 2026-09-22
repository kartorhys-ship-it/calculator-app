# Stage 02 — Scope and acceptance

This stage defines what the first version promises. A feature belongs in the scope only when we can describe how to recognize that it works.

## Goal

Build a polished browser calculator with four basic operations. Keep the behavior visible through small, named functions so another person can follow the code.

## Included in this version

- Digits `0`–`9`
- Decimal point
- Addition, subtraction, multiplication, and division
- Equals and repeated equals
- Clear, delete, sign toggle, and percent
- Keyboard input, including `C`/`c` to clear the current calculation
- A readable error for division by zero and non-finite results
- Calculation history for the current browser session
- A responsive layout with visible keyboard and focus behavior
- Unit tests for the pure calculator engine

## Deliberately outside this version

- Full expression parsing or parentheses
- Scientific functions
- Memory registers
- Database or server storage
- User accounts
- History that survives a new browser session
- Multiple display locales

## What the app guarantees

Within normal JavaScript number limits, the app aims to handle the listed operations and input actions correctly. It does not promise arbitrary-precision mathematics or the operator precedence used by a full algebraic expression parser.

## Acceptance checks

These are the observable checks used to decide whether the scope is met:

1. Entering `12.5 + 7.5 =` shows `20`.
2. Entering `8 + 2 × 3 =` shows `30`, following the documented entry-order rule.
3. Pressing equals twice repeats the last operation.
4. A second decimal point is ignored.
5. Delete removes the last typed character.
6. Percent changes `25` to `0.25`.
7. Sign changes `12` to `-12`.
8. `9 ÷ 0 =` shows a readable error rather than `Infinity`.
9. Keyboard and mouse input produce the same engine results.
10. Completed calculations appear in session history and the history can be cleared.
11. `npm test` passes from the app folder.
12. The page remains usable on narrow screens and shows a visible focus ring.
13. Pressing `C` or `c` clears the current calculation without clearing session history.
