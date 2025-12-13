"""
TSLA Options Activity Visualization by Expiration
Data from Unusual Whales - Fri Dec 12, 2025
"""

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Data from the image
data = {
    'Expiry': ['12/12/2025', '12/19/2025', '12/26/2025', '1/2/2026', '1/9/2026', 
               '1/16/2026', '1/23/2026', '1/30/2026', '2/20/2026', '3/20/2026',
               '4/17/2026', '5/15/2026', '6/18/2026', '7/17/2026', '8/21/2026',
               '9/18/2026', '12/18/2026', '1/15/2027', '6/17/2027', '12/17/2027',
               '1/21/2028', '6/16/2028'],
    'Call_Vol': [1660000, 801000, 119000, 42055, 19111, 172000, 7448, 2490, 23824, 26179,
                 9281, 7368, 11806, 1342, 1142, 2088, 3656, 8570, 1117, 2406, 2697, 1380],
    'Put_Vol': [1010000, 422000, 71457, 38797, 13344, 30181, 3362, 5048, 14839, 14175,
                3613, 1893, 4407, 786, 1355, 1164, 1915, 2132, 734, 3025, 3605, 839],
    'Call_Prem_M': [372, 721, 128, 53.48, 31.76, 276, 13.47, 6.49, 59.94, 77.79,
                    34.73, 43.37, 51.53, 8.28, 8.3, 15.08, 26.47, 47.57, 11.33, 27.68, 29.25, 21.06],
    'Put_Prem_M': [183, 264, 51.35, 17.57, 10.29, 32.22, 4.44, 4.49, 28.64, 24.16,
                   12.77, 7.4, 13.17, 3.08, 6.92, 5.04, 10.26, 11.81, 3.75, 26.79, 25, 7.99],
    'Bull_Prem_M': [261, 445, 91.15, 35.27, 20.3, 138, 8.85, 5.62, 46.63, 48.31,
                    22.38, 20.28, 32.36, 5.11, 8.67, 9.95, 15.26, 27.28, 8.9, 17.5, 25.63, 14.34],
    'Bear_Prem_M': [254, 457, 74.08, 30.34, 18.55, 149, 6.72, 4.77, 35.68, 46.25,
                    21.15, 24.73, 28.07, 5.75, 3.26, 9.59, 16.93, 28.81, 5.32, 35.05, 24.06, 13.52],
    'Bull_Pct': [47, 46, 51, 50, 48, 48, 49, 51, 53, 47, 47, 49, 50, 51, 57, 49, 46, 49, 59, 64, 47, 49]
}

df = pd.DataFrame(data)
df['Expiry'] = pd.to_datetime(df['Expiry'])
df['Expiry_Label'] = df['Expiry'].dt.strftime('%m/%d/%y')
df['Total_Vol'] = df['Call_Vol'] + df['Put_Vol']
df['Total_Prem'] = df['Call_Prem_M'] + df['Put_Prem_M']
df['Net_Prem'] = df['Bull_Prem_M'] - df['Bear_Prem_M']
df['Bear_Pct'] = 100 - df['Bull_Pct']

# Calculate sentiment metrics
total_bull = df['Bull_Prem_M'].sum()
total_bear = df['Bear_Prem_M'].sum()
net_flow = total_bull - total_bear
overall_sentiment = "BULLISH" if net_flow > 20 else "BEARISH" if net_flow < -20 else "NEUTRAL"
put_call_ratio = df['Put_Vol'].sum() / df['Call_Vol'].sum()

# Near-term (next 30 days) vs longer-term sentiment
near_term = df[df['Expiry'] <= '2026-01-16']
long_term = df[df['Expiry'] > '2026-01-16']
near_net = near_term['Bull_Prem_M'].sum() - near_term['Bear_Prem_M'].sum()
long_net = long_term['Bull_Prem_M'].sum() - long_term['Bear_Prem_M'].sum()

# Set style
plt.style.use('dark_background')
fig = plt.figure(figsize=(18, 16))

# Color scheme
bull_color = '#00C853'  # Green
bear_color = '#FF5252'  # Red
call_color = '#4FC3F7'  # Light blue
put_color = '#FF8A80'   # Light red

# 1. Volume by Expiration (Stacked Bar)
ax1 = fig.add_subplot(2, 2, 1)
x = np.arange(len(df))
width = 0.7

# Scale volumes for display
call_vol_k = df['Call_Vol'] / 1000
put_vol_k = df['Put_Vol'] / 1000

bars1 = ax1.bar(x, call_vol_k, width, label='Call Volume', color=call_color, alpha=0.8)
bars2 = ax1.bar(x, put_vol_k, width, bottom=call_vol_k, label='Put Volume', color=put_color, alpha=0.8)

