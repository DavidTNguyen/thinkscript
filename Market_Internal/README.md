# Market Internals Dashboard v3.0

A comprehensive ThinkScript indicator for monitoring market-wide internals with smart scoring, divergence detection, and dynamic VIX-based thresholds.

## Overview

This dashboard aggregates 7 key market internal metrics into a single normalized scoring system to help traders assess overall market health and direction in real-time.

---

## Metrics Tracked

| Metric              | Symbol       | What It Measures                     |
| ------------------- | ------------ | ------------------------------------ |
| **UVOL/DVOL %**     | $UVOL, $DVOL | Up volume vs down volume ratio       |
| **ADD (Breadth)**   | $ADD         | NYSE Advancing - Declining issues    |
| **TICK**            | $TICK        | NYSE upticks - downticks             |
| **TRIN**            | $TRIN        | Arms Index (volume-weighted breadth) |
| **NH/NL Ratio**     | $NAUH, $NADL | New 52-week Highs / New 52-week Lows |
| **VIX**             | $VIX         | Fear/volatility index                |
| **Cumulative TICK** | Derived      | Running sum of TICK readings         |

---

## NH/NL Ratio Explained

The **NH/NL (New Highs/New Lows) ratio** is a market breadth indicator comparing stocks making new 52-week highs versus new 52-week lows.

### What It Measures
- **New Highs (NH)**: Stocks hitting their highest price in 52 weeks
- **New Lows (NL)**: Stocks hitting their lowest price in 52 weeks
- **Ratio**: NH ÷ NL

### Interpretation

| NH/NL Ratio | Market Condition              |
| ----------- | ----------------------------- |
| > 10        | Very strong breadth (bullish) |
| > 3         | Healthy breadth (bullish)     |
| ~1          | Balanced market               |
| < 0.5       | Weak breadth (bearish)        |
| < 0.3       | Very weak breadth (bearish)   |

### Why It Matters
- **Confirms trends**: In a healthy uptrend, more stocks should be making new highs than new lows
- **Spots divergences**: If SPY is rising but NH/NL is falling, the rally may be narrowing (fewer stocks participating)
- **Warns of reversals**: A market making new highs with shrinking NH/NL ratio often precedes corrections

### Platform Availability
- **ThinkOrSwim**: Uses `$NAUH` (NYSE New Highs) and `$NADL` (NYSE New Lows) directly
- **TradingView**: These symbols aren't available, so the PineScript version uses an ADD-based proxy to estimate breadth strength

---

## Labels Explained

### Label 1: INTERNALS (Main Overview)
```
INTERNALS | BULLISH | Str: 72 | Conf: 85%
```
- **Scenario**: STRONG BULLISH / BULLISH / lean bull / NEUTRAL / lean bear / BEARISH / STRONG BEARISH
- **Strength (Str)**: 0-100 scale (50 = neutral)
- **Confidence (Conf)**: How strong the signal is based on score magnitude

### Label 2: TREND
```
TREND: UP | ADD:+ TICK:+ TRIN:+ VIX:+
```
- Shows overall trend direction (STRONG UP / UP / FLAT / DOWN / STRONG DOWN)
- Individual metric trends: `+` (bullish), `-` (bearish), `=` (neutral)

### Label 3: METRICS (Raw Values)
```
UVOL%: 62.5 | ADD: 850 | TICK: 620! | TRIN: 0.78 | NH/NL: 4.2x | VIX: 14.50 (-0.32)
```
- Shows actual values for each metric
- `!` indicates extreme reading

### Label 4: SCORES BREAKDOWN
```
Scores: VOL:1 ADD:1 TICK:0.5 TRIN:0.5 NH/NL:0.5 VIX:1 = 4.5
```
- Individual normalized scores (-1 to +1 per metric)
- Total composite score shown at end

---

## Scoring System

Each metric is scored from **-1 to +1**:

| Score | Meaning          |
| ----- | ---------------- |
| +1    | Strongly bullish |
| +0.5  | Mildly bullish   |
| 0     | Neutral          |
| -0.5  | Mildly bearish   |
| -1    | Strongly bearish |

**Total Score Range**: -7 to +7

| Total Score | Scenario       |
| ----------- | -------------- |
| ≥ 3         | STRONG BULLISH |
| ≥ 1.5       | BULLISH        |
| ≥ 0.5       | lean bull      |
| -0.5 to 0.5 | NEUTRAL        |
| ≤ -0.5      | lean bear      |
| ≤ -1.5      | BEARISH        |
| ≤ -3        | STRONG BEARISH |

---

## Special Signals

### Trading Signals
- **BULLISH SIGNAL!** - All conditions aligned for bullish continuation
- **BEARISH SIGNAL!** - All conditions aligned for bearish continuation
- **REVERSAL UP?** - Potential bullish reversal forming
- **REVERSAL DOWN?** - Potential bearish reversal forming

