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

## Redesign regression / final local build

21 domain tests passed, zero failures. Added explicit coverage of complete reading-version snapshots, measured-to-unknown replacement, post-closure contributions and corrections, and agreed zero-allocation input. JavaScript syntax checked for app, core and service worker.

Actual Chrome desktop walkthrough: original estimate 5,000 L corrected to 5,500 L; history retains both full observations. Human review then delivery closure; B adds 250 after an earlier 200 and now has 450, while other balances remain open. Final aggregate summary says delivery closed, contributions 450, balance 1,350 and explains that closure does not mean paid.

After a deliberate reset of fictional data, confirmed an order and used the new top-of-form receipt-without-measurement button. Browser showed “No medido”, no numeric discrepancy, and a disabled close button until human review. Screenshot: evidence/redesign/08-unknown-volume.jpg.

Responsive QA: browser viewport override did not resize the tested tab reliably. Instead used a temporary same-origin HTML iframe of 390 CSS pixels, loading the actual application. Its usable root width and scroll width both measured 375 pixels (15-pixel scrollbar), on overview and order pages. Navigation scrolls within its own region. Screenshot 07-mobile.jpg shows this test harness, not a mobile device. Harness removed before packaging.

Same fictional persona inspected six ordered final screenshots and documented the before/change/after comparison in PERSONA_TEST.md. This remains a visual synthetic review, separate from the mechanical walkthrough.

## Production regression / public version 3

Native deployment succeeded for commit eba03e0e70af2b57e494bb275819290fbdfcf2f7. Public access policy applied with explicit user approval. Actual production URL loaded the new original illustration and navigation. Completed confirmed order, B transfer 200, calibrated 5,000 L estimate, correction to 5,500 L, human review and delivery closure. History showed both observation versions. Added and then annulled an A contribution after closure; original retained as annulled. Explicitly selected B and added 250 after closure: B total 450. Aggregate export showed 450 contributed / 1,350 outstanding and “Entrega cerrada”, without unit-specific figures or raw readings.

The test initially added 250 to the visible default A after navigating back from another section; that was a test-operator selection mistake. Annulling that record and selecting B verified both actual correction paths; no product behavior was altered to hide the test mistake.

Reset fictional data and confirmed another order in production. Receipt-without-measurement showed “No medido” and kept close disabled until review. Public screenshots 09-11 retain final layout, reading history and unknown-volume result. No real money, household data or supplier transaction was used.
