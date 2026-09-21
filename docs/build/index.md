# Building on Armada

Armada is designed to be built *on* — private USDC settlement that disappears into the products
people already use. These docs cover the protocol conceptually; this page points to where the
building actually happens.

## The SDK

The primary way to integrate is the **TypeScript SDK**. It handles everything the
[cryptography](/crypto/) section describes — deriving keys, scanning for your notes, building and
proving transactions, and submitting them through a relayer — so your application works in terms of
**shield, transfer, unshield, and payments** rather than circuits and commitments.

- **API reference:** [sdk.armada.blue](https://sdk.armada.blue)
- **Source:** [github.com/ship-armada/armada-sdk](https://github.com/ship-armada/armada-sdk)

These protocol docs and the SDK docs are complementary: read here for *how the protocol works*, and
the SDK reference for *the functions to call*.

## Integrating as an app

Any app can embed Armada's private flows through the SDK — a wallet, a treasury tool, a payments
product. If your app routes deposits into the pool, you can **register as an integrator** and earn a
share of the shield fee, with no approval or stake required. See
[Integrator fees](/fees/integrators) for the economics and
[Payments](/flows/payments) for the claimable-payment model.

## Running a relayer

A [relayer](/fees/relayers) submits users' transactions and pays their gas, keeping users' public
addresses off-chain — it is privacy infrastructure, not just a convenience. Relayers set their own
fee and take no protocol cut. If you want to operate one, the relayer is its own service:

- **Source:** [github.com/ship-armada/armada-relayer](https://github.com/ship-armada/armada-relayer)

## Extending with adapters

New external integrations — additional yield sources, for example — are added as **adapters**
authorized through [governance](/governance/upgrades). Adapters are additive and independently
auditable; the [yield adapter](/flows/shielded-yield) is the first, and its `adaptParams` binding is
the pattern any new adapter follows to interact with the pool trustlessly.

## Deployments & networks

Which chain is the hub and which are spokes, and the contract addresses on each, are published per deployment in
the **deployments registry**:

- [github.com/ship-armada/armada-deployments](https://github.com/ship-armada/armada-deployments)

Each manifest names the hub chain and its spokes with their chain IDs, CCTP domains, and contract
addresses. See [Hub-and-spoke topology](/architecture/) for how those pieces relate.
