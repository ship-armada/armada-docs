# Voting & delegation

ARM is a voting token. Your voting weight is your ARM balance — but it only counts once you have
**delegated** it, and it is always measured at a fixed point in the past.

## Voting power must be delegated

Holding ARM does not, by itself, give you an active vote. Voting power is **inactive until you
delegate** it. You have two choices:

- **Self-delegate** — assign your voting power to your own address, so you vote directly.
- **Delegate to someone else** — assign it to a representative who votes on your behalf.

Delegating is a one-time action you can change at any time. Until you do it, your ARM has no say in
governance, even though you hold it.

## Balances are checkpointed

Every time ARM moves or a delegation changes, the token records a **checkpoint** of the affected
balances. When a proposal is created, it fixes a **snapshot** at a specific past block, and all
voting power for that proposal is read from the checkpoints at that block — permanently.

This has two consequences worth understanding:

- You can vote and then move your ARM later (once transfers are enabled) without affecting the vote —
  your weight was already fixed at the snapshot.
- You cannot acquire ARM *after* a proposal's snapshot and use it on that proposal.

## Delegation at the moment of circulation

Two of the paths that put ARM into circulation — [crowdfund](/token/) claims and
[revenue-lock](/revenue/) releases — **delegate atomically.** When you claim or release, you choose a
delegatee in the same transaction, so the ARM enters your wallet already active in governance. (You
can pick yourself; it's still an explicit choice.) This keeps circulating ARM from sitting idle and
vote-inert.

## One level of delegation

Delegation does not chain. If you delegate to a representative, that representative votes with your
weight — but they cannot re-delegate it onward to a third party. Voting power stops at whoever you
delegated to.

## What can't vote

- The **treasury** cannot delegate or vote at all — the token itself blocks it, so protocol-owned ARM
  never influences governance.
- ARM still held inside the **crowdfund** or **revenue-lock** contracts (allocated or locked, but not
  yet claimed or released) is excluded from governance until it circulates.

---

This page covers how voting power is *held and delegated* at the token level. How votes are then
*counted* — proposal snapshots, quorum, and the denominator of circulating voting power — is part of
[Governance](/governance/voting).
