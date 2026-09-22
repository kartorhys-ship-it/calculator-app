---
type: icm-method
name: reverse-engineered-calculator
form: pipeline
status: complete-with-explicit-scope
---

# ICM — Reverse-Engineered Calculator

ICM here means Interpretable Context Methodology: every implementation decision is connected to a visible requirement, a small code boundary, and an observable check.

## Pipeline

| Stage | Question | Output | Gate |
| --- | --- | --- | --- |
| 01 Research | What behaviors and platform rules matter? | `01-research.md` | Sources and assumptions are separated |
| 02 Scope | What exactly is in the first version? | `02-scope.md` | Every promise has an acceptance check |
| 03 Architecture | Where should each rule live? | `03-architecture.md` | UI and engine responsibilities do not leak |
| 04 Implementation | Did each required action become a named function? | `04-implementation-map.md` | Function map matches the product behavior |
| 05 Validation | Does the result work and remain understandable? | `05-validation-report.md` | Tests and manual checks agree with the claims |

## Context loading rule

Each stage reads the previous stage’s handoff plus only the references it needs. Facts, decisions, assumptions, and open questions are labeled rather than blended together.

## Final context

- The app is a client-side static web app.
- It uses a pure state-transition engine plus a DOM adapter.
- It intentionally models a basic pocket calculator, not a full expression parser.
- The supported behavior and exclusions are in [`02-scope.md`](./02-scope.md).
- The function ownership map is in [`04-implementation-map.md`](./04-implementation-map.md).
- The evidence is in [`05-validation-report.md`](./05-validation-report.md).
