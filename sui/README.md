# tokenX — Move Contracts (Sui)

This directory contains the core Move smart contracts for **tokenX**, a public participation token and network rooted in the Caribbean.

These contracts are designed to reflect the principles defined in:
- [`charter.md`](../charter.md)
- [`tokenomics.md`](../tokenomics.md)

The goal is **alignment**: what tokenX claims to be socially and culturally should be enforceable (or at least not contradicted) by code.

---

## Design Philosophy

tokenX contracts are built around a few constraints:

- **Participation over permission**
- **No promises of returns**
- **Fixed supply**
- **Explicit, auditable rules**
- **Minimal on-chain governance early**

The contracts intentionally avoid:
- dividend logic
- yield guarantees
- complex on-chain governance
- price controls
- opaque admin powers

This keeps the system honest.

---

## Contract Overview

At a high level, tokenX on Sui consists of four core modules:

```

tokenx/
├── token.move          # token definition & fixed supply
├── vesting.move        # time-locked allocations
├── staking.move        # participation staking
├── registry.move       # project / event registration

````

Each module maps directly to a concept in the Charter.

---

## 1. `token.move` — The tokenX Token

### Charter Alignment
- **Fixed supply**
- **No inflation**
- **No rebasing**
- **No embedded yield**

### Responsibilities
- Define the `tokenX` coin type
- Mint the full fixed supply at genesis
- Transfer mint authority to Foundation-controlled object
- Expose standard Sui coin interfaces

### Key Properties
- Total supply: **10,000,000,000 tokenX**
- No function to mint additional tokens
- No burn-by-default (burns only via explicit modules)

### Example (conceptual)

```move
module tokenx::token {
    use sui::coin;

    struct TOKENX has store, drop {}

    public fun init(ctx: &mut TxContext) {
        let (treasury_cap, supply) = coin::create<TOKENX>(
            10_000_000_000,
            ctx
        );
        // treasury_cap is transferred to Foundation
        transfer::transfer(treasury_cap, foundation_address());
        transfer::transfer(supply, foundation_address());
    }
}
````

**Why this matters:**
The code enforces that tokenX cannot quietly become inflationary or yield-bearing later.

---

## 2. `vesting.move` — Transparent Token Unlocks

### Charter Alignment

* **No hidden allocations**
* **On-chain, auditable vesting**
* **No discretionary unlocks**

### Responsibilities

* Hold locked tokenX allocations
* Release tokens according to time-based schedules
* Enforce cliffs and linear vesting
* Prevent early withdrawal

### Used For

* Core team allocations
* Early backers
* Foundation long-term stewardship

### Key Properties

* All vesting schedules are immutable once created
* Anyone can inspect:

  * start time
  * cliff
  * duration
  * released vs locked amounts

### Conceptual Interface

```move
struct VestingSchedule has key {
    beneficiary: address,
    total: u64,
    released: u64,
    start_time: u64,
    cliff_time: u64,
    end_time: u64,
}
```

**Why this matters:**
This enforces the Charter’s promise of transparency and avoids off-chain trust.

---

## 3. `staking.move` — Participation Staking

### Charter Alignment

* **Participation, not passive yield**
* **No guaranteed returns**
* **Voluntary involvement**

### Responsibilities

* Allow users to stake tokenX
* Lock tokens for participation signaling
* Support cooldown-based unstaking
* Emit events for ecosystem visibility

### What Staking Is (and Is Not)

* ✔ Signal commitment
* ✔ Enable participation (e.g., registry access)
* ✘ No APY
* ✘ No auto-rewards
* ✘ No revenue distribution

### Key Properties

* Staking does not mint new tokenX
* No rewards are promised or embedded
* Any future incentives must be explicit and opt-in

### Conceptual Interface

```move
struct Stake has key {
    owner: address,
    amount: u64,
    locked_until: u64,
}
```

**Why this matters:**
This keeps staking aligned with coordination, not financial engineering.

---

## 4. `registry.move` — Projects & Events

### Charter Alignment

* **Open participation**
* **Culture as infrastructure**
* **No permission required**

### Responsibilities

* Allow anyone to register a project, event, or initiative
* Require a minimum stake to prevent spam
* Store metadata references (IPFS / off-chain)
* Emit events for discovery

### What the Registry Does Not Do

* It does not judge quality
* It does not curate content
* It does not grant authority

The registry is a **public coordination surface**, not a gatekeeper.

### Conceptual Interface

```move
struct RegistryEntry has key {
    owner: address,
    stake_id: ID,
    metadata_uri: vector<u8>,
    created_at: u64,
}
```

**Why this matters:**
This keeps cultural and economic expression open while maintaining minimal friction.

---

## Foundation Powers & Limits

### What the Foundation Can Do (in code)

* Hold treasury cap
* Fund grants via explicit transfers
* Deploy new modules (if upgradeable)
* Publish ecosystem guidance

### What the Foundation Cannot Do

* Mint new tokenX
* Confiscate user funds
* Force participation
* Control price or markets

Any privileged action must be:

* explicit
* inspectable
* narrow in scope

This mirrors the Charter’s definition of stewardship.

---

## Governance (Early Stage)

Early governance is intentionally minimal:

* No on-chain voting in v0
* No DAO logic
* Signaling happens off-chain
* Code changes are deliberate and slow

This avoids premature ossification and governance theater.

---

## Security & Audit Notes

* Contracts are intentionally small and readable
* No complex math or DeFi primitives
* External calls are minimized
* All time logic uses chain time, not user input

Before mainnet:

* independent audit recommended
* community review encouraged
* testnet deployment required

---

## Chain-Agnostic Intent

While these contracts are written for **Sui Move**, the design intentionally avoids Sui-specific assumptions where possible.

Core concepts (fixed supply, vesting, staking, registry) are portable to:

* Ethereum (ERC-20 + modules)
* Solana (SPL + programs)
* other Move-based chains

tokenX is a network idea first, an implementation second.

---

## Closing

The purpose of these contracts is not to control outcomes.

It is to:

* enforce honesty
* prevent quiet drift
* align code with stated intent

tokenX is an open experiment.

The code reflects that — deliberately.

---

*tokenX does not promise returns. Participation is voluntary and involves risk.*
