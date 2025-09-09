---
description: A deeper dive into the Liquidity Provider  role
---

# Liquidity Providers (LPs)

Liquidity providers contribute native, network-supported assets to the THORChain liquidity pools. They may deposit any number of assets they choose of any value, doing so for their chosen amount of time; in short, there are no restrictions to LPing other than the need to pay deposit and withdrawal fees. “As stated, these LPs are compensated for their temporary contributions with swap fees, which are dynamically affected by several factors.

{% hint style="warning" %}
Liquidity providers commit capital to pools which have exposure to underlying assets. Liquidity providers THEN gain exposure to the underlying assets in each pool. Since assets can be deposited freely, LPs will experience the volatility of those assets—whether positive or negative.

While LPs are paid liquidity fees, these remain dynamic and may not be enough to cover "Impermanent Losses", which occur when price changes happen. With their deposit, Liquidity providers are voluntarily and knowingly taking on this risk. Therefore, they should not assume they are guaranteed or entitled to receive a specific quantity of their assets back when they deposit; rather, they should expect to receive their fair share of the pool's earnings and final asset balances.
{% endhint %}

## How to LP

### Requirements & Costs

Liquidity providers must have assets to deposit and their assets must be native to a supported chain. There is no minimum amount to deposit in existing pools. However, new assets must win a competition to be listed – larger value deposits will be listed over smaller value deposits.

Liquidity providers must pay for security of their assets since security is not free. This "payment" is the requirement for liquidity providers to hold RUNE, which acts as a redeemable insurance policy whilst they are in the pool. Holding RUNE allows liquidity providers to retain an ability to economically leverage nodes to ensure security of assets. When the liquidity provider withdraws, they can sell their RUNE back to the asset they desire.

