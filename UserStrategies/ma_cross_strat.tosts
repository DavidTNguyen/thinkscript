#
# Charles Schwab & Co. (c) 2017-2024
#

input fastLength = 50;
input slowLength = 200;
input fastavgType = AverageType.EXPONENTIAL;
input slowavgType = AverageType.SIMPLE; 

input stopLossPercent = 1.0; // Stop loss percentage (1%)


plot FastMA = MovingAverage(fastavgType, close, fastLength);
plot SlowMA = MovingAverage(slowavgType, close, slowLength);
FastMA.SetDefaultColor(GetColor(1));
SlowMA.SetDefaultColor(GetColor(2));

plot longEntry = price crosses(FastMA, SlowMA, CrossingType.ABOVE);
plot shortEntry = price crosses(SlowMA, FastMA, CrossingType.BELOW);

// Define stop loss level
def stopLossLevel = if longEntry then price * (1 - stopLossPercent / 100) else stopLossLevel[1];

AddOrder(OrderType.BUY_AUTO, FastMA crosses above SlowMA, tickColor = GetColor(1), arrowColor = GetColor(1), name = "GoldenCrossBreakoutsLE");
AddOrder(OrderType.SELL_TO_CLOSE, FastMA crosses below SlowMA, tickColor = GetColor(2), arrowColor = GetColor(2), name = "GoldenCrossBreakoutsLX");