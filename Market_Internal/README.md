# Market Internals Dashboard v3.2

A comprehensive market internals indicator for monitoring market-wide internals with smart scoring, divergence detection, and dynamic VIX-based thresholds.

**Available for:**
- **ThinkOrSwim** (ThinkScript) - `MARKET_INTERNAL.tosts`
- **TradingView** (Pine Script v6) - `MARKET_INTERNAL.pine`

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

## Understanding Each Metric

### UVOL/DVOL % (Up Volume / Down Volume)
**What it is**: The percentage of total NYSE volume that's going into up-ticking stocks vs down-ticking stocks.

**How to read it**:
- **> 60%**: Bullish - More volume flowing into stocks moving up
- **55-60%**: Moderately bullish
- **52-55%**: Mildly bullish
- **48-52%**: Neutral - Volume balanced
- **45-48%**: Mildly bearish
- **40-45%**: Moderately bearish
- **< 40%**: Bearish - More volume flowing into stocks moving down

**Intraday use**: 
- Early morning UVOL > 65% often predicts bullish trend day
- UVOL < 35% early often predicts bearish trend day
- Reversals: Watch for UVOL crossing 50% midday - potential trend change

**Swing trade use**:
- Strong closes (last 30 min) with UVOL > 65% = bullish continuation likely
- UVOL diverging from price = warning sign (price up but UVOL falling = weak rally)

---

### ADD (Advance/Decline Line - Breadth)
**What it is**: The number of NYSE stocks advancing minus the number declining. Measures market participation.

**How to read it**:
- **> 2000**: Extreme bullish breadth - very broad rally
- **> 750**: Strong bullish breadth
- **300-750**: Moderate bullish
- **100-300**: Mildly bullish
- **-100 to +100**: Neutral/mixed
- **-300 to -100**: Mildly bearish
- **-750 to -300**: Moderate bearish
- **< -750**: Strong bearish breadth
- **< -2000**: Extreme bearish breadth - broad selloff

**Intraday use**:
- ADD > 1000 + rising = "melt-up" conditions, don't fade
- ADD < -1000 + falling = "washout" conditions, wait for stabilization
- ADD crossing 0 = potential trend shift

**Swing trade use**:
- Sustained ADD > 500 for multiple days = healthy uptrend
- Price making new highs with ADD falling = bearish divergence (narrow leadership)
- ADD leading price lower = early warning of weakness

---

### TICK (NYSE Tick Index)
**What it is**: Real-time snapshot of stocks upticking minus downticking on the NYSE. Most volatile intraday indicator.

**How to read it**:
- **> 1000**: Extreme buying pressure (often short-term top)
- **600-1000**: Strong bullish momentum
- **400-600**: Moderate bullish
- **200-400**: Mild bullish
- **-200 to +200**: Neutral/choppy
- **-400 to -200**: Mild bearish
- **-600 to -400**: Moderate bearish
- **-1000 to -600**: Strong bearish momentum
- **< -1000**: Extreme selling pressure (often short-term bottom)

**Intraday use** (CRITICAL for scalpers):
- TICK crossing +600 = initiate longs or add to position
- TICK crossing -600 = initiate shorts or reduce longs
- **TICK extremes (+/-1000)** = fade the move - often marks 5-15 min reversals
- TICK range matters: If stuck between -200/+200 = choppy, avoid overtrading

**Swing trade use**:
- Less relevant for swing traders
- But watch close: If TICK ends day < -800 = institutional selling, expect gap down
- TICK ends day > +800 = institutional buying, expect gap up

---

### TRIN (Arms Index / Trading Index)
**How to read it**:
- **< 0.5**: Extreme bullish (oversold bounce or strong rally)
- **0.5-0.7**: Strong bullish
- **0.7-0.9**: Moderately bullish
- **0.9-0.95**: Mildly bullish
- **0.95-1.05**: Neutral
- **1.05-1.1**: Mildly bearish
- **1.1-1.3**: Moderately bearish
- **1.3-2.0**: Strong bearish
- **> 2.0**: Extreme bearish (panic selling, potential reversal)

**Intraday use**:
- TRIN < 0.7 in first hour = strong open, likely trend day up
- TRIN > 1.5 in first hour = weak open, likely trend day down
- **TRIN > 2.5** = capitulation, look for reversal longs (V-bottom setup)
- **TRIN < 0.4** = euphoric buying, potential exhaustion top

**Swing trade use**:
- Multiple days of TRIN > 1.5 = market under distribution
- TRIN < 0.8 for multiple days = market under accumulation
- TRIN spiking > 3.0 on selloff = washout, potential swing entry

---

### NH/NL Ratio (New Highs / New Lows)
**What it is**: Number of stocks making 52-week highs divided by stocks making 52-week lows.

