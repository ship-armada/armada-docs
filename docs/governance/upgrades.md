# Upgrades & adapters

## What can be upgraded

Most of Armada is immutable (see [Scope](/governance/scope) and the
[contract map](/architecture/contracts)). Only three contracts are upgradeable, each a UUPS proxy
whose upgrade authority is the governance **timelock**:

- the **governor** — so new proposal types and mechanics can be added over time;
- the **fee module** — so new fee types can be introduced;
- the **revenue counter** — so new revenue sources can be recognized.

Every upgrade to these runs through the full [Extended](/governance/proposals) proposal path (30%
quorum, 14-day vote, 7-day execution delay), and can be vetoed by the Security Council in that
window. Nothing else in the protocol — the shielded pool, the ARM token, the revenue-lock, the
wind-down and redemption contracts — can be upgraded at all.

::: info Implementation note
The most sensitive upgrades (to the governor and treasury logic) are intended to eventually require a
**two-stage** approval — a first vote to approve an exact upgrade package, a mandatory review period,
then a second vote to ratify it. That process is **not yet implemented**; today all upgrades use the
single Extended path described above.
:::

## Adapters

Adapters are the contracts that connect the shielded pool to external protocols — the
[yield adapter](/flows/shielded-yield) is the first. Because an adapter can touch user funds at the
pool's edge, which adapters are trusted is governed through an **adapter registry**, and the model is
**additive**:

- **Authorize** a new adapter — an [Extended](/governance/proposals) action, since it grants access.
  New adapters are *added* alongside existing ones, never swapped in place.
- **Deauthorize** an adapter to **withdraw-only** — a Standard action that revokes new deposits while
  still letting users exit existing positions.
- **Fully deauthorize** an adapter — removing its access entirely.

Adding rather than replacing means each adapter is a separate, independently auditable contract, and
retiring one is a graceful wind-down (withdraw-only first) rather than an abrupt cutoff. To upgrade an
adapter, governance authorizes the new version and moves the old one to withdraw-only, so both run in
parallel while users migrate.
