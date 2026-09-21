# Voting & quorum

How voting power is *held and delegated* is covered under the [ARM token](/token/voting). This page
covers how votes are *counted* once a proposal is live.

## Casting a vote

A voter's weight is their delegated ARM at the proposal's snapshot block. Votes are **For**,
**Against**, or **Abstain**, and can be **changed** at any time while voting is open. But a vote,
once cast, **cannot be withdrawn** — changing it only moves your weight between the three buckets;
your weight keeps counting toward quorum either way. That prevents a voter from pushing turnout over
the quorum line and then pulling it back under.

## Quorum

Quorum is the minimum participation a proposal needs. It is the **greater of two things**:

- a **percentage** of circulating voting power — **20%** for Standard proposals, **30%** for
  Extended; and
- an absolute **floor of 100,000 ARM.**

The floor matters because the percentage alone could be tiny early on, when little ARM is circulating
and delegated. Requiring at least 100,000 ARM of participation stops proposals from passing on
near-zero turnout regardless of how much ARM is active at the time. Participation counts all votes —
For, Against, and Abstain alike.

## The circulating denominator

The percentage is measured against **circulating voting power**, not the raw total supply. From the
total, the protocol subtracts:

- the **treasury** (protocol-owned ARM never votes), and
- **excluded addresses** — the crowdfund and revenue-lock contracts, whose ARM is allocated or
  locked but not yet in holders' hands.

This is snapshotted when the proposal is created, so the target can't shift mid-vote, and it keeps
non-voteable ARM from inflating the bar that real participants have to clear. A proposal **succeeds**
when quorum is met and a majority votes For; otherwise it is defeated.
