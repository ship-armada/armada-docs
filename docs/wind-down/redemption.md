# Redemption

After wind-down, the treasury's non-ARM assets sit in a dedicated **redemption contract**, and ARM
holders claim their share of them there. Redemption is entirely **permissionless** — no vote, no
snapshot, no merkle tree, no claim window, and no deadline. You deposit ARM, you receive your share,
whenever you choose.

## How a redemption works

You deposit ARM into the redemption contract and name the treasury assets you want to claim. For each
asset, you receive:

```
your share = (contract's balance of the asset) × (your ARM) ÷ (circulating ARM)
```

The ARM you deposit stays locked in the redemption contract permanently (it isn't burned — ARM has no
burn function — but the redemption math excludes it, so the accounting stays correct). Redeeming is
self-service and can be done in as many transactions as you like.

## The circulating denominator

"Circulating ARM" in that formula is the ARM genuinely in holders' hands. From the total supply, the
contract subtracts:

- the **treasury** (its ARM is locked permanently and never redeems),
- the **redemption contract's** own holdings (ARM already deposited to redeem),
- the still-**locked early-network** ARM (the portion that never unlocked), and
- the **unsold crowdfund** ARM.

Because those are excluded, the per-ARM payout reflects only ARM that actually belongs to
participants. Claiming or releasing ARM before redeeming doesn't change your outcome — the same ARM
is counted as circulating either way — so early and late redeemers receive the same rate.

## The 7-day delay

Redemptions can't begin until **7 days after the trigger.** This window exists because sweeping the
treasury into the redemption contract is itself permissionless and done token-by-token — the delay
gives anyone time to move all of the treasury's assets in before the first redemption executes, so
early redeemers don't miss assets that hadn't been swept yet. After the delay, redemption is open
indefinitely.

## Who can redeem, and the fairness property

- **Crowdfund participants** (who claimed their ARM) and **early-network beneficiaries** (whose ARM
  actually released) can redeem.
- **Early-network ARM that never unlocked** — because the protocol didn't earn enough revenue to
  reach its milestones — **cannot** redeem; it stays locked.
- **Treasury ARM never redeems.**

This is the intended fairness outcome: those who **paid** for their ARM have priority on the remaining
treasury, while team and contributor tokens only share in it to the extent the protocol earned the
revenue to unlock them. If Armada failed before earning, its unvested tokens have no claim on what's
left.

The redemption contract is immutable and has no admin — like the rest of the wind-down machinery, it
runs on its own once triggered.
