---
description: Providing liquidity to THORChain liquidity pools.
---

# Liquidity Providers

Liquidity providers provide assets to the THORChain liquidity pools. They are compensated with swap fees and system rewards. Compensation is affected by a number of factors related to the pool and the state of the network.

{% hint style="warning" %}
Liquidity providers commit capital to pools which have exposure to underlying assets, thus liquidity providers gain exposure to those assets, which have free-floating market prices.

While they are paid block rewards and liquidity fees, these are dynamic and may not be enough to cover "Impermanent Losses", which occur when price changes happen.

Liquidity providers should not consider they are entitled to receive a specific quantity of their assets back when they deposit, rather that they will receive their fair share of the pool's earnings and final asset balances.
{% endhint %}

## Compensation

Liquidity providers deposit their assets in liquidity pools and earn yield in return. They earn tokens in Rune and the pool's connected asset. For example, someone who has deposited in the BTC/RUNE pool will receive rewards in BTC and RUNE.

Yield is calculated for liquidity providers every block. Yield is paid out to liquidity providers when they remove assets from the pool.

Rewards are calculated according to whether or not the block contains any swap transactions. If the block contains swap transactions then the amount of fees collected per pool sets the amount of rewards. If the block doesn't contain trades then the amount of assets in the pool determines the rewards.

{% tabs %}
{% tab title="BLOCK WITH SWAPS" %}
How a block with fees splits the reward. In this example, 1000 RUNE is being divided as rewards:

| **Pool Depth \(RUNE\)** | **Fees** | **Share \(of Fees\)** | Rewards |
| :--- | :--- | :--- | :--- |
| 1,000,000 | 1000 | 33% | 333 |
| 2,000,000 | 0 | 0% | 0 |
| 3,000,000 | 2000 | 67% | 667 |
| **6,000,000** | **3000** | **100%** | **1000** |
{% endtab %}

{% tab title="BLOCK WITH NO SWAPS" %}
How a block with no fees splits the rewards. In this example, 1000 RUNE is being divided:

| **Pool Depth \(RUNE\)** | **Fees** | **Share \(of Depth\)** | Rewards |
| :--- | :--- | :--- | :--- |
| 1,000,000 | 0 | 17% | 167 |
| 2,000,000 | 0 | 33% | 333 |
| 3,000,000 | 0 | 50% | 500 |
| **6,000,000** | **0** | **100%** | **1000** |
{% endtab %}
{% endtabs %}

This ensures that yield is being sent to where demand is being experienced - with fees being the proxy. Since fees are proportional to slip, it means the increase in rewards ensure that pools experiencing a lot of slip are being incentivised and will attract more liquidity.

### Factors Affecting Yield

**Ownership % of Pool** – Liquidity providers who own more of a pool receive more of that pool's rewards.

**Swap Volume** – Higher swap volumes lead to higher fees. Higher fees lead to higher rewards for liquidity providers.

**Size of Swaps** – Swappers who are in a hurry to exchange assets will tend to make larger swaps. Larger swaps lead to greater price slips and therefore higher fees.

**Incentive Pendulum** – The Incentive Pendulum balances the amount of capital bonded in the network versus pooled. It does this by changing the amount of rewards given to node operators versus liquidity providers. Sometimes rewards will be higher for liquidity providers to encourage them to deposit assets; sometimes the opposite. [Learn more](../how-it-works/incentive-pendulum.md).

**Change in Asset Prices --** If the price of the assets change, then liquidity providers will receive more of one and less of the other. This may change yield if yield is being priced in a third asset, ie, USD.

### Calculating Pool Ownership

When a liquidity provider commmit capital, the ownership % of the pool is calculated:

$$
\text{slipAdjustment} = 1 -  \mid\frac {R a - r A}{(2 r + R)*(a + A)}\mid
$$

$$
\text{units} = \frac {P(R a + r A)}{2 RA}*slipAdjustment
$$

* r = rune deposited 
* a = asset deposited
* R = Rune Balance \(before\)
* A = Asset Balance \(before\)
* P = Existing Pool Units

The liquidity provider is allocated rewards proportional to their ownership of the pool. If they own 2% of the pool, they are allocated 2% of the pool's rewards.

## How it Works

### **Depositing Assets**

Depositing assets on THORChain is permissionless and non-custodial.