**How to read it**:
- **> 10**: Very strong market breadth - healthy bull market
- **3-10**: Good breadth - normal uptrend
- **1-3**: Neutral to mildly bullish
- **0.5-1**: Balanced
- **0.3-0.5**: Weak breadth - caution
- **< 0.3**: Very weak breadth - bear market conditions

**Intraday use**:
- Limited - this is a POSITION/SWING indicator
- Can check at open: NH/NL > 5 = strong overnight strength

**Swing trade use** (CRITICAL):
- **Confirms trend health**: SPY at new highs with NH/NL > 5 = sustainable rally
- **Spots divergences**: SPY at new highs but NH/NL < 2 = narrow leadership, bearish
- **Warns of reversals**: NH/NL dropping below 1.0 while SPY rising = distribution
- **Finds bottoms**: NH/NL > 2 after being < 0.5 = breadth improving, potential swing long

---

### VIX (Volatility Index)
**What it is**: "Fear gauge" - measures expected 30-day volatility based on SPX options pricing.

**How to read it**:
- **< 12**: Extreme complacency - potential top forming
- **12-18**: Low volatility - calm market
- **18-25**: Normal volatility
- **25-35**: Elevated fear - choppy market
- **> 35**: High fear - potential panic, look for reversals

**Intraday use**:
- VIX rising while SPY rising = warning (rally on shaky ground)
- VIX falling while SPY rising = healthy rally
- **VIX spike > 5 points** = major reversal or event, reduce size
- VIX < 15 + falling = complacent market, fade extremes

**Swing trade use** (CRITICAL):
- **VIX < 15**: Market complacent, be ready for volatility spike
- **VIX > 30**: Fear elevated, look for mean reversion swing longs
- **VIX closing below 20-day MA** after spike = all-clear signal
- **VIX divergence**: SPY making lower lows but VIX not making higher highs = bullish divergence

---

### Cumulative TICK
**What it is**: Running sum of all TICK readings throughout the day. Shows sustained directional pressure.

**How to read it**:
- **Rising**: Sustained buying pressure throughout day
- **Falling**: Sustained selling pressure throughout day
- **Flat**: Choppy, no directional conviction

