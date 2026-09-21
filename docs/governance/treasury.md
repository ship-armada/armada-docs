# Treasury

The treasury holds the protocol's assets — its ARM reserve and the fees it earns — and is controlled
by the governance timelock. It is a **non-upgradeable** contract: its spending logic and safety
limits are fixed at deployment.

## Two ways value leaves the treasury

- **Governance distributions.** Any asset can be sent out by a passed governance proposal. Larger
  distributions (above 5% of the treasury balance) take the [Extended](/governance/proposals) bar.
- **The steward channel.** The elected Treasury Steward handles routine spending through
  **pass-by-default** proposals — they execute unless the community votes them down — but only within
  a governance-authorized budget (below).

Both channels are executed by the timelock after passing, and both count against the outflow limits.

## Outflow rate limits

Outflow limits are the treasury's primary defense against governance capture: even a passed
malicious proposal can only remove a bounded amount of value per window.

For each asset, there is a **rolling-window limit** — the total that can leave within a trailing
window (e.g. 30 days). The limit for a window is the **greater of**:

- a **percentage** of the treasury's current balance of that asset, or
- a fixed **absolute** amount,

and it can never be reduced below an **immutable floor** that governance is forbidden to go under.
Using the greater of a percentage and an absolute lets the cap scale with the treasury while always
allowing a baseline of legitimate operations. The limit is **aggregate** — every distribution and
every steward spend in the window counts against the same budget.

::: info Parameter values
The mechanism is fixed in code, but the specific numbers — the window length, the percentage, the
absolute limit, and the floor — are **parameters set by governance** rather than constants baked into
the contract. Treat any specific figures as the intended configuration, subject to governance.
:::

## Loosening is delayed; tightening is immediate

Changes to the outflow limits are **asymmetric**:

- **Tightening** the limit (reducing spending capacity) takes effect **immediately** — a
  security-improving change should never be delayed.
- **Loosening** the limit is written to a pending slot and activates only after a **24-day delay.**

That 24-day delay is longer than the longest possible governance cycle. The consequence is that a
captured governance *cannot* loosen the limit and drain the treasury in one motion: any drain
executes against the old, tighter limit and reverts. Raising the cap and then abusing it requires
two separate proposals with 24 publicly visible days in between — time for the community and the
Security Council to react.

## The Treasury Steward

The Treasury Steward is an elected role for day-to-day treasury operations — recurring expenses,
grants, and service payments — so that routine spending doesn't need a full proposal each time.

- **Elected by governance** to a **6-month** term, and removable by governance at any time.
- **Bounded by a budget table**: governance authorizes specific tokens with a per-token limit and
  rolling window. The steward can only spend tokens that are in the table, within their limits — and
  still within the aggregate outflow limits above.
- **Pass-by-default**: a steward spending proposal executes after its review window unless the
  community reaches quorum and votes it down.

The steward has no other authority — it cannot change fees, parameters, or roles, and its spending
is capped from two directions at once (its per-token budget and the treasury's aggregate outflow
limits).