The only direct cost to liquidity providers is the [network fee](../../how-it-works/fees.md#network-fee), charged for withdrawing assets (pays for the compute resources and gas costs in order to process outbound transactions). An indirect cost to liquidity providers comes in the form of impermanent loss. Impermanent loss is common to Constant Function Market Makers like THORChain. It leads to potential loss of liquidity provider purchasing power as a result of price slippage in pools. However, this is minimised by THORChain's [slip-based fee](../../how-it-works/fees.md#slip-based-fee).

Liquidity providers are not subject to any direct penalties for misconduct.

### Process

The process of providing liquidity to THORChain pools is permissionless, non-custodial, and quite simple. First, a user—anyone at all—would deposit their asset(s) to the pool. They would remain in that pool for some amount of time, entirely of their choosing. When they wish to withdraw their pool share, they simply reverse the first step.

Anyone can add liquidity to existing pools; the same goes for proposing new asset pools (this is done simply by depositing it—see [asset listing/delisting](../../how-it-works/governance.md#chain-listing-delisting) for details). Once a new asset pool is listed, anybody can add liquidity to it. It is in this sense that THORChain is permissionless.

Liquidity can be added to existing pools at any time, increasing its depth and attracting swappers with low fees, for the deeper the liquidity, the more affordable the cost of the swap. With that said, deep pools generally have higher swap volume; this in turn generates more fee revenue for LPs.

### **Depositing Assets**

Liquidity providers have two modes by which they can deposit assets: symmetrically or asymmetrically.

{% hint style="info" %}
**Symmetrical vs Asymmetrical Deposits**

**Symmetrical deposits**, the standard approach to providing liquidity, is the method in which the LP deposits an _equal_ value of 2 assets to a pool—e.g., user deposits $1000 of BTC + $1000 of RUNE simultaneously to the BTC/RUNE pool.

**Asymmetrical deposits**, in contrast, is the LPing method whereby users deposit _unequal_ values of 2 assets to a pool—e.g., a user deposits $2000 of BTC and $0 of RUNE to the BTC/RUNE pool. As this method increases the price slip of the deposit transaction, the LP is (under the hood) given an ownership of the pool accounting for this. The liquidity provider will end up with <$1000 in BTC and <$1000 in RUNE. The deeper the pool, the closer the member will approach owning their pool share equal to their original total of $2000.

_Note: there is no difference between swapping into symmetrical shares, then depositing symmetrically, or depositing asymmetrically and being arbitraged to be symmetrical post-deposit. You will experience the same net slip either way._
{% endhint %}

Generally, LPs are encouraged to deposit symmetrically. However, if the pool is already imbalanced, they should deposit asymmetrically; this helps the pool return to balance, which in turn improves the network as a whole, as well as making the pool more attractive to swappers.

### Withdrawing Assets

Just as with deposits, the ability to withdraw assets is completely permissionless and non-custodial. Liquidity providers can withdraw their assets at any time. Furthermore, only the original depositor has the ability to execute the withdrawal of their pool share. The network processes their request and the liquidity provider receives their ownership percentage of the pool plus the assets they've earned. A network fee is charged whenever assets are taken out of the network. These fees go into [the network reserve](../../how-it-works/emission-schedule.md).

### Security

[Nodes ](./)are economically incentivised to never manipulate user funds (i.e. they would lose more money than they would gain by doing so); they are bound by rules of the network and have less than zero economic incentive to take control of any user-deposited assets.

## Yield

Liquidity providers deposit their assets into liquidity pools and in return earn dynamic yield. Their earnings arrive both in RUNE and the deposited pool's respective asset—e.g., BTC/RUNE LP receives fees in BTC & RUNE.

### Calculation & Distribution

When liquidity providers (LPs) deposit their assets into liquidity pools, they earn rewards over time. These rewards come in two tokens: RUNE and the asset paired in the pool (e.g. BTC in the BTC/RUNE pool).

- Rewards are calculated every block.
- Rewards are paid out when you withdraw your liquidity.

How rewards are calculated depends on whether there are any swaps (trades) in that block.

#### If There Are Swaps in the Block

When a block includes swap transactions, the rewards are based on fees collected from those swaps. Pools that earn more fees get a larger share of the rewards.

Example: 1000 RUNE in rewards split based on swap fees:

|        |                       |          |                     |          |
| ------ | --------------------- | -------- | ------------------- | -------- |
|        | **Pool Depth (RUNE)** | **Fees** | **Share (of Fees)** | Rewards  |
| Pool A | 1,000,000             | 1000     | 33%                 | 333      |
| Pool B | 2,000,000             | 0        | 0%                  | 0        |
| Pool C | 3,000,000             | 2000     | 67%                 | 667      |
| Total  | **6,000,000**         | **3000** | **100%**            | **1000** |

**If There Are No Swaps in the Block**

If a block has no swaps, the rewards are based on the size of the pools. Larger pools receive a bigger portion of the rewards.

Example: 1000 RUNE in rewards split based on pool depth:

<table><thead><tr><th width="128"></th><th></th><th></th><th></th><th></th></tr></thead><tbody><tr><td></td><td><strong>Pool Depth (RUNE)</strong></td><td><strong>Fees</strong></td><td><strong>Share (of Depth)</strong></td><td>Rewards</td></tr><tr><td>Pool A</td><td>1,000,000</td><td>0</td><td>17%</td><td>167</td></tr><tr><td>Pool B</td><td>2,000,000</td><td>0</td><td>33%</td><td>333</td></tr><tr><td>Pool C</td><td>3,000,000</td><td>0</td><td>50%</td><td>500</td></tr><tr><td>Total</td><td><strong>6,000,000</strong></td><td><strong>0</strong></td><td><strong>100%</strong></td><td><strong>1000</strong></td></tr></tbody></table>

This ensures that yield is being sent to where demand is being experienced - with fees being the proxy. Since fees are proportional to slip, it means the increase in rewards ensure that pools experiencing a lot of slip are being incentivised and will attract more liquidity.

### **Yield Comes from Fees & Rewards**

Liquidity providers earn a yield on the assets they deposit. This yield is made up of fees.

**Fees** are paid by swappers and traders. Most swaps cause the ratio of assets in the liquidity pool to diverge from the market rate.

{% hint style="info" %}
The ratio of assets in a liquidity pool is comparable to an exchange rate.
{% endhint %}

This change in the ratio of assets is called a 'slip'. A proportion of each slip is kept in the pool. This is allocated to liquidity providers and forms part of their yield. Learn more about [swapping](swapping.md).

**Rewards** come from THORChain's own [reward emissions](../../how-it-works/emission-schedule.md). Reward emissions follow a predetermined schedule of release.

Rewards also come from a token reserve. This token reserve is continuously filled up from[ network fees](../../how-it-works/fees.md#network-fee). Part of the token reserve is paid out to liquidity providers over the long-term. This provides continuous income even during times of low exchange volume.

{% hint style="info" %}
See here for an [interactive example](https://rebase.foundation/network/thorchain/system-component/providing-liquidity) of the process.
{% endhint %}

### Factors Affecting Yield

**Ownership % of Pool** – Liquidity providers who own more of a pool receive more of that pool's rewards.

**Swap Volume** – Higher swap volumes lead to higher fees. Higher fees lead to higher rewards for liquidity providers.

**Size of Swaps** – Swappers who are in a hurry to exchange assets will tend to make larger swaps. Larger swaps lead to greater price slips and therefore higher fees.

**Incentive Pendulum** – The Incentive Pendulum balances the amount of capital bonded in the network versus pooled. It does this by changing the amount of rewards given to node operators versus liquidity providers. Sometimes rewards will be higher for liquidity providers to encourage them to deposit assets; sometimes the opposite. [Learn more](../../how-it-works/incentive-pendulum.md).

**Change in Asset Prices --** If the price of the assets change, then liquidity providers will receive more of one and less of the other. This may change yield if yield is being priced in a third asset, ie, USD.

### Yield Strategies

**Passive** liquidity providers should seek pools with deep liquidity to minimise risk and maximise returns.

**Active** liquidity providers can maximise returns by seeking out pools with shallow liquidity but high demand. This demand will cause greater slips and higher fees for liquidity providers.

## How it Works

### **Depositing Assets**

Depositing assets on THORChain is permissionless and non-custodial.

Liquidity providers can propose new asset pools or add liquidity to existing pools. Anybody can propose a new asset by depositing it. See [asset listing/delisting](../../how-it-works/governance.md#chain-listing-delisting) for details. Once a new asset pool is listed, anybody can add liquidity to it. In this sense, THORChain is permissionless.

The ability to use and withdraw assets is completely non-custodial. Only the original depositor has the ability to withdraw them. Nodes are bound by rules of the network and cannot take control of user-deposited assets.

#### Process

Liquidity can be added to existing pools to increase depth and attract swappers. The deeper the liquidity, the lower the fee. However, deep pools generally have higher swap volume which generates more fee revenue.

Liquidity providers are incentivised to deposit symmetrically but should deposit asymmetrically if the pool is already imbalanced.‌

{% hint style="info" %}
**Symmetrical vs Asymmetrical Deposits**

**Symmetrical deposits** is where users deposit an _equal_ value of 2 assets to a pool. For example, a user deposits $1000 of BTC and $1000 of RUNE to the BTC/RUNE pool.

**Asymmetrical deposits** is where users deposit _unequal_ values of 2 assets to a pool. For example, a user deposits $2000 of BTC and $0 of RUNE to the BTC/RUNE pool. Under the hood, the member is given an ownership of the pool that takes into account the slip created in the price. The liquidity provider will end up with <$1000 in BTC and <$1000 in RUNE. The deeper the pool, the closer to a total of $2000 the member will own.

_Note: there is no difference between swapping into symmetrical shares, then depositing that, or depositing asymmetrically and being arbitraged to be symmetrical. You will still experience the same net slip._
{% endhint %}

### Withdrawing Assets

Liquidity providers can withdraw their assets at any time. The network processes their request and the liquidity provider receives their ownership % of the pool along with the assets they've earned. A network fee is taken whenever assets are taken out of the network. These are added to [the network reserve](../../how-it-works/emission-schedule.md#reserve-outflows-and-inflows).

## How Yield is Calculated

The yield of a pool on THORChain is calculated using a metric called **Liquidity Unit Value Index** (LUVI) which can be viewed on [Midgard](https://midgard.ninerealms.com/v2/pools).

When a user deposits assets into a liquidity pool, they are given ownership of Liquidity Units which represent a percentage of ownership of the pool. LUVI is a measure of the relative value of each liquidity unit and is independent of price.

$$
LUVI =\frac{ \sqrt (Asset \ Depth * Rune \ Depth)}{Pool \ Units} \\ \\
$$

Where:

$$
Pool \ Units = Liquidity \ Units + Synth \ Units
$$

{% hint style="info" %}
Learn more about [Liquidity Units](https://docs.thorchain.org/thorchain-finance/continuous-liquidity-pools#calculating-pool-ownership) and [Synth Units](https://docs.thorchain.org/thorchain-finance/continuous-liquidity-pools#calculating-pool-ownership)
{% endhint %}

The yield of a pool uses LUVI value data from the previous 30 days and extrapolates an APR if that performance is repeated over the course of a year. A `period` parameter may be used to change the number of days of data that are taken into consideration.

{% hint style="info" %}
Example: [https://midgard.ninerealms.com/v2/pools?period=100d](https://midgard.ninerealms.com/v2/pools?period=100d) calculates the APR of a pool with the previous 100 days of data rather than the default of 30 days.
{% endhint %}

Factors that affect LUVI:

- Swap fees, block rewards, and pool donations increase LUVI and are the primary yield sources
- An increase of the synthetic asset liability of a pool decreases LUVI
- An increase in `ASSET Depth` or `RUNE Depth` of a pool increase LUVI
- Changes in the ratio of `ASSET Depth` and `RUNE Depth` in a pool change LUVI
- Changes in `ASSET Price` or `RUNE Price` do not necessarily change LUVI.

For more information, see: [Liquidity Pooling Example High Level](https://www.youtube.com/watch?v=Kzt9SAQRvUQ)

## Risks associated with providing liquidity

Alongside the obvious investment risks of any asset, with liquidity provision, there also comes the risk of impermanent (price-divergent) loss. The bigger the divergence of price between the two assets, the more you are exposed to impermanent loss.

> _When you provide liquidity in a liquidity pool, the two assets are bound together by the system because it will ensure that both sides of the pool have the same value._ _If the price of your deposited assets changes in the wider markets, then swappers will sell one side of the pool for the other. Thus your assets are continuously sold "on the way up" or "on the way down". In fact, your assets are sold at a price that is an average of the starting price and ending price. If you then compare your original deposited assets with what you finally get, you will think you "could have got a better price based on today's value"_

This is called impermanent loss because the losses are only realised when you withdraw from the pool. If the ratio swings to 5x (25.5% IL) but comes back to the same ratio when you entered the pool and withdrew your liquidity at that time, you will not have suffered any impermanent loss. It is similar to traditional finance’s unrealized losses. However, when you withdraw your liquidity from the pool at any other time, the loss becomes real and permanent. The fees you earn are generally able to compensate for those losses, or you may experience no loss at all and withdraw well compensated for your time in the pool.

LPs are encouraged to provide liquidity in pools that they are bullish on, or neutral on (don't care what the final price is). If an LP provides assets in a pool that they become bearish on, then they will be emotionally affected by the price draw-down, and may pull their assets out and realise a permanent loss.