ax1.set_ylabel('Volume (Thousands)', fontsize=11, fontweight='bold')
ax1.set_title('TSLA Options Volume by Expiration', fontsize=14, fontweight='bold', pad=15)
ax1.set_xticks(x)
ax1.set_xticklabels(df['Expiry_Label'], rotation=45, ha='right', fontsize=8)
ax1.legend(loc='upper right')
ax1.grid(axis='y', alpha=0.3)

# Add volume sentiment annotation
vol_sentiment = f"P/C RATIO: {put_call_ratio:.2f}\n"
vol_sentiment += ">>> CALL-HEAVY (BULLISH) <<<\n" if put_call_ratio < 0.7 else "BALANCED flow\n" if put_call_ratio < 1.0 else "PUT-HEAVY (BEARISH)\n"
vol_sentiment += f"Massive 12/12 & 12/19 volume\n2.6M+ contracts near-term"
ax1.text(0.98, 0.78, vol_sentiment, transform=ax1.transAxes, fontsize=11,
         verticalalignment='top', horizontalalignment='right', fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.5', facecolor='#0D47A1', edgecolor='#4FC3F7', 
                   linewidth=3, alpha=0.95),
         color='#FFFFFF')

# 2. Premium by Expiration (Stacked Bar)
ax2 = fig.add_subplot(2, 2, 2)

bars3 = ax2.bar(x, df['Call_Prem_M'], width, label='Call Premium', color=call_color, alpha=0.8)
bars4 = ax2.bar(x, df['Put_Prem_M'], width, bottom=df['Call_Prem_M'], label='Put Premium', color=put_color, alpha=0.8)

ax2.set_ylabel('Premium ($M)', fontsize=11, fontweight='bold')
ax2.set_title('TSLA Options Premium by Expiration [$]', fontsize=14, fontweight='bold', pad=15)
ax2.set_xticks(x)
ax2.set_xticklabels(df['Expiry_Label'], rotation=45, ha='right', fontsize=8)
ax2.legend(loc='upper right')
ax2.grid(axis='y', alpha=0.3)

# Add premium sentiment annotation
prem_sentiment = f"TOTAL: ${df['Total_Prem'].sum():.0f}M\n"
prem_sentiment += f"Call: ${df['Call_Prem_M'].sum():.0f}M | Put: ${df['Put_Prem_M'].sum():.0f}M\n"
prem_sentiment += ">>> CALLS 2.7x PUTS <<<\n"
prem_sentiment += "Key: 1/16/26 OPEX ($308M)"
ax2.text(0.98, 0.78, prem_sentiment, transform=ax2.transAxes, fontsize=11,
         verticalalignment='top', horizontalalignment='right', fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.5', facecolor='#4A148C', edgecolor='#FFD700', 
                   linewidth=3, alpha=0.95),
         color='#FFD700')

# 3. Bull vs Bear Premium (Grouped Bar)
ax3 = fig.add_subplot(2, 2, 3)
width2 = 0.35

bars5 = ax3.bar(x - width2/2, df['Bull_Prem_M'], width2, label='Bull Premium', color=bull_color, alpha=0.8)
bars6 = ax3.bar(x + width2/2, df['Bear_Prem_M'], width2, label='Bear Premium', color=bear_color, alpha=0.8)

ax3.set_ylabel('Premium ($M)', fontsize=11, fontweight='bold')
ax3.set_title('BULL vs BEAR Premium by Expiration', fontsize=14, fontweight='bold', pad=15)
ax3.set_xticks(x)
ax3.set_xticklabels(df['Expiry_Label'], rotation=45, ha='right', fontsize=8)
ax3.legend(loc='upper right')
ax3.grid(axis='y', alpha=0.3)
ax3.axhline(y=0, color='white', linestyle='-', linewidth=0.5)

# Add bull/bear sentiment annotation
bb_sentiment = f"BULL: ${total_bull:.0f}M vs BEAR: ${total_bear:.0f}M\n"
bb_sentiment += ">>> CONTESTED NEAR-TERM <<<\n"
bb_sentiment += "12/19: Bear dominance ($457M)\n"
bb_sentiment += "1/16: Slight bear edge"
ax3.text(0.98, 0.78, bb_sentiment, transform=ax3.transAxes, fontsize=11,
         verticalalignment='top', horizontalalignment='right', fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.5', facecolor='#1B5E20', edgecolor='#00E676', 
                   linewidth=3, alpha=0.95),
         color='#FFFFFF')

# 4. Net Directional Flow (Waterfall-style)
ax4 = fig.add_subplot(2, 2, 4)
colors = [bull_color if x >= 0 else bear_color for x in df['Net_Prem']]
bars7 = ax4.bar(x, df['Net_Prem'], width, color=colors, alpha=0.8)

