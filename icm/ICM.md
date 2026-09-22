---
type: icm-method
name: reverse-engineered-calculator
form: pipeline
status: complete-with-explicit-scope
---

# ICM — Reverse-Engineered Calculator

ICM means **Interpretable Context Methodology** in this project. The idea is simple: connect each important product decision to a small part of the code and to a check that can show whether the behavior works.

## How the project is organized

The documents follow the same order as the work:

| Stage | Plain-language question | Document | Gate |
|---|---|---|---|
| 01 Research | What behavior and platform rules do we need to understand? | `01-research.md` | Sources and assumptions are clearly separated |
| 02 Scope | What belongs in this version, and what does not? | `02-scope.md` | Every promise has an acceptance check |
| 03 Architecture | Which part of the code should own each rule? | `03-architecture.md` | UI and calculator rules stay separate |
| 04 Implementation | Did each user action become a named function? | `04-implementation-map.md` | The function map matches the product behavior |
| 05 Validation | Does the result work and remain understandable? | `05-validation-report.md` | Tests and manual checks support the claims |
| 06 EEM work record | Can we follow one change from its goal to its evidence? | `06-eem-work-record.md` | The change has a clear contract and status |

## How to read the documents

Read them from Stage 01 to Stage 05 to understand the original project. Read Stage 06 to see the same project use the Explainable Engineering Method for a later change.

Each stage uses the previous stage's handoff and only the references it needs. Facts, decisions, assumptions, and open questions are labeled instead of being mixed together.

## Current picture of the app

- The app is a client-side static web app.
- A pure state-transition engine holds the calculator rules.
- A DOM adapter connects those rules to the browser page.
- The app intentionally behaves like a basic pocket calculator rather than a full expression parser.
- The supported behavior and exclusions are in [`02-scope.md`](./02-scope.md).
- The function ownership map is in [`04-implementation-map.md`](./04-implementation-map.md).
- Automated and manual evidence is in [`05-validation-report.md`](./05-validation-report.md).
- The EEM example record is in [`06-eem-work-record.md`](./06-eem-work-record.md).
