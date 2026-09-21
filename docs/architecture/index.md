# Protocol architecture

Armada is a **hub-and-spoke** system. One chain — the **hub** — hosts the shielded pool and all
of its private state. Every other supported chain is a **spoke** (a *client* chain) that runs a
thin bridge contract. USDC moves between spokes and the hub over
[CCTP](https://www.circle.com/cross-chain-transfer-protocol); the privacy machinery lives entirely
on the hub.

This section covers the structure:

- **Hub-and-spoke topology** (this page) — what runs where, and why.
- **[The PrivacyPool](/architecture/privacy-pool)** — the router-and-modules design that holds
  the shielded state.
- **[Cross-chain flow](/architecture/cross-chain)** — how USDC crosses chains via CCTP, and the
  trust boundary around it.
- **[Contract map](/architecture/contracts)** — every contract, its role, and who controls it.

The end-to-end user journeys (shield, transfer, unshield, yield) are covered separately in
[Core flows](/flows/).

## Why hub-and-spoke

Privacy in Armada comes from a **single shared pool**: the larger the set of participants
transacting against one pool, the stronger each participant's anonymity. Splitting the pool across
many chains would fragment that anonymity set. So Armada keeps **one** shielded pool, on the hub,
and lets value arrive from and depart to other chains rather than maintaining a separate pool per
chain.

That gives a clean division of responsibility:

- The **hub** holds all shielded state — the commitment tree, the nullifier set, verification
  keys, yield, fees, and governance.
- A **spoke** holds no shielded state at all. It is a bridge endpoint: it sends USDC to the hub to
  be shielded, and delivers USDC that the hub unshields to a recipient on that chain.

## What runs where

The hub carries the full protocol; a spoke carries only the bridge contracts.

| | Hub chain | Spoke chain |
|---|---|---|
| **Shielded pool** | `PrivacyPool` + Shield / Transact / Merkle / Verifier modules | `PrivacyPoolClient` (no shielded state) |
| **Cross-chain** | `CCTPHookRouter`, plus a gasless-shield wrapper | `CCTPHookRouter`, plus a gasless-shield wrapper |
| **Yield** | `ArmadaYieldVault` + `ArmadaYieldAdapter` | — |
| **Fees** | `ArmadaFeeModule` | — |
| **Governance** | Governor, timelock, treasury, ARM token, revenue counter/lock, wind-down, redemption, steward, adapter registry, pause controller | — |

A spoke needs to know only two things about the hub: the hub's CCTP **domain** and the hub
`PrivacyPool` **address**. It uses those to address the USDC it bridges. The hub, in turn, records
each spoke's pool address per domain (`remotePools`) so it can authenticate incoming messages —
see [Cross-chain flow](/architecture/cross-chain).

## The chains

Which chain is the hub and which are spokes is a per-deployment choice, published in the
[deployments registry](https://github.com/ship-armada/armada-deployments). A representative
testnet deployment looks like this:

| Role | Chain | Chain ID | CCTP domain |
|---|---|---|---|
| **Hub** | Ethereum Sepolia | 11155111 | 0 |
| Spoke | Optimism Sepolia | 11155420 | 2 |
| Spoke | Base Sepolia | 84532 | 6 |
| Spoke | Arbitrum Sepolia | 421614 | 3 |

The CCTP domain is Circle's own chain identifier for the transfer protocol; Armada uses it to
address cross-chain USDC. The specific chains and addresses for any given deployment are in that
deployment's manifest.
