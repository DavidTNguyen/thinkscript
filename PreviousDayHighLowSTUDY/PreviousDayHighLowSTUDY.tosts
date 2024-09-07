declare hide_on_daily;

input length = 1;
input showOnlyLastPeriod = yes;
input ShowBubbles = yes;

def na = Double.NaN;
def aggregationPeriod = AggregationPeriod.DAY;
def displace = -1;

#----- Previous Day High/Low -----#

plot PD_High;
plot PD_Low;
if showOnlyLastPeriod and !IsNaN(close(period = aggregationPeriod)[-1]) {
    PD_High = na;
    PD_Low = na;
} else {
    PD_High = Highest(high(period = aggregationPeriod)[-displace], length);
    PD_Low = Lowest(low(period = aggregationPeriod)[-displace], length);
}

PD_High.SetDefaultColor(Color.WHITE);
PD_High.SetStyle(Curve.SHORT_DASH);
PD_High.SetLineWeight(2);
PD_High.HideTitle();

PD_Low.SetDefaultColor(Color.WHITE);
PD_Low.SetStyle(Curve.SHORT_DASH);
PD_Low.SetLineWeight(2);
PD_Low.HideTitle();

# Assuming the rest of your script is unchanged


# Identify the last bar of the chart where data is available
def isLastBar = !IsNaN(close) and IsNaN(close[-1]);

# Place the bubble on the last bar, but ensure it doesn't overlap with price action by adjusting its position
AddChartBubble(ShowBubbles and isLastBar, PD_High, "PD High: " + PD_High, Color.WHITE, no);
AddChartBubble(ShowBubbles and isLastBar, PD_Low, "PD Low: " + PD_Low, Color.WHITE, no);
