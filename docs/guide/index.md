# What is Armada?

Armada is a **privacy layer for on-chain finance**: a shielded pool where USDC can be deposited,
transferred, and withdrawn privately — across chains, and optionally earning yield — without
publishing who paid whom, how much, or what a balance is.

Public blockchains are transparent by default. That transparency is what makes them programmable,
but it is also a liability for anyone running real financial operations on-chain.

## Why Armada exists

::: info
This section summarizes the reasoning laid out in Armada's
[privacy thesis](https://blog.armada.blue/armada-privacy-thesis/).
:::

As stablecoins settle a growing share of global value, the transparency of public chains becomes
an operational risk rather than a curiosity. The exposures are concrete:

- **Payroll** reveals personnel and compensation.
- **Vendor payments** expose commercial relationships.
- **Treasury movements** broadcast balances, runway, and strategy.

Chain surveillance grows more capable and more valuable as more of the economy moves on-chain.
Existing privacy tools have mostly remained niche, consumer-facing applications — not something a
treasury, custodian, or payments provider can build on.

Armada takes a different position: **privacy as infrastructure, not an app.** As HTTPS did for the
web, privacy should disappear into the custody, treasury, and payments products organizations
already use, rather than being a separate destination they visit. The result is privacy that does
not require changing how an organization works.

## The shared-pool network effect

Armada concentrates activity into a **single shared shielded pool** rather than spreading it
across isolated privacy products. A participant's privacy comes from being indistinguishable
among everyone else transacting in the same pool, so **privacy strengthens as more products and
organizations use it.** A larger, busier pool is a stronger pool.

## What Armada provides

- **A shielded pool on a hub chain** — shield USDC in, hold and move it privately, unshield back
out whenever you want.
- **Cross-chain settlement** — USDC enters and leaves the pool from multiple chains via
[Circle's CCTP](https://www.circle.com/cross-chain-transfer-protocol); you can shield on one
chain and unshield to another.
- **Shielded yield** — earn on shielded USDC through an integrated vault without revealing your
identity or balance.
- **Credibly neutral access** — pool access is unconditional by design. The protocol's
[governance rules](/governance/scope) forbid gating pool use on disclosure, allowlists, or
identity checks, and that neutrality is a constitutional invariant rather than a current-team
policy.
- **Ownership and governance** — the [ARM token](/token/) is an ownership stake in the protocol,
carrying control over its parameters, treasury, upgrades, and eventual
[wind-down](/wind-down/), and tying team token unlocks to real [protocol revenue](/revenue/).



## Durability

Institutional operations cannot depend on privacy that might be switched off, gated, or redefined
later. Armada's core is therefore built to be **durable**: the cryptographic pool and its access
guarantees are immutable, and the parts that are governable are bounded by explicit, public rules.

::: info Status
Armada is under active development, with the protocol live on testnet. These docs describe how the
protocol works today and note where it is still evolving toward mainnet.
:::

## Where to go next

- **[Core concepts](/guide/concepts)** — the vocabulary: shielding, notes, nullifiers, keys,
hub-and-spoke, relayers.
- **[Architecture at a glance](/guide/architecture)** — the moving parts and how they fit
together, in one diagram.
- Building an integration? These docs cover the protocol conceptually; the TypeScript
[SDK reference](https://sdk.armada.blue) documents the actual API.