### Divergence Alerts
- **BULLISH DIVERGENCE!** - Internals bullish while SPY is down (potential bounce)
- **BEARISH DIVERGENCE!** - Internals bearish while SPY is up (potential drop)

### Extreme Zone Alerts
- **TICK EXTREME BULL/BEAR!** - TICK above 1000 or below -1000
- **ADD EXTREME BULL/BEAR!** - ADD above 1500 or below -1500
- **TRIN EXTREME BULL/BEAR!** - TRIN below 0.5 or above 2.0
- **VIX FEAR SPIKE!** - VIX above 35
- **VIX COMPLACENT!** - VIX below 18

---

## Dynamic VIX Thresholds

When `useDynamicThresholds = yes`, thresholds adjust based on VIX regime:

| VIX Level | Regime   | Multiplier | Effect                 |
| --------- | -------- | ---------- | ---------------------- |
| < 18      | Calm     | 0.8x       | Tighter thresholds     |
| 18-25     | Normal   | 1.0x       | Standard thresholds    |
| 25-35     | Elevated | 1.3x       | Looser thresholds      |
| > 35      | Fear     | 1.6x       | Much looser thresholds |

This prevents false signals during high volatility periods.

---

## Input Settings

| Input                  | Default | Description                |
| ---------------------- | ------- | -------------------------- |
| `showLabels`           | yes     | Display all labels         |
| `enableAlerts`         | yes     | Enable audio/popup alerts  |
| `lookbackPeriod`       | 10      | Bars for trend detection   |
| `useDynamicThresholds` | yes     | VIX-adjusted thresholds    |
| `showDivergenceAlerts` | yes     | Show SPY divergence alerts |
| `vixCalm`              | 18      | VIX calm threshold         |
| `vixNormal`            | 25      | VIX normal threshold       |
| `vixElevated`          | 35      | VIX elevated threshold     |
| `tickBullish`          | 500     | TICK bullish threshold     |
| `tickBearish`          | -500    | TICK bearish threshold     |
| `tickExtremeBull`      | 1000    | TICK extreme bullish       |
| `tickExtremeBear`      | -1000   | TICK extreme bearish       |
| `addBullish`           | 500     | ADD bullish threshold      |
| `addBearish`           | -500    | ADD bearish threshold      |
| `addExtremeBull`       | 1500    | ADD extreme bullish        |
| `addExtremeBear`       | -1500   | ADD extreme bearish        |

---

## How to Use

### For Scalping / Day Trading
1. Watch the **INTERNALS** label for overall market posture
2. Trade with the trend when scenario is BULLISH/BEARISH
3. Be cautious when NEUTRAL or lean bull/bear
4. Watch for **REVERSAL** signals for counter-trend opportunities

### For Swing Trading
1. Use **DIVERGENCE** alerts to spot potential reversals
2. Monitor **TREND** label for confirmation
3. Check **Confidence %** - higher = stronger signal

### Key Rules
- ✅ **Go long** when BULLISH/STRONG BULLISH with high confidence
- ✅ **Go short** when BEARISH/STRONG BEARISH with high confidence
- ⚠️ **Be cautious** when NEUTRAL or low confidence
- 🔄 **Watch for reversals** on divergence signals
- 🚨 **Respect extremes** - often mark short-term tops/bottoms

---

## Color Coding

| Color         | Meaning         |
| ------------- | --------------- |
| 🔵 Cyan        | Strong bullish  |
| 🟢 Green       | Bullish         |
| 🟢 Light Green | Weak bullish    |
| 🟡 Yellow      | Neutral         |
| 🩷 Pink        | Weak bearish    |
| 🔴 Red         | Bearish         |
| 🟣 Magenta     | Strong bearish  |
| 🟠 Orange      | Divergence      |
| ⚪ White       | Extreme reading |

---

## Installation

1. Open ThinkOrSwim
2. Go to **Studies** → **Edit Studies**
3. Click **Create** → **thinkScript Editor**
4. Paste the entire `MARKET_INTERNAL.tosts` code
5. Name it "Market Internals Dashboard"
6. Click **OK** and apply to your chart

---

## Best Practices

1. **Use on 1-5 minute charts** for intraday trading
2. **Combine with price action** - don't trade internals alone
3. **Watch for divergences** at key support/resistance levels
4. **Adjust thresholds** based on your trading style
5. **Paper trade first** to understand the signals

---

## Changelog

### v3.0 (November 30, 2025)
- Added TRIN (Arms Index) tracking
- Added NH/NL (New Highs/New Lows) ratio
- Added true UVOL/DVOL from market data
- Added dynamic VIX-based thresholds
- Added normalized scoring system (-1 to +1)
- Added SPY divergence detection
- Added scores breakdown label
- Improved signal confirmation logic
- Better alert system with confirmation

---

## Author

Strategy by [@VietRoadie](https://github.com/DavidTNguyen/) | Enhanced with professional-grade features including dynamic VIX thresholds, normalized scoring, and divergence detection.
