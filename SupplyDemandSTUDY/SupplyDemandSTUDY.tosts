#/ This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
#// © MBCryptocurrency
#indicator("Supply and Demand Zone Confirmation",  overlay=true, timeframe="", timeframe_gaps=false)
# Converted and mod by Sam4Cok@samer800 - 01/2023

#//CCI
input ShowLabel  = yes;
input cci1Timeframe = AggregationPeriod.HOUR;      # 'First CCI timeframe'
input cci2Timeframe = AggregationPeriod.TWO_HOURS; # 'second CCI timeframe'
input rsiTimeframe = AggregationPeriod.HOUR;
input MovAvgType = AverageType.SIMPLE;

def na = Double.NaN;

def hlc60  = hlc3(Period = cci1Timeframe);
def hlc120 = hlc3(Period = cci2Timeframe);

def ma = MovingAverage(MovAvgType, hlc3, 14);
def cci = (hlc3 - ma) / (0.015 * LinDev(hlc3, 20));

def ma60 = MovingAverage(MovAvgType, hlc60, 14);
def cci6 = (hlc60 - ma60) / (0.015 * LinDev(hlc60, 20));

def ma120 = MovingAverage(MovAvgType, hlc120, 14);
def cci120 = (hlc120 - ma120) / (0.015 * LinDev(hlc120, 20));

def CCI15 = cci6;
def CCI60 = cci120;

#///RSI

def change = close - close[1];
def change60 = close(Period=RSItimeframe) - close(Period=RSItimeframe)[1];

def up   = WildersAverage(max(change, 0), 14);
def down = WildersAverage(-min(change, 0), 14);
def rsi = if down == 0 then 100 else
          if up == 0 then 0 else 100 - (100 / (1 + up / down));
def rsiMA = MovingAverage(MovAvgType, rsi, 14);

def up60   = WildersAverage(max(change60, 0), 14);
def down60 = WildersAverage(-min(change60, 0), 14);
def rsi60  = if down60 == 0 then 100 else
             if up60 == 0 then 0 else 100 - (100 / (1 + up60 / down60));
def rsi15 = rsi60;

#//condition
def cross  = crosses(cci,-100);
def cross2 = crosses(cci,100);

def signal_buy;# = false
def signal_sell;# = false

if  CCI15 < -100 and CCI60 < -150 and rsiMA < 35 and rsi15 < 50 {
    signal_buy = yes;
    signal_sell = no;
    } else
if  CCI15 > 100 and CCI60 > 150 and rsiMA > 65 and rsi15 > 50 {
    signal_buy = no;
    signal_sell = yes;
    } else {
    signal_buy = no;
    signal_sell = no;
}
#//only first signal to show
def Buy;# = false
def Sell;# = false

Buy  = if signal_buy then yes else
       if signal_sell then no else if cross then no else if cross2 then no else Buy[1];
Sell = if signal_sell then yes else
       if signal_buy then no else if cross then no else if cross2 then no else Sell[1];

def Final_buy  = signal_buy and !Buy[1];
def Final_sell = signal_sell and !Sell[1];

#--- Lines
def buyLineL = if Final_buy then low[1] else buyLineL[1];
def buyLineH = if Final_buy then high[1] else buyLineH[1];
def SellLineH = if Final_sell then high[1] else SellLineH[1];
def SellLineL = if Final_sell then low[1] else SellLineL[1];

plot SupLineL  = if buyLineL==buyLineL[1] then buyLineL else na;
plot SupLineH  = if buyLineH==buyLineH[1] then buyLineH else na;
plot ResLineH  = if SellLineH==SellLineH[1] then SellLineH else na;
plot ResLineL  = if SellLineL==SellLineL[1] then SellLineL else na;

SupLineL.setHiding(yes);
SupLineH.SetHiding(yes);
ResLineH.SetHiding(yes);
ResLineL.SetHiding(yes);

AddCloud(SupLineH, SupLineL, Color.DARK_GREEN, Color.DARK_GREEN, yes);
AddCloud(ResLineH, ResLineL, Color.DARK_RED, Color.DARK_RED, yes);
#//plotshapes

AddChartBubble(ShowLabel and Final_sell, high, "Sell Zone", Color.RED, yes);
AddChartBubble(ShowLabel and Final_buy, low, "Buy Zone", Color.GREEN, no);



#--- END CODE
