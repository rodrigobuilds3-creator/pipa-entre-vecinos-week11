# Mechanical QA / 21 October 2026

## Automated

Node built-in test runner: 14 tests passed. Covers 4,999 odd-cent splits, strict money parsing, custom total validation, withdrawals added to delivery estimates, calibration errors, lifecycle gates, cash, overpayment, immutable correction history, review invalidation after correction, closing with unpaid balances, aggregate export, saved-state validation and actual regression with temporal holdout. Initial summary assertion incorrectly matched a substring in an aggregate amount; corrected the assertion to check the exact forbidden individual amount rather than changing the product to satisfy a bad test.

## Browser / Chrome, actual walkthrough

- First load: desktop overview, simulation labels and 4.3-day synthetic reserve displayed.
- Invalid allocation: change apartment A to MXN 400 while others remain 450; confirmation rejected with exact-total error.
- Equal split: MXN 1,800 divided into four MXN 450 shares; manual confirmation moves to contributions.
- Attempt MXN 500 for A: rejected as exceeding agreed share.
- A cash payment MXN 450: complete status; B transfer MXN 200: partial status.
- Unchecked calibration: delivery rejected with calibration error.
- Capacity 10,000; before 20%; after 65%; withdrawal 500: 5,000 L estimated versus 10,000 L quoted; discrepancy displayed and closure disabled until reviewed.
- Human review and confirmation: closes with outstanding amounts; no shutoff or access score.
- Reload: closed state and event log persist.
- Export preview: shows MXN 650 aggregate contributions and MXN 1,150 aggregate balance, not unit identifiers, payment methods or raw observations.

## Actual bug and correction after deployment 1

Observed: after saving a transfer for apartment B, rerender reset the form to apartment A / cash and moved focus to the document. This could misattribute a subsequent entry. Fix: retain selected unit/method and focus the amount field; notification explicitly names the chosen fictional unit. Also changed the draft overview label from agreed price to quoted price. Regression verification and deployment 2 recorded below when completed.

## Boundaries

This is mechanical QA by the builder, not a separate fresh-chat persona test, physical sensor test or real resident study. No synthetic savings, real deliveries or real interviews are claimed.

## Fix regression / actual browser result

Reloaded app after fix. Selected B and transfer, saved MXN 200. Both selectors remained B / Transferencia and keyboard focus remained in the amount input. At 390px viewport, overview document width and scroll width both equal 390px (no document overflow). Mobile navigation scrolls horizontally. Found and corrected the collapsed brand word boundary at mobile breakpoint.

## Synthetic persona improvement / regression

A separate fresh-context synthetic persona reviewed five screenshots and flagged calibration as a stopping point. Added receipt-without-measurement path. Actual browser at 390px: user can confirm receipt without checking calibration, sees «No medido», no numerical discrepancy, and close remains disabled until review. Three additional tests pass (17 total), including unknown-volume export and review invalidation after replacing unknown volume with an estimate.
