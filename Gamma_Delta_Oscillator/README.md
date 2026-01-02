# Gamma Delta Oscillator - Enhanced

A ThinkOrSwim indicator that measures the divergence between Implied Volatility (IV) rate of change and Price rate of change to identify hedging pressure and potential volatility expansion/contraction zones.

---

## 📊 Core Concept

The indicator is built on the relationship between **Gamma** (IV changes) and **Delta** (price changes) in options trading:

```
Oscillator = IV Rate of Change - Price Rate of Change
```

| Oscillator Value   | Interpretation                                                                          |
| ------------------ | --------------------------------------------------------------------------------------- |
| **Positive (> 0)** | IV rising faster than price → Hedging pressure increasing → Volatility expansion likely |
| **Negative (< 0)** | Price moving faster than IV → Calmer regime → Trend continuation possible               |
| **Extreme High**   | Excessive hedging → Potential reversal or volatility spike                              |
| **Extreme Low**    | Complacency → Watch for mean reversion                                                  |

---

## 🔧 Indicator Components

### 1. Main Oscillator Line
The smoothed divergence between IV ROC and Price ROC.

**Color Coding:**
- 🟢 **Green** - Positive oscillator with increasing momentum
- 🟢 **Dark Green** - Positive but weakening momentum
- 🔴 **Red** - Negative oscillator with increasing (downward) momentum
- 🔴 **Dark Red** - Negative but weakening momentum
- 🔵 **Cyan** - Above upper band (extreme high)
- 🟣 **Magenta** - Below lower band (extreme low)
- 🟡 **Yellow** - In squeeze (low volatility consolidation)

### 2. Signal Line (Orange Dashed)
An EMA of the oscillator for smoother signals and potential crossover entries.

### 3. Threshold Bands
Dynamic bands based on standard deviation:
- **Upper Band** = Mean + (BandMult × StdDev)
- **Lower Band** = Mean - (BandMult × StdDev)
- **Mid Band** = Mean (dashed gray)

### 4. Histogram
Visual representation of oscillator values with momentum-aware coloring.

### 5. Acceleration Dots
Shows whether momentum is accelerating or decelerating:
- Bright colors = momentum increasing in oscillator direction
- Light colors = momentum decreasing (potential reversal)

---

## 🎯 Key Features

### Squeeze Detection
Identifies periods of low volatility consolidation when bands contract.

| Visual                       | Meaning                                         |
| ---------------------------- | ----------------------------------------------- |
| **Yellow dots on zero line** | Currently in squeeze                            |
| **"SQUEEZE FIRED!" bubble**  | Squeeze just released - expect directional move |

### Divergence Detection
Automatically identifies bullish and bearish divergences:

- **Bullish Divergence** (🟢 wedge up): Price makes lower low, oscillator makes higher low
- **Bearish Divergence** (🔴 wedge down): Price makes higher high, oscillator makes lower high

### RSI Momentum Filter
Optional RSI confirmation to filter out weak signals:
- Bullish signals require RSI > 50 and not overbought
- Bearish signals require RSI < 50 and not oversold

### Signal Strength Meter
Combines multiple factors into a 0-100% score:
- Trend strength (distance from bands)
- Momentum alignment (RSI + oscillator agreement)
- Band position (extreme readings)
- Acceleration (momentum direction)

---

## 📈 Trade Signals

### Strong Signals (High Confidence)
**Cyan Arrow Up (Long):**
- Oscillator crosses above zero
- Price above signal MA AND in uptrend
- RSI bullish and not overbought
- Momentum accelerating upward

**Magenta Arrow Down (Short):**
- Oscillator crosses below zero
- Price below signal MA AND in downtrend
- RSI bearish and not oversold
- Momentum accelerating downward

### Weak Signals (Lower Confidence)
Smaller dark green/red arrows when only some conditions are met.

---

## 🏷️ Labels Explained

| Label                   | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| **Signal Strength: X%** | Overall signal quality (green ≥75%, yellow ≥50%, orange ≥25%, red <25%) |
| **OSC: X.XX**           | Current oscillator value with state (EXTREME HIGH/LOW, SQUEEZE)         |
| **Momentum/Accel**      | Direction arrows showing momentum and acceleration                      |
| **RSI(14): XX**         | RSI value with OB/OS status                                             |
| **TREND**               | Current trend direction based on fast/slow MA crossover                 |
| **PRICE**               | Price action relative to MA or breakout/breakdown status                |
| **Vol Regime**          | Percentage of time oscillator was positive over lookback period         |
| **BIAS**                | Overall market bias summary with confluence indicator                   |

