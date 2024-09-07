# Previous Day High/Low/Close + Premarket High/Low + High/Low/Open of Day + ATR Lines
# Created by Wiinii
# V1.6
# Some code based on code by Mobius (premarket) and TraderKevin (ATR lines
# https://usethinkscript.com/threads/previous-day-high-low-close-premarket-high-low-high-low-open-of-day-for-thinkorswim.13139/

declare hide_on_daily;

input length = 1;
input showOnlyLastPeriod = yes;
input ShowBubbles = yes;
input locate_bubbles_at = {default Expansion, Time};
input locate_bubbles_at_time = 800;
input BarsFromExpansion = 1;
input ShowPricesInBubbles = yes;

def bn = BarNumber();
def na = Double.NaN;
def h  = high;
def l  = low;
def o = open;
def c = close;
def v = volume;
def aggregationPeriod = AggregationPeriod.DAY;
def displace = -1;
def timeopen = SecondsFromTime(locate_bubbles_at_time) == 0;
def isExpansion = locate_bubbles_at == locate_bubbles_at.Expansion and IsNaN(close);
def firstExpansionBar = if !IsNaN(close[-1]) and isExpansion then 1 else if isExpansion then firstExpansionBar[1] + 1 else 0;
def BubbleLocation = if locate_bubbles_at == locate_bubbles_at.Time then timeopen else isExpansion and firstExpansionBar == BarsFromExpansion;

#----- Previous Day High/Low/Close -----#


plot PD_High;
plot PD_Low;
plot PD_Close;
if showOnlyLastPeriod and !IsNaN(close(period = aggregationPeriod)[-1]) {
    PD_High = na;
    PD_Low = na;
    PD_Close = na;
} else {
    PD_High = Highest(high(period = aggregationPeriod)[-displace], length);
    PD_Low = Lowest(low(period = aggregationPeriod)[-displace], length);
    PD_Close = close(period = aggregationPeriod)[-displace];
}

PD_High.SetDefaultColor(Color.DARK_ORANGE);
PD_High.SetStyle(Curve.LONG_DASH);
PD_High.SetLineWeight(2);
PD_High.HideTitle();

PD_Low.SetDefaultColor(Color.DARK_ORANGE);
PD_Low.SetStyle(Curve.LONG_DASH);
PD_Low.SetLineWeight(2);
PD_Low.HideTitle();

PD_Close.SetDefaultColor(Color.WHITE);
PD_Close.SetStyle(Curve.LONG_DASH);
PD_Close.SetLineWeight(2);
PD_Close.HideTitle();

DefineGlobalColor("PD_High", CreateColor(255, 204, 153));
AddChartBubble(ShowBubbles and BubbleLocation, PD_High, "PDH: " + (if ShowPricesInBubbles then AsText(PD_High) else ""), GlobalColor("PD_High"));

DefineGlobalColor("PD_Low", CreateColor(255, 204, 153));
AddChartBubble(ShowBubbles and BubbleLocation, PD_Low, "PDL: " + (if ShowPricesInBubbles then AsText(PD_Low) else ""), GlobalColor("PD_Low"), no);

DefineGlobalColor("PD_Close", Color.WHITE);
AddChartBubble(ShowBubbles and BubbleLocation, PD_Close, "PDC: " + (if ShowPricesInBubbles then AsText(PD_Close) else ""), GlobalColor("PD_Close"));

PD_High.HideBubble();
PD_Low.HideBubble();
PD_Close.HideBubble();


#----- Premarket High/Low -----# Thanks to Mobius

def GlobeX = GetTime() < RegularTradingStart(GetYYYYMMDD());

def vol = if GlobeX and !GlobeX[1]
then v
else if GlobeX
then vol[1] + v
else na;

def GlobeX_Volume = vol;

def ONhigh = if GlobeX and !GlobeX[1]
then h
else if GlobeX and
h > ONhigh[1]
then h
else ONhigh[1];

def ONhighBar = if GlobeX and h == ONhigh
then bn
else na;

def ONlow = if GlobeX and !GlobeX[1]
then l
else if GlobeX and
l < ONlow[1]
then l
else ONlow[1];

def ONlowBar = if GlobeX and l == ONlow
then bn
else na;

def OverNightHigh = if BarNumber() == HighestAll(ONhighBar)
then ONhigh
else OverNightHigh[1];

def OverNightLow = if BarNumber() == HighestAll(ONlowBar)
then ONlow
else OverNightLow[1];

plot PM_High;
plot PM_Low;
if showOnlyLastPeriod and !IsNaN(close(period = aggregationPeriod)[-1]) {
    PM_High = na;
    PM_Low = na;
} else {
    PM_High = if OverNightHigh > 0 then OverNightHigh else na;
    PM_Low = if OverNightLow > 0 then OverNightLow else na;
}

