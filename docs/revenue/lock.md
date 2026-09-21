# Releasing tokens

The **RevenueLock** holds the entire early-network ARM allocation, split into a fixed per-beneficiary
amount for each recipient. It releases each beneficiary's ARM as revenue milestones are reached. The
contract is **immutable** — no admin, no upgrade path, and no way to change the beneficiaries, their
amounts, or the milestone schedule. Beneficiaries can trust that none of it can be altered after
deployment.

## Claiming released ARM

A beneficiary claims by calling `release`, naming a delegatee. The contract:

1. looks up the current unlock percentage from the milestone schedule,
2. computes how much of that beneficiary's allocation is now unlocked, minus what they've already
   taken, and
3. **transfers the newly unlocked ARM and delegates it in the same transaction.**

Because release and delegation are atomic, early-network ARM enters circulation already active in
[governance](/token/voting) — it is never left sitting undelegated. Releasing is pull-based: tokens
stay in the lock until a beneficiary chooses to claim, and claiming repeatedly between milestones is
harmless (it simply releases whatever new amount has unlocked). Releases can only begin once the lock
has actually been funded with the full allocation.

## The rate-limited ratchet

This is the lock's key defense. The RevenueLock **never reads the revenue counter directly** to
decide entitlements. Instead it maintains its own **observed revenue** figure that can only rise at a
bounded rate per elapsed day, and computes unlocks from *that*.

The effect: even though the [RevenueCounter](/revenue/counter) is governance-upgradeable, a
compromised or buggy counter reporting a sudden huge number **cannot** make the unlock jump. The
observed value ratchets up only as fast as its per-day cap allows, so accelerating the unlock
requires real elapsed time, not just a number appearing on the counter. The rate cap is fixed at
deployment. The observed figure is also monotonic, so a counter that somehow reported *less* is
simply ignored.

Anyone can advance the ratchet permissionlessly (without releasing anything) — monitoring bots do
this regularly to keep the observed figure current, so beneficiaries aren't penalized by an
out-of-date ratchet when they claim.

## At wind-down

If [wind-down](/wind-down/) is triggered, the lock's ratchet is **frozen** — the unlock percentage at
that moment becomes permanent. This matters for the redemption math: it fixes exactly how much ARM is
still locked (and therefore excluded from the redemption pool) so that ratio can't drift while holders
redeem.

The lock otherwise ignores wind-down. Already-released ARM is in beneficiaries' wallets and counts as
circulating; ARM that never unlocked stays locked forever. That is the intended fairness property: if
the protocol failed before earning enough revenue, the early-network tokens simply never vest, and
those who paid for their ARM have priority on the remaining treasury (see [Wind-down](/wind-down/)).
