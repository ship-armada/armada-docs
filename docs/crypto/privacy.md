# The privacy model

Armada provides strong privacy for value held and moved *inside* the pool, and deliberately does not
try to hide the boundary where value enters and leaves the public world. Being precise about that
line matters more than being reassuring — this page states what is hidden, what is not, and the
assumptions behind it.

## What's private, what's public

| Operation | Stays private | Visible on-chain |
|---|---|---|
| **In-pool transfer** | Everything — amounts, sender, recipient, and any link between notes | Nothing |
| **Shield** | The link between the deposit and your later in-pool activity | The deposit amount and the depositing address |
| **Unshield** | Which note it came from, and your in-pool history | The withdrawn amount and the recipient |
| **Cross-chain** | (Privacy begins *after* the bridge) | The CCTP message — amount, destination note key, routing |
| **Shielded yield** | *Whose* position it is | The vault deposit and redemption amounts |

The through-line: **in-pool activity is fully private; the edges — shielding, unshielding, bridging,
and interacting with the yield vault — expose amounts.** What the pool protects at those edges is
*unlinkability*: a public deposit can't be tied to your later transfers, and a public withdrawal
can't be tied to the note or history it came from.

## The anonymity set

Your privacy comes from being indistinguishable within the crowd of everyone else transacting in the
same pool. That crowd is your **anonymity set**, and it is only as large as the pool's actual usage.
A large, busy pool provides strong privacy; a small or quiet one provides a smaller set to blend
into. This is the reason Armada concentrates activity in a **single shared pool** rather than
fragmenting it — but it also means privacy strengthens over time as usage grows, and is weakest at
the very start.

## Correlation and metadata

Hiding the *contents* of transactions does not hide their *timing and amounts*, and an observer can
still reason about those:

- **Amount and timing correlation.** A shield of a distinctive amount followed soon after by an
  unshield of the same amount can be linked by inspection, even though the transfer between them was
  private. The same is true of a yield deposit and a matching later withdrawal. Rounded or unusual
  amounts, and short delays, make this easier. Varying amounts and spacing operations out is good
  practice.
- **Your public address.** Submitting your own transactions puts your funded, public address on
  them, re-linking your identity to the operation. A [relayer](/architecture/cross-chain) exists so
  that your address stays off the transaction; self-submitting gives that up.
- **Network metadata.** IP addresses and traffic timing are outside the protocol's control. Privacy
  at the network layer (for example, connecting through Tor) is the user's responsibility.

## What Armada does not protect

Stated plainly, so there is no confusion:

- It is **not an amount-hiding bridge** — cross-chain transfers carry the amount in the clear.
- It does **not hide that a deposit or withdrawal of a given size happened** — only who it belongs
  to and how it links to the rest of your activity.
- It does **not, on its own, defend against correlation** by amount and timing — that depends on how
  you use it.
- It does **not provide network-layer anonymity.**

## Disclosure is voluntary, and access is unconditional

Privacy in Armada is the default, not a mandate. Because viewing and spending are separate keys, a
user can share a [viewing key](/crypto/#keys-and-addresses) to grant an auditor, counterparty, or
regulator read-only visibility into their own activity — selective disclosure that is always the
holder's choice.

Conversely, using the pool is **never** conditioned on disclosure. The protocol's
[governance rules](/governance/scope) forbid making pool access contingent on attestation,
allowlists, or identity checks. Optional disclosure tooling may exist at the application layer;
mandatory disclosure as a precondition of using the pool is ruled out by design.
