# Integrator fees

An **integrator** is an app, wallet, or product that routes shields through Armada on behalf of its
users. Integrators can earn a share of the shield fee, and the model is designed so that an
integrator's earnings can grow **without their users paying more.**

## The split at shield

When a user shields through an integrator, the shield fee has two parts:

```
shield fee = Armada take (→ treasury) + integrator fee (→ integrator)
```

The Armada take goes to the protocol; the integrator fee goes to the integrator's address. A user
who shields with no integrator pays only the Armada take.

## Registering is permissionless

Becoming an integrator takes a single on-chain transaction to set your **base fee** — no approval,
no application, and no stake. The base fee can be anything from **0 up to 5%**, and it's yours to
change at any time. Once set, your cumulative volume accrues automatically as users shield through
you.

## Volume tiers and the bonus

The clever part is how the Armada take and the integrator fee move together as volume grows.

The **Armada take steps down** with the volume an integrator drives — 50 bps at the start, dropping
to 40 bps past $250k of cumulative volume (the launch defaults; governance can change or add tiers).
Crucially, that reduction is **passed through to the integrator as a bonus**: the difference between
the base take and the reduced take is added to what the integrator earns.

The effect is that **the user's total cost stays constant while the integrator's share grows.**

Two examples with the launch defaults:

| | Below $250k volume | Above $250k volume |
|---|---|---|
| **Integrator with 0% base fee** | User pays 50 bps — all to Armada | User pays 50 bps — 40 to Armada, **10 to the integrator** |
| **Integrator with 20 bps base fee** | User pays 70 bps — 50 Armada, 20 integrator | User pays 70 bps — 40 Armada, **30 integrator** |

In both cases the user's price never changes as the integrator scales; the integrator simply captures
a larger slice as Armada's take recedes. An integrator can also choose to *lower* its base fee and
pass the savings on, so users pay less.

## Custom terms

Beyond the standard tiers, [governance](/governance/) can grant a specific integrator **custom
terms** — for example a reduced Armada take for a strategic partner, or a waived volume threshold as
an ecosystem grant. Custom terms are a governance decision, not something an integrator can set for
itself.

## Reading fees on-chain

Fees are fully transparent on-chain. An integrator (or a monitoring tool) can query the current fee
for any amount, read an integrator's registered terms and accumulated volume and earnings, and
follow fee events as shields happen. The concrete calls for quoting and reading these belong to the
[SDK reference](https://sdk.armada.blue) and the contract ABI; conceptually, everything about the
fee an integrator earns is observable and verifiable.
