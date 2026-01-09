# LuxAlgo Signals & Overlays (ThinkScript Converted by @VietRoadie)

This is a customized ThinkScript port of the popular **LuxAlgo Signals & Overlays™** indicator originally designed for TradingView. 

> **Note:** This script is an **approximation** of the original LuxAlgo indicator. The original indicator uses proprietary, closed-source libraries. This port replicates the visual style and core functionality using standard technical analysis concepts (ATR, MACD, Moving Averages) to provide a similar experience on the ThinkOrSwim platform.

## Features

### 1. Signal Verification & Candle Coloring
*   **Confirmation Signals:** Generates "Buy" (Green Arrow) and "Sell" (Red Arrow) signals based on trend reversals.
*   **Candle Coloring:**
    *   **Confirmation Simple:** Candles are colored Green (Bullish) or Red (Bearish) based on MACD momentum.
    *   **Confirmation Gradient:** Provides a more nuanced color scheme (Cyan/Magenta) to show strengthening or weakening trends.

### 2. Indicator Overlays
You can enable or disable these overlays in the settings to filter signals or provide trend confirmation.

*   **Smart Trail:** A dynamic trailing stop-loss line (similar to a SuperTrend or ATR Trailing Stop).
    *   **Blue Line:** Bullish trend support.
    *   **Red Line:** Bearish trend resistance.
    *   **Usage:** Acts as a dynamic support/resistance level. A crossover often triggers a signal.
*   **Trend Catcher:** A shorter-term moving average designed to "catch" the immediate trend. Useful for identifying shorter swings or scalping opportunities.
*   **Neo Cloud:** An Ichimoku-style cloud that visualizes the longer-term trend direction and strength.
    *   **Green Cloud:** Long-term Bullish.
    *   **Pink Cloud:** Long-term Bearish.

### 3. Dashboard
A customizable dashboard is displayed on the chart to provide a quick snapshot of the market state.
*   **Trend:** Shows accurate "Bullish" or "Bearish" status based on the Smart Trail.
*   **Volatility:** Indicates if volatility (ATR) is "Rising" or "Falling".

## Settings & Configuration

You can adjust the following parameters in the "Edit Studies" window:

*   **Show Signals:** Toggle Buy/Sell arrows on/off.
*   **Signal Mode:** 
    *   `Confirmation + Exits` (Default): Standard trend-following signals.
    *   `Contrarian + Exits`: (Logic placeholder for counter-trend setups).
*   **Signal Sensitivity:** Controls how reactive the signals and Smart Trail are.
    *   Lower values (e.g., 3-5) = More frequent, short-term signals.
    *   Higher values (e.g., 10+) = Fewer, longer-term trend signals.
*   **Candle Color Type:** Choose your preferred visual style for price bars.
*   **Overlays (Yes/No):** Individually toggle `ShowSmartTrail`, `ShowTrendCatcher`, `ShowNeoCloud`, etc.

## How to use

1.  **Identify Trend:** look at the **Smart Trail** color. Blue is uptrend, Red is downtrend.
2.  **Wait for Signal:** Look for a **Buy (Green)** or **Sell (Red)** arrow that aligns with the Smart Trail.
3.  **Confirm with Overlays:**
    *   Is price above the **Neo Cloud**? (Confirming long-term bullishness)
    *   Is the **Trend Catcher** aligned with the signal?
4.  **Manage Risk:** Use the Smart Trail line as a dynamic stop-loss level. If price closes beyond this line, the trend may be reversing.

## Disclaimer
This script is for informational and educational purposes only and does not constitute financial advice. Past performance is not indicative of future results. This is a community-created port and is not officially affiliated with LuxAlgo.
