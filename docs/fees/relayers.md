# Relayer fees

A [relayer](/architecture/cross-chain) submits your transaction on-chain and pays the gas, so your
own address never has to. Relayer fees are **separate from protocol fees** — the protocol takes no
cut of them.

## How relayers are paid

Each relayer sets its own fee (its gas cost plus a markup) and competes for users. The fee is paid
**as a shielded note to the relayer**, funded from the proceeds of the very transaction it submits —
so you never have to hold or spend public gas tokens.

Two properties keep this honest:

- **No protocol cut.** The relayer keeps its whole fee; Armada takes nothing from it, and the
  re-shielded relayer fee is exempt from the shield fee.
- **The relayer can't inflate it.** The fee amount and its destination are committed inside the
  transaction you authorize — bound into the proof for in-pool operations, and fixed in the signed
  request for gasless shields. A relayer can decline to submit, but it cannot rewrite the fee after
  the fact.

Because it's a competitive market, you can choose among relayers on price and reliability.

## Relaying is a privacy mechanism, not just a convenience

It's tempting to think of a relayer purely as a way to avoid holding gas — but its more important
role is **privacy**. Submitting a transaction yourself puts your funded, public address on it as the
sender and gas payer, which re-links that public identity to the shielded operation. Relaying keeps
your address off the transaction entirely.

Self-submitting is therefore best understood as a **liveness fallback** — a way to get a transaction
in if no relayer will serve you — **not** a way to save money. Doing it trades away much of the
privacy the relayer exists to provide, so it is not a recommended default. See the
[privacy model](/crypto/privacy) for how self-submission weakens unlinkability.
