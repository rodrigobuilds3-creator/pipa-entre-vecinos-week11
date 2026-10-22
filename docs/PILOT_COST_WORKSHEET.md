# Full-cost pilot worksheet / one building, one delivery

This is a collection template, not measured savings or a price quote. Currency MXN. The MXN 1,800 tanker quote in the app is fictional demo data and must not enter a business case as a real invoice. The initial buyer/payer candidate is a building's residents through an agreed building budget; willingness to pay is not established.

| Input | Existing workflow | Proposed workflow | Evidence to collect |
|---|---|---|---|
| Water invoice / order | Not measured | Not measured | Same volume, quality and service window |
| Coordinator time: quotes + messages + collecting + waiting + correction | Not measured | Not measured | Time log per task, including setup and failures |
| Value per coordinator hour | Not agreed | Same agreed value | Resident-approved opportunity-cost assumption |
| Devices / sensor purchase | Existing assets, verify | No physical sensor in demo; pilot quote pending | Hardware invoice and actual useful life |
| Installation and calibration | Not measured | Quote pending | Installer labor and recalibration schedule |
| Software / hosting / connectivity | Not measured | Prototype static hosting; future paid operating costs unquoted | Actual invoice or documented zero-cost tier |
| Training / onboarding | Not measured | Not measured | Time for first setup, cash/offline access and explanation |
| Support / discrepancy resolution | Not measured | Not measured | Named coordinator, minutes/case, recurrence |
| Maintenance / replacements | Not measured | Not measured | Battery, device replacement and support commitments |

## Same-period calculation

For a period with N deliveries: `coordination_cost = total_minutes / 60 * agreed_MXN_per_hour`.

`full_current_cost = water_invoice_total + coordination_cost + current_support_cost + current_device_cost_for_period`.

`full_proposed_cost = water_invoice_total + coordination_cost_with_app + amortized_hardware_and_installation + training_for_period + software_connectivity + support + maintenance`.

`net_benefit = full_current_cost - full_proposed_cost`. Price advantage and time advantage are separate outputs; do not count the same avoided work twice or treat unsettled household contributions as savings. Water not delivered is a service discrepancy, not automatic recoverable savings.

For a benefit/cost claim, report numerator, denominator and period explicitly. No 10:1 claim is supported by this demonstration. A real ML model or working interface alone does not prove user demand, water savings or better allocation.

## Pilot decision / ownership

- Proposed owner: one consenting building coordinator. Actual contact and agreement still required; Rodrigo owns the prototype, not a contracted water service.
- Before any live pilot, agree who responds to late arrivals, unknown volume and disputed contributions; keep responses manual.
- Compare at least one existing-process order with one app-assisted order; a tiny pilot informs decisions, not population-wide inference.
- Stop or reduce scope if setup/support time exceeds the coordinator time removed, if inclusion of cash/offline households fails, or if no agreed payer covers recurring costs. Retain unknown values rather than replacing them with invented returns.
