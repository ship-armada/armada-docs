# Parameters

A consolidated reference of Armada's key parameters. Two kinds appear here:

- **Fixed** — a contract constant that cannot be changed (short of a rare, governed contract upgrade).
- **Governable** — a value governance can adjust; the figure shown is the launch default (or, where
  noted, a parameter set entirely by governance rather than a constant).

## ARM token

| Parameter | Value | |
|---|---|---|
| Total supply | 12,000,000 ARM | Fixed |
| Decimals | 18 | Fixed |
| Allocation — treasury | 7,800,000 (65%) | Fixed at genesis |
| Allocation — early network | 2,400,000 (20%) | Fixed at genesis |
| Allocation — crowdfund | 1,800,000 (15%) | Fixed at genesis |

## Fees

| Parameter | Value | |
|---|---|---|
| Shield — Armada take (base) | 50 bps (0.50%) | Governable |
| Shield — Armada take (above $250k integrator volume) | 40 bps (0.40%) | Governable |
| Armada take cap | 10% | Fixed |
| Integrator base fee | 0–5%, self-set | Governable by the integrator |
| Yield fee | 15% of yield (bounds 1%–50%) | Governable |

Private transfers and unshields carry no protocol fee. See [Fees](/fees/).

## Governance

| Parameter | Value | |
|---|---|---|
| Proposal threshold | 5,000 ARM | Fixed |
| Quorum — Standard / Extended | 20% / 30% of circulating voting power | Governable |
| Quorum floor | 100,000 ARM | Fixed |
| Voting delay | 2 days | Governable |
| Voting period — Standard / Extended | 7 days / 14 days | Governable |
| Execution delay — Standard / Extended | 2 days / 7 days | Governable |
| Quiet period (post-crowdfund) | 7 days, one-time | Fixed |
| Treasury Steward term | 180 days (6 months) | Fixed |
| Treasury outflow limits | Rolling-window caps (greater of a % or an absolute, with an immutable floor) | Values set by governance |
| Outflow loosening activation delay | 24 days | Fixed |

See [Governance](/governance/).

## Revenue-based unlock

| Cumulative revenue | Unlocked | |
|---|---|---|
| $10,000 → $1,000,000 | 10% → 100% (step function; see the [schedule](/revenue/)) | Fixed |

The milestone schedule and the release logic are fixed and immutable. See
[Revenue-based unlock](/revenue/).

## Cryptography

| Parameter | Value |
|---|---|
| Proof system | Groth16 over BN254 |
| Hash function | Poseidon |
| Spend signatures | EdDSA over BabyJubJub |
| Commitment tree depth | 16 |

See [Cryptography & privacy](/crypto/).

## Wind-down

| Parameter | Value | |
|---|---|---|
| Redemption delay | 7 days after trigger | Fixed |
| Wind-down deadline & revenue threshold | Set by governance | Governable |

See [Wind-down](/wind-down/).