#PM_High.SetHiding(!PlotOverNightExtremes);
PM_High.SetLineWeight(2);
PM_High.SetDefaultColor(Color.CYAN);
PM_High.SetStyle(Curve.LONG_DASH);
PM_High.HideBubble();
PM_High.HideTitle();

#PM_Low.SetHiding(!PlotOverNightExtremes);
PM_Low.SetStyle(Curve.LONG_DASH);
PM_Low.SetDefaultColor(Color.CYAN);
PM_Low.HideBubble();
PM_Low.HideTitle();

DefineGlobalColor("PM_High", CreateColor(102, 255, 255));
AddChartBubble(ShowBubbles and if locate_bubbles_at == locate_bubbles_at.Time then bn == ONhighBar else isExpansion and firstExpansionBar == BarsFromExpansion, PM_High, "PMH: " + (if ShowPricesInBubbles then AsText(PM_High) else ""), GlobalColor("PM_High"));

DefineGlobalColor("PM_Low", CreateColor(102, 255, 255));
AddChartBubble(ShowBubbles and if locate_bubbles_at == locate_bubbles_at.Time then bn == ONlowBar else isExpansion and firstExpansionBar == BarsFromExpansion, PM_Low, "PML: " + (if ShowPricesInBubbles then AsText(PM_Low) else ""), GlobalColor("PM_Low"), no);  


#----- Today Open/High/Low -----#


plot High_of_Day;
plot Low_of_Day;
plot DayOpen;
if showOnlyLastPeriod and !IsNaN(close(period = aggregationPeriod)[-1]) {
    DayOpen = na;
    High_of_Day = na;
    Low_of_Day = na;
} else {
    DayOpen = open(period = aggregationPeriod)[0];
    High_of_Day = Highest(high(period = aggregationPeriod), length);
    Low_of_Day = Lowest(low(period = aggregationPeriod), length);
}

DayOpen.SetDefaultColor (Color.GRAY);
DayOpen.SetPaintingStrategy(PaintingStrategy.DASHES);
DayOpen.SetLineWeight(2);
DayOpen.HideTitle();

High_of_Day.SetDefaultColor(CreateColor(0, 128, 255));
High_of_Day.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
High_of_Day.SetLineWeight(2);
High_of_Day.HideTitle();

Low_of_Day.SetDefaultColor(CreateColor(0, 128, 255));
Low_of_Day.SetPaintingStrategy(PaintingStrategy.HORIZONTAL);
Low_of_Day.SetLineWeight(2);
Low_of_Day.HideTitle();

DefineGlobalColor("Open", Color.LIGHT_GRAY);
AddChartBubble(ShowBubbles and BubbleLocation, DayOpen, "Open: " + (if ShowPricesInBubbles then AsText(DayOpen) else ""), GlobalColor("Open"));

DefineGlobalColor("High_of_Day", CreateColor(102, 178, 255));
AddChartBubble(ShowBubbles and BubbleLocation, High_of_Day, "HOD: " + (if ShowPricesInBubbles then AsText(High_of_Day) else ""), GlobalColor("High_of_Day"));

DefineGlobalColor("Low_of_Day", CreateColor(102, 178, 255));
AddChartBubble(ShowBubbles and BubbleLocation, Low_of_Day, "LOD: " + (if ShowPricesInBubbles then AsText(Low_of_Day) else ""), GlobalColor("Low_of_Day"), no);

#----- ATR Lines -----# Thaanks to TraderKevin
input showAtrLines = Yes;
input atrLinesFrom = {default pdc, dayOpen};
input ATRlength = 14;
input averageType = AverageType.WILDERS;

def ATR = MovingAverage(averageType, TrueRange(high(period = ”DAY”)[1], close(period = ”DAY”)[1], low(period = ”DAY”)[1]), ATRlength);

plot hatr = if atrLinesFrom  == atrLinesFrom .dayOpen then DayOpen + ATR else PD_Close + ATR;
plot latr = if atrLinesFrom  == atrLinesFrom .dayOpen then DayOpen - ATR else PD_Close - ATR;

hatr.SetLineWeight(5);
hatr.SetDefaultColor(Color.RED);
hatr.SetStyle(Curve.LONG_DASH);
hatr.HideBubble();
hatr.HideTitle();
hatr.SetHiding(showAtrLines == no);

latr.SetLineWeight(5);
latr.SetStyle(Curve.LONG_DASH);
latr.SetDefaultColor(Color.GREEN);
latr.HideBubble();
latr.HideTitle();
latr.SetHiding(showAtrLines == no);

DefineGlobalColor("hatr", Color.PINK);
AddChartBubble(ShowBubbles and showAtrLines and BubbleLocation, hatr, "ATRH: " + (if ShowPricesInBubbles then AsText(hatr) else ""), GlobalColor("hatr"));

DefineGlobalColor("latr", Color.LIGHT_GREEN);
AddChartBubble(ShowBubbles and showAtrLines and BubbleLocation, latr, "ATRL: " + (if ShowPricesInBubbles then AsText(latr) else ""), GlobalColor("latr"), no);
