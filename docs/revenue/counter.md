# Recognizing revenue

The **RevenueCounter** holds a single number: the protocol's **cumulative recognized revenue**, in
USD. It is **monotonic** — it can only ever increase, never decrease — so the unlock schedule it
feeds can never move backward.

How that number gets updated depends on the kind of revenue.

## Stablecoin fees — permissionless

Most protocol revenue is stablecoin (USDC) fees. These are recognized **permissionlessly**: anyone
can call a sync function, which reads the fee-collector's own running total of fees received and
credits any increase to the counter. No governance action is involved, and there is nothing to
trust beyond the on-chain fee total itself.

Crucially, the counter reads the fee-collector's **cumulative-received** total, not a treasury
balance — so spending the treasury down never affects the recognized-revenue figure. Revenue
recognized is revenue *earned*, independent of what's later done with it.

## Non-stablecoin fees — governance-attested

Revenue that isn't a stablecoin (for example, ETH) has no fixed USD value on-chain, so recognizing it
would otherwise require a price oracle. Instead, governance attests its value:

- a routine **increment** credits a USD amount for newly received non-stablecoin fees, and
- a **correction** path can set the cumulative figure to a known total (only ever upward), reserved
  for reconciling confirmed errors.

Both require a governance proposal, and attestations are expected to reference verifiable on-chain
receipts at their market value at the time — keeping the counter honest without an oracle dependency.

## Governable, within limits

The counter is **upgradeable** by governance (through the timelock), so it can be extended to
recognize new kinds of revenue as the protocol grows — but its interface (the single
recognized-revenue figure the lock reads) stays fixed. Expanding what counts as qualifying revenue is
an [Extended](/governance/proposals) decision, treated as a monetary-policy-level action because it
controls the timing of the team's token supply.

At [wind-down](/wind-down/), the counter is **frozen** — no further updates are accepted — which
locks the unlock percentages in place so the redemption math stays stable.

The [RevenueLock](/revenue/lock) never trusts this counter blindly, though: it reads it through a
rate limiter, described next.
