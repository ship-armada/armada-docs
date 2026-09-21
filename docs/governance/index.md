# Governance

Armada is governed by holders of the [ARM token](/token/). Governance controls the protocol's
changeable parameters, its treasury, and its upgrades — within firm guardrails, and with a core that
no vote can touch.

The guiding principle is **fail-by-default**: a proposal passes only if it earns genuine majority
support and meets quorum. Anyone can propose; only proposals the community actively backs take
effect.

## Who governs

- **Holders and delegates** cast the votes. Voting power is delegated ARM (see
  [Voting & delegation](/token/voting)).
- **The governor and timelock** are the on-chain machinery. Passed proposals are queued in a
  timelock and execute only after a delay, giving the community time to react.
- **The Treasury Steward** is an elected role for routine, day-to-day treasury spending, using a
  faster "pass-by-default" process. See [Treasury](/governance/treasury).
- **The Security Council** is a small multisig that acts as an emergency backstop — it can pause new
  shields and veto a queued proposal, but nothing more. See
  [Security Council](/governance/security-council).

## What governance can and can't do

Governance steers the parts of the protocol that are meant to evolve — fee rates, treasury spending,
authorized adapters, and the upgradeable contracts — while the trust-critical core is
**immutable**: the cryptography, the shielded pool, the ARM token, and the revenue-lock and
wind-down rules cannot be changed by any vote. The full split is in [Scope](/governance/scope).

## Guardrails, not just votes

Because governance controls real value, it operates inside structural limits rather than on trust
alone:

- **Treasury outflow limits** cap how much value can leave the treasury in any rolling window, so
  even a passed malicious proposal can only extract a bounded amount.
- **The execution delay and Security Council veto** provide a window to detect and stop a hostile
  proposal before it executes.
- **The immutable core** means the worst case is bounded leakage over time, not a catastrophic drain
  or a redefinition of the protocol's guarantees.

The system is designed to degrade predictably rather than fail all at once. The pages that follow
cover how proposals work, how votes are counted, what's in and out of scope, and the treasury,
Security Council, and upgrade mechanics.
