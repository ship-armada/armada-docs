# Core concepts

This page defines the vocabulary used throughout the rest of the docs. The definitions here are
deliberately conceptual — the [cryptography section](/crypto/) covers the exact constructions
(hash preimages, curves, proof system) in detail.

## The pool

**Shielded pool**
: The private ledger at the heart of Armada. Value inside is held as cryptographic commitments,
  not public balances, so amounts and ownership stay hidden while the pool stays verifiable. There
  is one shared pool — which is what gives participants a larger crowd to blend into.

**Shield**
: Moving value *into* the pool — deposit public USDC, receive a private balance.

**Unshield**
: Moving value *out* — prove ownership of a private balance and withdraw public USDC to an address
  you choose.

**Shielded transfer**
: Moving value between participants *inside* the pool, with no public trace of sender, recipient,
  or amount.

## Private balances

**Note**
: The basic unit of private value — the pool's equivalent of a coin or UTXO. It records "this much
  of this token belongs to this owner," visible only to the owner (and anyone holding their viewing
  key). Spending a note consumes it and creates new notes.

**Commitment**
: A note's public on-chain fingerprint, and what the pool actually stores. It reveals nothing about
  owner or amount, but lets the protocol prove the note exists and is unaltered.

**Nullifier**
: A one-time "spent" marker published when a note is consumed. It blocks double-spends but cannot
  be linked back to the note it retires, so spending stays private.

**Commitment tree (Merkle tree)**
: An append-only tree of every commitment. To spend a note you prove its commitment is a leaf —
  proving membership without revealing which leaf is yours.

## Keys and addresses

Armada separates the ability to *spend* funds from the ability to *see* them, so visibility can be
shared without handing over control.

**Spending key**
: The private key that authorizes spending. Whoever holds it controls the funds.

**Viewing key**
: A separate key that lets its holder detect and decrypt your notes — your incoming payments and
  balances — without power to spend. A **shareable viewing key** grants read-only visibility to an
  auditor or counterparty. Sharing is permanent: you cannot un-share what someone could already
  decrypt.

**Nullifying key**
: The key material used to derive a note's nullifier, tying the "spent" marker to the spender
  without exposing the note.

**Address (**`0zk` **address)**
: The identifier others use to send you shielded value. It encodes the public halves of your keys,
  so a sender can create a note only you can claim.

**Note key (**`npk`**)**
: A per-note public key derived from the recipient's address; it binds a note to its intended
  recipient. It appears often because it is how a transaction commits to *where* value is going.

## Cross-chain plumbing

**Hub chain**
: The chain hosting the shielded pool and all private state — commitment tree, nullifiers, yield,
  fees, and governance.

**Client chain**
: Any other supported chain. It runs only a thin bridge that moves USDC to and from the hub, and
  holds no private state.

**CCTP**
: [Circle's Cross-Chain Transfer Protocol](https://www.circle.com/cross-chain-transfer-protocol), a
  burn-and-mint mechanism for moving native USDC between chains. Armada uses it to carry USDC
  between client chains and the hub.

**Relayer**
: A service that submits your transactions and can pay gas for you. Beyond convenience this is a
  privacy mechanism: relaying keeps your own funded, public address off the transaction. It ferries
  the message but cannot read or alter the private contents.

## On-chain machinery

**Zero-knowledge proof**
: A proof that a transaction follows every rule — the spender owns the notes, amounts balance,
  nothing is double-spent — while revealing none of the details. Armada uses succinct proofs that
  are cheap to verify on-chain.

**Adapter**
: An authorized contract that bridges shielded funds to an external protocol (such as the yield
  vault) and back in a single proven transaction, so value can leave and re-enter without breaking
  privacy. Governance authorizes each adapter.

**Shielded yield / ayUSDC**
: Earning on shielded USDC. It is put to work in an integrated vault that issues yield-bearing
  shares (ayUSDC), themselves held privately — so you earn without revealing your position.

**ARM token**
: Armada's protocol token. Holding ARM is an ownership stake in the protocol: it carries control
  over parameters, the treasury, upgrades, and the wind-down decision, and it is the basis for a
  holder's claim on protocol value — through treasury distributions, buybacks, or wind-down
  redemption. See the [ARM token](/token/) and [governance](/governance/) sections.