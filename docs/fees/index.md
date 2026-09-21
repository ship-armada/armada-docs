# Fees

Armada charges a protocol fee at only **two** points: when you **shield** (deposit) and when you
**withdraw yield**. Everything else inside the pool — private transfers, unshielding, lending into
the vault — carries no protocol fee. All fee parameters are set by [governance](/governance/).

| Operation | Protocol fee |
|---|---|
| **Shield** | Armada take + integrator fee (see below) |
| **Yield withdrawal** | 15% of the yield earned |
| Private transfer | None |
| Unshield | None |
| Lend into the vault | None |

Separately, a [relayer](/fees/relayers) may charge to submit your transaction — that is a market
fee paid to the relayer, not a protocol fee.

## The shield fee

Shielding is the one everyday deposit that carries a protocol fee. It has two parts:

```
shield fee = Armada take + integrator fee
```

The fee is **inclusive** — it's taken out of the amount you deposit. Shield $1,000 at a 0.50% total
fee and you receive a shielded note worth $995.

- **Armada take** goes to the protocol [treasury](/governance/). At launch it is **50 bps (0.50%)**,
  and it steps down with the volume an integrator drives — to **40 bps (0.40%)** once that integrator
  passes **$250k** in cumulative volume. Governance can adjust the rate and add tiers; the take is
  hard-capped at 10%.
- **Integrator fee** goes to the app or product that brought the deposit (an "integrator"), if there
  is one. If you shield directly with no integrator, you pay only the Armada take.

How the two parts interact — and how an integrator's cut can grow without the user paying more — is
covered in [Integrator fees](/fees/integrators).

## The yield fee

Withdrawing from the [shielded-yield](/flows/shielded-yield) vault charges a **yield fee of 15%**,
taken only from the **yield** you earned — never from your principal. Earn $100 of yield and $15
goes to the treasury, $85 to you. The fee applies on withdrawal only; lending in is free. Like the
shield fee, the rate is governable (bounded between 1% and 50%).

## What's free

Private transfers and unshields carry **no protocol fee** — moving value inside the pool and exiting
it are free. Lending shielded USDC into the vault is also free; the yield fee is charged only when
you withdraw.

## Who sets the fees

Every fee parameter above is controlled by [governance](/governance/), and the direction matters:
raising a fee is a higher-bar governance action than lowering one, so fees are structurally easier
to cut than to increase. No operational role can change fee rates unilaterally.