**Intraday use** (Day trader's secret weapon):
- CumTick trending up all day = stay long, add on dips
- CumTick trending down all day = stay short/cash, fade rallies
- **CumTick reversal** (from down to up or vice versa) = major shift, follow new direction
- CumTick flat + price trending = divergence, expect reversal

**Swing trade use**:
- Less relevant for multi-day holds
- But strong positive CumTick close = bullish continuation likely next day

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
- Raw values for each metric
- `!` indicates extreme reading

### Label 4: SCORES BREAKDOWN
```
Scores: VOL:0.50 ADD:0.25 TICK:-0.25 TRIN:0.25 NH/NL:0.00 CUMTICK:0.00 = 0.75
```
- Individual normalized scores (-1 to +1 per metric)
- Displayed to 2 decimal places for precision
- Total composite score shown at end
- **Note**: VIX is NOT included in the composite score (shown in METRICS only)

---

## Scoring System

Each metric is scored from **-1 to +1**:

| Score | Meaning          |
| ----- | ---------------- |
| +1    | Strongly bullish |
| +0.5  | Mildly bullish   |
| +0.25 | Slightly bullish |
| 0     | Neutral          |
| -0.25 | Slightly bearish |
| -0.5  | Mildly bearish   |
| -1    | Strongly bearish |

**Total Score Range**: -6 to +6 (VIX excluded from composite score)

**Components**: VOL + ADD + TICK + TRIN + NH/NL + CUMTICK

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

| Input                  | Default | Description                     |
| ---------------------- | ------- | ------------------------------- |
| `showLabels`           | yes     | Display all labels              |
| `enableAlerts`         | yes     | Enable audio/popup alerts       |
| `lookbackPeriod`       | 10      | Bars for trend detection        |
| `useDynamicThresholds` | no      | VIX-adjusted thresholds         |
| `showDivergenceAlerts` | yes     | Show SPY divergence alerts      |
| `compactLabels`        | no      | Condensed single-line view      |
| `ultraCompact`         | no      | Minimal single-line output      |
| `showDebug`            | no      | Show component scores breakdown |
| `vixCalm`              | 18      | VIX calm threshold              |
| `vixNormal`            | 25      | VIX normal threshold            |
| `vixElevated`          | 35      | VIX elevated threshold          |
| `tickBullish`          | 600     | TICK bullish threshold          |
| `tickBearish`          | -600    | TICK bearish threshold          |
| `tickExtremeBull`      | 1000    | TICK extreme bullish            |
| `tickExtremeBear`      | -1000   | TICK extreme bearish            |
| `addBullish`           | 750     | ADD bullish threshold           |
| `addBearish`           | -750    | ADD bearish threshold           |
| `addExtremeBull`       | 2000    | ADD extreme bullish             |
| `addExtremeBear`       | -2000   | ADD extreme bearish             |

---

## How to Use

### For Intraday Trading (Scalpers & Day Traders)

**Setup**:
1. Use **1-5 minute chart** with Market Internals Dashboard
2. Watch the main **INTERNALS** label for overall scenario
**LONG ENTRIES** - Look for:
- Scenario: BULLISH or STRONG BULLISH
- UVOL > 60%, ADD > 750, TICK > 600
- TRIN < 0.9
- Cumulative TICK trending UP
- **Entry trigger**: Price breaks resistance + all internals aligned
- **Confidence check**: If Confidence > 70%, size up

**SHORT ENTRIES** - Look for:
- Scenario: BEARISH or STRONG BEARISH  
- UVOL < 40%, ADD < -750, TICK < -600
- TRIN > 1.1
- Cumulative TICK trending DOWN
- **Entry trigger**: Price breaks support + all internals aligned
- **Confidence check**: If Confidence > 70%, size up

**REVERSAL TRADES** (Advanced):
- **Bullish reversal**: "REVERSAL UP?" alert + TICK > +1000 (extreme)
  - Wait for TICK to pull back to +400-600, then long
- **Bearish reversal**: "REVERSAL DOWN?" alert + TICK < -1000 (extreme)
  - Wait for TICK to pull back to -400 to -600, then short

**AVOID TRADING WHEN**:
- Scenario: NEUTRAL or "lean" (low conviction)
- Confidence < 50%
- TICK range tight (-200 to +200) = choppy conditions
- Internals conflicting (TICK bullish but ADD bearish)

**Intraday Timing**:
- **9:35-10:30 AM ET**: If scenario STRONG BULLISH/BEARISH in first 30 min → trend day likely
- **10:30 AM-2:00 PM ET**: If NEUTRAL → range-bound, reduce size
- **2:00-4:00 PM ET**: Watch for divergences - if internals weaken but price still rising → expect reversal

---

### For Swing Trading (Multi-Day Holds)

**Setup**:
1. Use **daily or 4-hour chart** with Market Internals Dashboard
2. Focus on **NH/NL ratio, VIX, and DIVERGENCE alerts**
3. Less focus on TICK (too noisy for swing trades)

**Swing LONG Setup**:
- **Entry conditions**:
  - Scenario: BULLISH for 2+ days
  - NH/NL > 3 (broad participation)
  - VIX < 20 or falling
  - No bearish divergence alerts
  - ADD positive multiple days
- **Best entry**: After pullback to support with internals still BULLISH
- **Stop loss**: Below key support or if scenario turns BEARISH 2 days straight

**Swing SHORT Setup**:
- **Entry conditions**:
  - Scenario: BEARISH for 2+ days
  - NH/NL < 1 (weak breadth)
  - VIX > 25 or rising
  - No bullish divergence alerts
  - ADD negative multiple days
- **Best entry**: After bounce to resistance with internals still BEARISH
- **Stop loss**: Above key resistance or if scenario turns BULLISH 2 days straight

**Divergence-Based Swing Trades** (High probability):

**Bullish Divergence Setup**:
- **BULLISH DIVERGENCE!** alert fires
- SPY making lower lows BUT internals improving (scenario turning BULLISH)
- NH/NL starting to rise above 1.0
- VIX spiking but starting to decline
- **Action**: Wait for price to break above recent resistance, then long
- **Target**: Previous swing high
- **Edge**: You're buying when institutions are accumulating but retail is panicking

**Bearish Divergence Setup**:
- **BEARISH DIVERGENCE!** alert fires
- SPY making higher highs BUT internals weakening (scenario turning BEARISH)
- NH/NL falling below 2.0
- VIX starting to rise
- **Action**: Wait for price to break below recent support, then short
- **Target**: Previous swing low
- **Edge**: You're selling when institutions are distributing but retail is euphoric

**VIX-Based Swing Trades**:
- **VIX > 35 + "VIX FEAR SPIKE!" alert**: Market panic, look for swing longs on oversold bounces
- **VIX < 15 + "VIX COMPLACENT!" alert**: Market complacency, be ready to take profits or hedge longs

**NH/NL Confirmation for Swing Trades**:
- **Strong uptrend**: NH/NL should be > 5. If it drops below 2 while price at highs → EXIT longs
- **Reversal confirmation**: After downtrend, NH/NL crossing above 2 = breadth improving, safe to swing long
- **Bear market signal**: NH/NL < 0.5 for multiple weeks = avoid longs entirely

---

### Key Rules (Both Intraday & Swing)

✅ **ALWAYS trade with the scenario**
- BULLISH/STRONG BULLISH = bias long
- BEARISH/STRONG BEARISH = bias short  
- NEUTRAL = reduce size or sit out

✅ **Use confidence as a sizing guide**
- Confidence > 85% = max size (for your risk tolerance)
- Confidence 70-85% = normal size
- Confidence 50-70% = half size
- Confidence < 50% = no trade or paper trade only

✅ **Respect extreme readings**
- TICK > +1000 or < -1000 = don't chase, wait for pullback
- ADD > +1500 or < -1500 = market exhausting, expect mean reversion
- TRIN > 2.5 = panic selling, but wait for stabilization before buying
- VIX spike > 10 points in one session = wait for 1-2 day consolidation

✅ **Watch for divergences**
- Price up + internals down = bearish divergence, prepare to exit longs
- Price down + internals up = bullish divergence, prepare to enter longs

✅ **Combine with price action**
- Internals tell you WHAT the market wants to do
- Price action tells you WHEN to enter
- Never trade internals alone - use with support/resistance, patterns, etc.

⚠️ **Don't overtrade**
- If scenario flips multiple times in one day = choppy market, reduce trades
- If TICK range tight all day = low conviction, step aside
- If confidence keeps dropping below 50% = market uncertain, wait for clarity

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

### ThinkOrSwim (ThinkScript)
1. Open ThinkOrSwim
2. Go to **Studies** → **Edit Studies**
3. Click **Create** → **thinkScript Editor**
4. Paste the entire `MARKET_INTERNAL.tosts` code
5. Name it "Market Internals Dashboard"
6. Click **OK** and apply to your chart

### TradingView (Pine Script)
1. Open TradingView and go to your chart
2. Click **Pine Editor** at the bottom
3. Delete any existing code and paste the entire `MARKET_INTERNAL.pine` code
4. Click **Add to Chart**
5. Configure settings via the gear icon:
   - **Show Labels**: Toggle label visibility
   - **Show Compact Row**: Single-row overview mode
   - **Show Ultra Row**: Minimal compact display
   - **Show Debug Row**: Component score breakdown
   - **Dashboard Position**: Top Right, Top Center, Bottom Left, or Bottom Right
   - **Symbol inputs**: Customize data feeds (default: USI:TICK, USI:ADD, etc.)

**Note**: TradingView uses different symbol prefixes. Default symbols:
- VIX: `CBOE:VIX`
- TICK: `USI:TICK`
- ADD: `USI:ADD`
- TRIN: `USI:TRIN`
- UVOL/DVOL: `USI:UVOL`, `USI:DVOL`
- VOLD: `USI:VOLD`
- NH/NL: Optional (leave blank if unavailable)

---

## Best Practices

1. **Use on 1-5 minute charts** for intraday trading
2. **Combine with price action** - don't trade internals alone
3. **Watch for divergences** at key support/resistance levels
4. **Adjust thresholds** based on your trading style
## Changelog

### v3.2 (January 6, 2026)
- **Added TradingView Pine Script v6 version** (`MARKET_INTERNAL.pine`)
  - Full table-based dashboard with 12 columns
  - Configurable position (Top Right, Top Center, Bottom Left, Bottom Right)
  - Multiple display modes: Full, Compact, Ultra, and Debug rows
- **Improved text contrast for readability**:
  - Added `f_scoreTextColorContrast()` helper function
  - Black text on bright green backgrounds (scores ≥ 0.5)
  - White text on red/orange/gray backgrounds (scores ≤ 0.5)
  - Automatic contrast selection based on background brightness
- **Dashboard columns**: SECTION, VALUE, EXTRA, VOL, BREADTH, TICK, TRIN, VIX, NHNL, NHNL Sc, Bias, CumTick
- **Net Bias indicator**: Combined ADD + TICK/5 + VOLD metric

### v3.1 (December 5, 2025)
- **Updated thresholds for intraday scalping**:
  - TICK: ±600 (was ±500) for main signals
  - ADD: ±750 (was ±500) for main signals
  - ADD extreme: ±2000 (was ±1500)
- **Enhanced granular scoring**:
  - TICK: Added 0.25 scoring for ±200-400 range
  - ADD: Added 0.25 scoring for 100-300 range
  - UVOL%: Added 0.25 scoring for 48-52% range
  - TRIN: Added 0.25 scoring for 0.9-0.95 and 1.05-1.1 ranges
- **Removed VIX from composite score** (still displayed in METRICS)
- **Increased score precision** to 2 decimal places
- **Total score range**: Now -6 to +6 (was -7 to +7)
- **Default useDynamicThresholds**: Changed to `no` for consistent scalping signals

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
