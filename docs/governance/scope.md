# Scope

Governance can change the parts of Armada that are meant to evolve, and **cannot** change the parts
that hold the protocol's guarantees together. The line between them is deliberate and, on the
immutable side, enforced by code rather than policy.

## Governable

| Area | Examples |
|---|---|
| **Fees** | Shield fee, yield fee, volume tiers, integrator terms |
| **Treasury** | Distributions, the steward budget table, outflow rate limits |
| **Parameters** | Governance timings and quorum (for Standard/Extended proposals), the wind-down threshold and deadline |
| **Roles** | Electing or removing the Treasury Steward; replacing the Security Council |
| **Adapters** | Authorizing or deauthorizing adapters |
| **Upgrades** | The governor, fee module, and revenue counter (each a UUPS proxy) |
| **Revenue** | Attesting non-stablecoin revenue; expanding what counts as qualifying revenue |
| **ARM token** | Adding an address to the transfer whitelist (add-only); enabling global transfers |
| **Signaling** | Non-binding preference votes |

Fee *increases*, adapter *authorizations*, upgrades, and Security Council changes take the higher
[Extended](/governance/proposals) bar; the corresponding *decreases* and *revocations* take the
lower Standard bar.

## Immutable

| Area | What no vote can change |
|---|---|
| **Cryptography** | The circuits, the verifier, and the commitment / nullifier constructions |
| **Privacy guarantees** | Shielded-set membership and unlinkability |
| **Shielded pool** | The pool's core custody and verification modules |
| **ARM token** | Fixed supply, non-upgradeable, all token invariants |
| **Revenue-lock** | The milestone schedule and release logic |
| **Wind-down** | The trigger logic |
| **Crowdfund** | All of its parameters |

These are immutable *in code* — there is no proxy, admin, or setter that could alter them, so their
guarantees do not rest on governance restraint. See the [contract map](/architecture/contracts) for
which contracts are upgradeable and which are not.

## Access to the pool is unconditional

One immutable property deserves its own statement: **access to the shielded pool is not conditioned
on disclosure.** The pool has no allowlist, no attestation gate, no identity check, and no
source-of-funds requirement — there is simply no such mechanism in the contracts. Depositing,
transferring, and withdrawing are open to anyone.

Armada may support **voluntary** disclosure tooling at the application layer — a user can always
share a [viewing key](/crypto/#keys-and-addresses) to prove their own activity — but that is the
holder's choice. Making disclosure a *precondition* of using the pool is outside what governance is
meant to do; it is treated as a constitutional invariant, not a parameter to be tuned.
