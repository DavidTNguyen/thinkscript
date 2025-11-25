# VWAP Cascade - Multi-Timeframe Moving Average Strategy

A ThinkScript indicator that creates a layered moving average cascade with cloud visualization, crossover signals, and momentum tracking.

## Overview

The VWAP Cascade uses 5 Simple Moving Averages (10, 20, 30, 50, 100 periods) to create a visual "cascade" effect with colored clouds between each layer. It identifies trend direction, momentum shifts, and generates entry signals based on MA crossovers.

## Visual Components

### Moving Average Lines
- **10 MA (Cyan)** - Fastest, most responsive to price action
- **20 MA (Yellow)** - Short-term trend
- **30 MA (Magenta)** - Medium-term trend  
- **50 MA (Orange)** - Intermediate trend
- **100 MA (Gray)** - Long-term trend baseline

### Cloud Layers
The indicator creates 4 cloud layers between consecutive moving averages:
- **Layer 1**: Between 10 MA and 20 MA (brightest colors)
- **Layer 2**: Between 20 MA and 30 MA
- **Layer 3**: Between 30 MA and 50 MA
- **Layer 4**: Between 50 MA and 100 MA (most transparent)

Cloud colors indicate the relationship between MAs:
- **Green/Teal shades**: Bullish alignment (faster MA above slower MA)
- **Red/Maroon shades**: Bearish alignment (faster MA below slower MA)

### Entry Signals

**Long Entry (Green Up Arrow)**
- 10 MA crosses above 50 MA
- Price is above 20 MA (confirmation)
- Alert: "🐂 ENTRY SIGNAL - 10 MA crossed above 50 MA!"

**Short Entry (Red Down Arrow)**
- 10 MA crosses below 50 MA
- Price is below 20 MA (confirmation)
- Alert: "🐻 ENTRY SIGNAL - 10 MA crossed below 50 MA!"

## Label Indicators

### Trend Status
- **UNIFORM BULLISH TREND** (Green) - All 5 MAs trending upward
- **UNIFORM BEARISH TREND** (Red) - All 5 MAs trending downward
- **MOMENTUM SHIFT** (Yellow) - Fast and slow MAs diverging in direction
- **CONSOLIDATION** (Orange) - Mixed MA directions indicating sideways movement

### Price Position
- **Above All VWAPs** (Cyan) - Price above all 5 moving averages (strong bullish)
- **Below All VWAPs** (Magenta) - Price below all 5 moving averages (strong bearish)
- **Within Cloud** (Yellow) - Price inside the MA cascade (transitional)

### Individual MA Momentum
Each MA shows its current direction:
- **10MA: UP/DN** - Color-coded from bright green/red
- **20MA: UP/DN** - Color-coded gradient
- **30MA: UP/DN** - Color-coded gradient
- **50MA: UP/DN** - Color-coded gradient
- **100MA: UP/DN** - Color-coded to darker green/red

## Settings (Inputs)

### Display Controls
- `showVWAP1` through `showVWAP5` - Toggle individual MA lines
- `showClouds` - Show/hide cloud layers
- `showLabels` - Show/hide status labels
- `showSignals` - Show/hide entry arrows and alerts

### Momentum Settings
- `momentumLength` (Default: 3) - Number of bars to calculate MA slope
- `lineWeight` (Default: 1) - Thickness of MA lines

### Anchor Scale
- Legacy setting (currently unused, uses fixed periods)
- Options: Day, Week, Month, Quarter

## Trading Strategy

### Entry Setup
1. Wait for 10 MA to cross 50 MA in desired direction
2. Confirm price is on correct side of 20 MA
3. Entry signal arrow appears with audio alert
4. Check cloud colors for trend alignment

### Trend Confirmation
- **Strong Trends**: Look for "UNIFORM BULLISH/BEARISH TREND" label
- **Momentum Shifts**: "MOMENTUM SHIFT" warns of potential reversal
- **Consolidation**: "CONSOLIDATION" suggests waiting for clearer direction

### Risk Management
- **Above All VWAPs** + Long signal = High probability long
- **Below All VWAPs** + Short signal = High probability short
- **Within Cloud** = Higher risk, consider waiting for breakout

### Exit Strategy
- Consider exits when price crosses back through 20 MA
- Watch for "MOMENTUM SHIFT" label as early warning
- Opposite entry signal suggests trend reversal

## Best Practices

1. **Use on Higher Timeframes** - Works best on 15min, 1H, 4H, Daily charts
2. **Combine with Support/Resistance** - Use with key levels for better entries
3. **Wait for Confirmation** - Don't chase; let the cloud structure form
4. **Monitor All Labels** - Comprehensive view of market structure
5. **Respect the Cascade** - When MAs are properly stacked, trend is strong

## Chart Bubbles

The last bar shows labeled bubbles for easy identification:
- **Fast (10)** - 10-period MA
- **20, 30, 50** - Intermediate MAs
- **Slow (100)** - Long-term baseline

Bubble colors reflect current momentum direction (green = up, red = down).

## Alert Configuration

Alerts trigger on entry signals:
- Sound: Ring
- Type: Bar (triggers once per bar)
- Includes emoji and crossover details

## Tips

- **Cloud Thickness**: Wider clouds indicate stronger momentum divergence
- **Cloud Compression**: When clouds compress, expect a volatility expansion
- **All MAs UP/DN**: Most reliable signals occur in uniform trends
- **Cascade Spacing**: Even spacing suggests healthy trend; irregular spacing warns of instability

---

**Note**: This indicator uses Simple Moving Averages (SMA), not actual VWAP anchors. The "VWAP" naming is legacy from earlier development.
