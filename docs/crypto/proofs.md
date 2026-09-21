# The proof system

Moving value inside the pool is governed by **zero-knowledge proofs**. A proof lets you convince the
pool that a transaction follows every rule while revealing none of its contents — no amounts, no
owners, no link between the notes spent and the notes created.

## What a proof asserts

When you spend notes (a transfer, an unshield, or a yield operation), your proof establishes all of
the following at once, over inputs that stay hidden:

- **Ownership** — the input notes are addressed to you: their note keys derive from your keys, and
  the spend is signed with your spending key.
- **Membership** — each input note's commitment really is in the [commitment tree](/crypto/), under
  a root the pool recognizes.
- **Correct nullifiers** — the published nullifiers are the ones those notes actually produce, so
  they can't be spent again.
- **Value conservation** — the total value going in equals the total going out. Nothing is created
  or destroyed.
- **Well-formed outputs** — the new commitments are correctly built for their recipients.

The pool checks the proof and the published nullifiers and roots; it never sees the notes
themselves.

## The primitives

- **Groth16 proofs over the BN254 curve.** Groth16 produces succinct proofs that are cheap and
  constant-cost to verify on-chain — which is what keeps private transactions affordable. The
  on-chain verifier is generic: it checks any of the protocol's circuits against the appropriate
  verifying key.
- **Poseidon** is the hash used for commitments, nullifiers, and the tree, because it is efficient
  inside the proof.
- **EdDSA over BabyJubJub** is the signature scheme. The authorization to spend is a signature made
  *inside* the proof with your spending key, so the pool can be sure the spender is the owner without
  the owner's key or signature ever appearing in public.

### Trusted setup

Groth16 requires a one-time **trusted setup** for each circuit, which produces the public proving
and verifying keys. Armada's setup is run as a **decentralized, multi-party ceremony**: many
independent participants each contribute randomness, and the result is secure as long as **at least
one** of them was honest and discarded their secret. No single party can produce forged proofs.

## A family of circuits

A transaction's "shape" is how many notes it spends and how many it creates — for example, spend two
and create two (a transfer that returns change), or consolidate several notes into one (an exit).
Rather than one giant circuit, Armada ships a **family of circuits** covering the common shapes, each
with its own verifying key registered on-chain. When you submit a transaction, the pool selects the
verifying key that matches its shape. Keeping shapes fixed is also a mild privacy benefit — a
transaction reveals only its shape, drawn from a small standard set, not a bespoke structure.

## What is proven, and what isn't

**Transfers, unshields, and shielded-yield operations are proven** — they spend existing notes, so
they carry a zero-knowledge proof.

**Shielding is not proven.** A shield creates a brand-new note, and its commitment is formed directly
on-chain as a Poseidon hash of the note's contents. There is nothing secret to prove about value
entering the pool from the public world — the deposit is visible regardless. Privacy begins with what
you do *after* shielding, which is where the proofs apply. See [Core flows](/flows/).
