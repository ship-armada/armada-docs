# Security model & limitations

This page gathers, in one place, what Armada's security rests on and — just as importantly — what it
does *not* protect. The detailed treatment lives in the linked sections; this is the honest summary.

## What the security rests on

- **An immutable core.** The cryptography, the shielded pool's custody and verification modules, the
  ARM token, and the revenue-lock and wind-down contracts cannot be changed by anyone, including
  governance. Their guarantees don't depend on anyone's restraint. See
  [Scope](/governance/scope) and the [contract map](/architecture/contracts).
- **Bounded governance.** Governance controls only a defined surface, inside structural guardrails:
  treasury [outflow limits](/governance/treasury) cap what can leave per window, the
  [Security Council](/governance/security-council) can veto a queued proposal, and the immutable core
  can't be touched. The design goal is bounded, predictable degradation rather than catastrophic
  failure.
- **A decentralized trusted setup.** The Groth16 [proof system](/crypto/proofs) uses a multi-party
  setup that is secure as long as at least one participant was honest, so no single party can forge
  proofs.

## What Armada does *not* protect

Privacy applies *inside* the pool; the edges are public. Stated plainly:

- **Shield, unshield, cross-chain, and yield amounts are public.** The privacy is the
  *unlinkability* between them, not hiding that a deposit or withdrawal of a given size happened.
- **The anonymity set is only as large as usage.** Privacy comes from blending into others
  transacting in the same pool; it is weakest when the pool is small or quiet, and strengthens as
  usage grows.
- **Amount and timing correlation is possible.** Hiding transaction contents does not hide their
  timing and size; good practice (varying amounts, spacing operations, using a relayer) matters.
- **Self-submitting a transaction links your public address to it.** A relayer keeps your address
  off-chain; submitting yourself gives that up.
- **Network metadata is out of scope.** IP addresses and traffic patterns are the user's
  responsibility (e.g. connecting through Tor).

The full treatment is in the [privacy model](/crypto/privacy).

## Mechanisms still to come

Some governance mechanisms are specified but **not yet implemented**, and the protocol runs
conservatively without them today:

- A **proposal bond** (spam defense is currently the 5,000-ARM proposal threshold alone).
- A **steward circuit breaker** for sustained low participation.
- **Two-stage** approval for the most sensitive contract upgrades (upgrades currently use the single
  Extended path).
- **Value-aware proposal classification** — today the classifier defaults ambiguous changes to the
  higher Extended bar rather than comparing proposed against current values.

## Status

Armada is under active development. These docs describe how the protocol works today and flag, where
relevant, the parts still evolving toward mainnet — including the security review and audit work that
is part of that path. Treat the protocol accordingly until those milestones are complete.