---

## ⚙️ Input Parameters

### Core Settings
| Input             | Default | Description                        |
| ----------------- | ------- | ---------------------------------- |
| `priceLength`     | 5       | Lookback for price rate of change  |
| `ivLength`        | 5       | Lookback for IV rate of change     |
| `smooth`          | 3       | Smoothing period for divergence    |
| `extremeLookback` | 20      | Window for extreme pivot detection |

### Band Settings
| Input              | Default | Description                                                |
| ------------------ | ------- | ---------------------------------------------------------- |
| `bandMult`         | 2.0     | Standard deviation multiplier for bands                    |
| `squeezeThreshold` | 0.5     | Sensitivity for squeeze detection (lower = more sensitive) |

### Moving Averages
| Input           | Default | Description                       |
| --------------- | ------- | --------------------------------- |
| `maLength`      | 20      | Main MA for price action analysis |
| `tradeSignalMA` | 10      | MA for trade signal confirmation  |
| `fastMALength`  | 10      | Fast MA for trend detection       |
| `slowMALength`  | 30      | Slow MA for trend detection       |

### RSI Settings
| Input           | Default | Description                     |
| --------------- | ------- | ------------------------------- |
| `rsiLength`     | 14      | RSI calculation period          |
| `rsiOverbought` | 70      | Overbought threshold            |
| `rsiOversold`   | 30      | Oversold threshold              |
| `useRSIFilter`  | yes     | Enable/disable RSI confirmation |

### Divergence Settings
| Input                | Default | Description                       |
| -------------------- | ------- | --------------------------------- |
| `divergenceLookback` | 10      | Bars to look back for divergences |
| `showDivergences`    | yes     | Enable divergence detection       |

### Visual Settings
| Input                | Default | Description                   |
| -------------------- | ------- | ----------------------------- |
| `showBubbles`        | yes     | Show info bubbles at extremes |
| `showArrows`         | yes     | Show arrows at extreme pivots |
| `showCloud`          | yes     | Show band cloud fill          |
| `showHistogram`      | yes     | Show histogram                |
| `showSignalStrength` | yes     | Show signal strength label    |

---

## 🔔 Alerts

The indicator includes the following alerts:
- Oscillator crosses above/below zero
- Oscillator crosses above upper / below lower band
- Bullish/Bearish divergence detected
- Volatility squeeze fired

---

## 💡 Trading Strategies

### Strategy 1: Zero Line Cross with Trend
1. Wait for oscillator to cross zero
2. Confirm trend direction (fast MA > slow MA for longs)
3. Check RSI is not in extreme territory
4. Enter on strong signal arrows

### Strategy 2: Squeeze Breakout
1. Watch for yellow squeeze dots appearing
2. Prepare for breakout when "SQUEEZE FIRED" bubble appears
3. Enter in direction of oscillator breakout
4. Use band extremes as profit targets

### Strategy 3: Divergence Reversals
1. Identify bullish/bearish divergence signals
2. Wait for oscillator to confirm with zero line cross
3. Enter counter-trend with tight stops
4. Target the opposite band extreme

### Strategy 4: Extreme Mean Reversion
1. Wait for oscillator to reach extreme (cyan/magenta)
2. Look for momentum deceleration (lighter colored dots)
3. Enter reversal when oscillator turns back toward zero
4. Target mid-band or zero line

---

## ⚠️ Important Notes

1. **IV Data Required** - This indicator requires implied volatility data. It works best on optionable securities. A warning label appears if IV data is unavailable.

2. **Best Timeframes** - Works on all timeframes but most effective on intraday (5min, 15min, 1hr) and daily charts.

3. **Use with Price Action** - Always confirm signals with price action and support/resistance levels.

4. **Not a Standalone System** - Best used as part of a complete trading system with proper risk management.

---

## 📁 Version History

| Version        | Changes                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| 1.0            | Initial release                                                                                            |
| 2.0 (Enhanced) | Added RSI filter, squeeze detection, divergences, signal strength, momentum acceleration, improved visuals |
