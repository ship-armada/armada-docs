# ARM token

**ARM** is Armada's protocol token. Holding ARM is an ownership stake in the protocol: it carries
governance rights over the protocol's parameters, treasury, and upgrades, and it is the basis for a
holder's claim on protocol value — through treasury distributions, buybacks, or
[wind-down](/wind-down/) redemption. How that value and control are exercised is covered in
[Governance](/governance/); this section covers the token itself.

## Fixed supply

The total supply is **12,000,000 ARM**, minted **once** at genesis. The token contract has no
minting path after that and no burn function, so the supply is permanently fixed — it can never
inflate or be reduced. ARM has 18 decimals.

## Allocation

The full supply is distributed at genesis into three homes:

| Allocation | Amount | Share | Where it goes |
|---|---|---|---|
| **Treasury** | 7,800,000 | 65% | Protocol-owned, governance-controlled — funds operations and is the reserve behind ARM's value |
| **Early network** | 2,400,000 | 20% | The launch team, ecosystem contributors, and a reserve for future contributors — held in the [revenue-lock](/revenue/) and released only as protocol revenue milestones are met |
| **Crowdfund** | 1,800,000 | 15% | Sold in the token sale and claimed by participants |

The **early network** allocation is the one tied to protocol performance: those tokens sit in the
revenue-lock contract and unlock in proportion to cumulative protocol revenue, so the team's supply
vests only if the protocol actually earns. See [Revenue-based unlock](/revenue/).

## Immutable by design

The ARM token contract is **non-upgradeable** — there is no proxy, no admin, no minter, and no
pauser role. Its rules (fixed supply, the transfer and voting behavior described in this section)
cannot be changed by anyone, including governance. This is deliberate: the token is the trust
bedrock the rest of the protocol is built on, so its guarantees are unconditional.

Two properties shape how ARM behaves in practice — it starts **non-transferable**, and its **voting
power must be delegated to be active**. The next two pages cover each.
