# ES Levels: Triangle Pattern Trade Map

A ThinkScript indicator for E-mini S&P 500 futures that identifies key support and resistance levels within a triangle consolidation pattern, providing clear breakout and breakdown signals for intraday and swing trading.

## Overview

This indicator is designed to track a triangle pattern consolidation in ES futures with key support at **6540** and resistance at **6746.80**. The script provides comprehensive alerts and visual markers for triangle breakout trading strategies.

## Triangle Pattern Analysis

### Current Market Structure
- **Pattern**: Triangle consolidation 
- **Upper Boundary**: 6746.80 (Key Resistance)
- **Lower Boundary**: 6540 (Key Support)
- **Range**: ~207 points
- **Expected Resolution**: Breakout above 6746.80 or breakdown below 6540

### Key Levels

| Level | Type | Price | Significance |
|-------|------|-------|--------------|
| BT | Bull Target | 6780 | Extended upside target |
| R | Key Resistance | 6746.80 | Triangle upper boundary |
| R2 | Secondary Resistance | 6720 | Interim resistance |
| M | Mid-Range | 6680 | Bias indicator |
| P | Pivot | 6640 | Triangle midpoint |
| S2 | Secondary Support | 6600 | Interim support |
| S | Key Support | 6540 | Triangle lower boundary |
| BD | Bear Target | 6500 | Extended downside target |

## Trading Strategy

### Bullish Scenario (Above 6746.80)
- **Entry**: Breakout above 6746.80 with volume
- **Target**: 6780 (Bull Target)
- **Strategy**: Bull Call Spread
- **Risk Management**: Stop below 6720

### Bearish Scenario (Below 6540)
- **Entry**: Breakdown below 6540 with volume
- **Target**: 6500 (Bear Target)
- **Strategy**: Bear Put Spread
- **Risk Management**: Stop above 6600

### Range Trading (6540 - 6746.80)
- **Long Setups**: Bounces from 6540-6600 area
- **Short Setups**: Rejections from 6720-6746.80 area
- **Pivot**: 6640 acts as bias indicator
- **Mid-Range**: 6680 confirms directional bias

## Alert System

### Primary Signals
- **Triangle Breakout**: Close above 6746.80
- **Triangle Breakdown**: Close below 6540
- **Bull Target**: Reach 6780
- **Bear Target**: Reach 6500

### Secondary Signals
- **Resistance Tests**: Price approaching 6746.80 or 6720
- **Support Tests**: Price approaching 6540 or 6600
- **Range Position**: Above/below midpoint levels
- **Compression Alerts**: Triangle range narrowing

### Bounce/Rejection Signals
- **Support Bounce**: Rejection from 6540 support
- **Resistance Rejection**: Failure at 6746.80 resistance

## Configuration

### Input Parameters

| Parameter | Default | Description | Recommended Range |
|-----------|---------|-------------|-------------------|
| `level1` | 6780 | Bull Target | 6750-6800 |
| `level2` | 6746.80 | Key Resistance | Fixed (triangle boundary) |
| `level7` | 6540 | Key Support | Fixed (triangle boundary) |
| `level8` | 6500 | Bear Target | 6480-6520 |
| `enableAlerts` | Yes | Alert system toggle | Yes/No |
| `alertSensitivity` | 2 | Points within level for alerts | 1-5 |

### Visual Elements

#### Line Colors
- **Dark Green**: Bull targets and strong bullish levels
- **Red**: Key resistance and bearish signals
- **Pink**: Secondary resistance
- **Gray/Light Gray**: Range and pivot levels
- **Cyan**: Secondary support
- **Green**: Key support levels
- **Dark Red**: Bear targets

#### Bubble Labels
- **BT**: Bull Target (6780)
- **R**: Key Resistance (6746.80)
- **R2**: Secondary Resistance (6720)
- **M**: Mid-Range (6680)
- **P**: Pivot (6640)
- **S2**: Secondary Support (6600)
- **S**: Key Support (6540)
- **BD**: Bear Breakdown (6500)

## Installation

1. Copy the code from `ES_Levels.tosts`
2. In ThinkOrSwim, go to Charts > Studies > Edit Studies > Create
3. Paste the code and save as "ES Triangle Levels"
4. Apply to your ES futures chart

## Usage Tips

### For Day Trading
1. **Monitor triangle compression** - narrowing range indicates imminent breakout
2. **Watch volume on tests** - high volume increases breakout probability
3. **Use triangle position %** - shows where price sits within the pattern
4. **Scalp bounces/rejections** at key levels within range

### For Swing Trading
1. **Wait for clean breakouts** above 6746.80 or below 6540
2. **Target full measured moves** to 6780 (bull) or 6500 (bear)
3. **Use secondary levels** for partial profit taking
4. **Respect the pattern** until clear resolution

### Risk Management
- **Position sizing**: Adjust based on triangle range (~207 points)
- **Stop placement**: Beyond pattern boundaries with buffer
- **Profit targets**: Use fibonacci extensions or measured moves
- **Time decay**: Triangle patterns have limited lifespan

## Technical Notes

### Triangle Pattern Characteristics
- **Converging trendlines** create compression
- **Decreasing volume** during consolidation
- **Breakout volume** confirms direction
- **Measured move** typically equals triangle height

### Pattern Invalidation
- **Multiple false breakouts** suggest pattern failure
- **Extended time** without resolution (weeks/months)
- **Low volume breakouts** often fail

## Performance Monitoring

The script includes real-time monitoring features:
- **Triangle Range**: Current width in points
- **Triangle Position**: Price location as percentage
- **Compression Alerts**: Warning when range narrows
- **Bias Indicators**: Color-coded position within pattern

## Disclaimer

This indicator is for educational and analytical purposes only. Past performance does not guarantee future results. Always practice proper risk management and consider market conditions when trading.

---

**Created**: October 18, 2025  
**Version**: 1.0  
**Compatible**: ThinkOrSwim Platform  
**Instrument**: E-mini S&P 500 Futures (ES)