Liquidity providers can propose new asset pools or add liquidity to existing pools. Anybody can propose a new asset by depositing it. See [asset listing/delisting](https://) for details. Once a new asset pool is listed, anybody can add liquidity to it. In this sense, THORChain is permissionless.

The ability to use and withdraw assets is completely non-custodial. Only the original depositor has the ability to withdraw them. Nodes are bound by rules of the network and cannot take control of user-deposited assets.

#### Process

Liquidity can be added to existing pools to increase depth and attract swappers. The deeper the liquidity, the lower the fee. However, deep pools generally have higher swap volume which generates more fee revenue.

Liquidity providers are incentivised to deposit symmetrically but should deposit asymmetrically if the pool is already imbalanced.‌

{% hint style="info" %}
**Symmetrical vs Asymmetrical Deposits**

**Symmetrical deposits** is where users deposit an _equal_ value of 2 assets to a pool. For example, a user deposits $1000 of BTC and $1000 of RUNE to the BTC/RUNE pool.

**Asymmetrical deposits** is where users deposit _unequal_ values of 2 assets to a pool. For example, a user deposits $2000 of BTC and $0 of RUNE to the BTC/RUNE pool. Under the hood, the member is given an ownership of the pool that takes into account the slip created in the price. The liquidity provider will end up with &lt;$1000 in BTC and &lt;$1000 in RUNE. The deeper the pool, the closer to a total of $2000 the member will own.

_Note: there is no difference between swapping into symmetrical shares, then depositing that, or depositing asymmetrically and being arb'd to be symmetrical. You will still experience the same net slip._
{% endhint %}

### Withdrawing Assets

Liquidity providers can withdraw their assets at any time. The network processes their request and the liquidity provider receives their ownership % of the pool along with the assets they've earned. A network fee is taken whenever assets are taken out of the network. These are placed into [the network reserve](../how-it-works/emission-schedule.md).

### **Yield Comes from Fees & Rewards**

Liquidity providers earn a yield on the assets they deposit. This yield is made up of fees and rewards.

**Fees** are paid by swappers and traders. Most swaps cause the ratio of assets in the liquidity pool to diverge from the market rate.

{% hint style="info" %}
The ratio of assets in a liquidity pool is comparable to an exchange rate.
{% endhint %}

This change to the ratio of assets is called a 'slip'. A proportion of each slip is kept in the pool. This is allocated to liquidity providers and forms part of their staking yield. Learn more about [swapping](swapping.md).

**Rewards** come from THORChain's own [reward emissions](../how-it-works/emission-schedule.md). Reward emissions follow a predetermined schedule of release.

Rewards also come from a large token reserve. This token reserve is continuously filled up from[ network fees](../how-it-works/fees.md#network-fee). Part of the token reserve is paid out to liquidity providers over the long-term. This provides continuous income even during times of low exchange volume.

Learn about how [factors affecting yield and how yield is calculated](https://github.com/thorchain/docs/tree/14ece484bcf892fa893159b79c0d469113061c53/roles/staking.md#compensation).

{% hint style="info" %}
See here for an [interactive example](https://rebase.foundation/network/thorchain/system-component/providing-liquidity) of the staking process.
{% endhint %}

### Strategies

**Passive** liquidity providers should seek out pools with deep liquidity to minimise risk and maximise returns.

**Active** liquidity providers can maximise returns by seeking out pools with shallow liquidity but high demand. This demand will cause greater slips and higher fees for liquidity providers.

## Requirements, Costs

Liquidity providers must have assets to deposit and their assets must be native to a supported chain. There is no minimum amount to deposit in existing pools. However new assets must win a competition to be listed – larger value deposits will be listed over smaller value deposits.

Liquidity providers must pay for security of their assets, since security is not free. This "payment" is the requirement for liquidity providers to hold RUNE, which acts as a redeemable insurance policy whilst they are in the pool. Holding RUNE allows liquidity providers to retain an ability to economically leverage nodes to ensure security of assets. When the liquidity provider withdraws, they can sell their RUNE back to the asset they desire. H

The only direct cost to liquidity providers is the [network fee](../how-it-works/fees.md#network-fee), charged for depositing and withdrawing assets. An indirect cost to liquidity providers comes in the form of impermanent loss. Impermanent loss is common to Constant Function Market Makers like THORChain. It leads to potential loss of liquidity provider purchasing power as a result of price slippage in pools. However, this is minimised by THORChain's [slip-based fee](../how-it-works/fees.md#slip-based-fee).

Liquidity providers are not subject to any direct penalties for misconduct.

