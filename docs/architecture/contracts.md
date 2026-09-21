# Contract map

This is the inventory of Armada's on-chain contracts — what each one does, which chain it lives on,
who controls it, and whether it can be upgraded. Deep mechanics live in the linked sections;
concrete addresses for any deployment are in the
[deployments registry](https://github.com/ship-armada/armada-deployments).

## Shielded pool

| Contract | Chain | Role | Controlled by | Upgradeable |
|---|---|---|---|---|
| `PrivacyPool` | Hub | The shielded pool router — holds all shielded state, dispatches to the modules | Governance (timelock) | No — immutable core |
| `ShieldModule` | Hub | Deposit logic (local + incoming cross-chain shields) | — (immutable, set once) | No |
| `TransactModule` | Hub | Transfer and unshield logic | — (immutable, set once) | No |
| `MerkleModule` | Hub | The commitment tree | — (immutable, set once) | No |
| `VerifierModule` | Hub | Holds proof verification keys | Keys settable by governance | No (contract); keys rotatable |
| `PrivacyPoolClient` | Spoke | Thin bridge — sends USDC to the hub, delivers unshielded USDC; no shielded state | Owner (hub pointer, hook router, finality) | No |
| `CCTPHookRouter` | Hub + Spoke | Receives CCTP messages, mints USDC and calls the destination contract atomically | Relayer-gated relay entrypoint | No |
| gasless-shield wrapper | Hub + Spoke | Optional permit-based entrypoint for gasless shields | — | No |

See [The PrivacyPool](/architecture/privacy-pool) and [Cross-chain flow](/architecture/cross-chain).

## Yield

| Contract | Chain | Role | Controlled by | Upgradeable |
|---|---|---|---|---|
| `ArmadaYieldVault` | Hub | Vault that issues yield-bearing shares (ayUSDC) over an external yield source | Governance | No |
| `ArmadaYieldAdapter` | Hub | Trustless bridge: unshield → deposit/redeem → shield, in one proven transaction | Authorized via the adapter registry | No |

The vault's underlying yield source is external (Aave on mainnet; a mock stands in on testnet). See
[Shielded yield](/flows/shielded-yield).

## Fees

| Contract | Chain | Role | Controlled by | Upgradeable |
|---|---|---|---|---|
| `ArmadaFeeModule` | Hub | Computes shield and yield fees — rates, volume tiers, integrator terms | Governance | Yes (UUPS, via timelock) |

The fee module *computes* fees; the fee itself is paid to the treasury (protocol take) and to the
integrator (their share). See [Fees](/fees/).

## Governance

| Contract | Chain | Role | Controlled by | Upgradeable |
|---|---|---|---|---|
| `ArmadaToken` (ARM) | Hub | The protocol token — ownership stake, voting weight | — (immutable) | No |
| `ArmadaGovernor` | Hub | The governor — proposals, voting, classification | Governance | Yes (UUPS, via timelock) |
| `TimelockController` | Hub | Executes passed proposals after their delay; owns the governed contracts | Governor | No |
| `ArmadaTreasuryGov` | Hub | The treasury — holds protocol assets, enforces outflow limits | Timelock | No |
| `TreasurySteward` | Hub | Elected role for routine, pass-by-default treasury spending | Governance | No |
| `AdapterRegistry` | Hub | The list of adapters authorized to touch the shielded-yield surface | Timelock | No |
| `ShieldPauseController` | Hub | Holds the pause flags the Security Council can set | Timelock / Security Council | No |
| `RevenueCounter` | Hub | The canonical cumulative-revenue figure the unlock schedule reads | Governance | Yes (UUPS, via timelock) |
| `RevenueLock` | Hub | Holds team ARM, releases it as revenue milestones are met | — (immutable) | No |
| `ArmadaWindDown` | Hub | Triggers the terminal wind-down and its sweeps | — (immutable trigger logic) | No |
| `ArmadaRedemption` | Hub | Post-wind-down pro-rata redemption of treasury assets for ARM | — (immutable, permissionless) | No |

See [Governance](/governance/), [Revenue-based unlock](/revenue/), and [Wind-down](/wind-down/).

## A note on upgradeability

Most of Armada is **not** upgradeable, by design. The shielded pool's core, the ARM token, and the
revenue-lock / wind-down / redemption contracts are immutable — participants must be able to trust
that their rules cannot change. Only a small set of contracts is upgradeable, each behind a UUPS
proxy whose upgrade authority is the governance **timelock**: the governor, the fee module, and the
revenue counter. Those are the places the protocol is expected to evolve (new proposal types, new
fee types, new revenue sources), and every upgrade to them runs through the full governance
process. The full upgrade scope and its rules are detailed in
[Governance](/governance/upgrades).

The treasury is deliberately **not** among them: it is a plain, non-proxied contract, so its logic
is fixed for the life of the deployment. Changing treasury logic would mean deploying a new treasury
and migrating funds, roles, and references to it — a heavy, governance-coordinated operation (several
contracts hold the treasury address as immutable), not an in-place upgrade.