ax4.set_ylabel('Net Premium ($M)', fontsize=11, fontweight='bold')
ax4.set_title('NET DIRECTIONAL FLOW (Bull - Bear)', fontsize=14, fontweight='bold', pad=15)
ax4.set_xticks(x)
ax4.set_xticklabels(df['Expiry_Label'], rotation=45, ha='right', fontsize=8)
ax4.grid(axis='y', alpha=0.3)
ax4.axhline(y=0, color='white', linestyle='-', linewidth=1)

# Add value labels on net flow
for i, (bar, val) in enumerate(zip(bars7, df['Net_Prem'])):
    if abs(val) > 5:
        ax4.text(bar.get_x() + bar.get_width()/2, bar.get_height() + (1 if val > 0 else -3),
                f'{val:.0f}', ha='center', va='bottom' if val > 0 else 'top', fontsize=7, fontweight='bold')

# Add net flow sentiment annotation - KEY INSIGHT
bullish_exp = len(df[df['Net_Prem'] > 0])
bearish_exp = len(df[df['Net_Prem'] < 0])
net_sentiment = f"NET: ${net_flow:.0f}M {'BULLISH' if net_flow > 0 else 'BEARISH'}\n"
net_sentiment += f"Bull: {bullish_exp} exp | Bear: {bearish_exp} exp\n"
net_sentiment += "─" * 22 + "\n"
net_sentiment += "KEY INSIGHT:\n"
net_sentiment += "  12/19: -$12M (hedging)\n"
net_sentiment += "  1/16 OPEX: -$11M\n"
net_sentiment += "  Feb-Mar: BULLISH\n"
net_sentiment += "  LEAPS: Mixed"
insight_bg = '#004D40' if net_flow > 0 else '#B71C1C'
insight_edge = '#00E676' if net_flow > 0 else '#FF5252'
ax4.text(0.98, 0.97, net_sentiment, transform=ax4.transAxes, fontsize=10,
         verticalalignment='top', horizontalalignment='right', fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.5', facecolor=insight_bg, 
                   edgecolor=insight_edge, linewidth=3, alpha=0.95),
         color='#FFFFFF', linespacing=1.3)

# Add overall sentiment box at bottom
fig.text(0.5, 0.02, 
         f"OVERALL: SLIGHTLY BEARISH NEAR-TERM  |  BULLISH Q1 2026  |  "
         f"Net: ${net_flow:.0f}M  |  P/C: {put_call_ratio:.2f}  |  "
         f"Watch 12/19 expiry",
         ha='center', fontsize=13, fontweight='bold',
         bbox=dict(boxstyle='round,pad=0.7', facecolor='#1A237E', edgecolor='#FFEB3B', linewidth=4),
         color='#FFEB3B')

plt.tight_layout(rect=[0, 0.05, 1, 1])
plt.savefig('c:/Dev/thinkscript/TSLA_options_activity_chart.png', dpi=150, bbox_inches='tight', 
            facecolor='#1a1a1a', edgecolor='none')
plt.show()

# Summary Stats
print("\n" + "="*60)
print("📊 TSLA OPTIONS ACTIVITY SUMMARY - Dec 12, 2025")
print("="*60)
print(f"\n🔹 Total Call Volume: {df['Call_Vol'].sum():,.0f}")
print(f"🔹 Total Put Volume:  {df['Put_Vol'].sum():,.0f}")
print(f"🔹 Put/Call Ratio:    {df['Put_Vol'].sum()/df['Call_Vol'].sum():.2f}")
print(f"\n💰 Total Call Premium: ${df['Call_Prem_M'].sum():.1f}M")
print(f"💰 Total Put Premium:  ${df['Put_Prem_M'].sum():.1f}M")
print(f"\n🐂 Total Bull Premium: ${df['Bull_Prem_M'].sum():.1f}M")
print(f"🐻 Total Bear Premium: ${df['Bear_Prem_M'].sum():.1f}M")
print(f"📈 Net Bullish Flow:   ${df['Bull_Prem_M'].sum() - df['Bear_Prem_M'].sum():.1f}M")

# Top 5 expirations by volume
print("\n📅 Top 5 Expirations by Volume:")
top5 = df.nlargest(5, 'Total_Vol')[['Expiry_Label', 'Call_Vol', 'Put_Vol', 'Total_Vol']]
for _, row in top5.iterrows():
    print(f"   {row['Expiry_Label']}: {row['Total_Vol']:,.0f} contracts")

# Top 5 expirations by premium
print("\n💎 Top 5 Expirations by Premium:")
top5_prem = df.nlargest(5, 'Total_Prem')[['Expiry_Label', 'Call_Prem_M', 'Put_Prem_M', 'Total_Prem']]
for _, row in top5_prem.iterrows():
    print(f"   {row['Expiry_Label']}: ${row['Total_Prem']:.1f}M")
