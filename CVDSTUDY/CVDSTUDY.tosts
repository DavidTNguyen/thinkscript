#//@version=4
#// A Cumulative Volume Delta approach based on the Bull and Bear Balance Indicator by Vadim Gimelfarb published in the October 2003 issue of the S&C Magazine.
#// Adjust the length of the moving average according to your needs (Symbol, Timeframe, etc.)

#study(title="Cumulative Volume Delta", shorttitle="CVD", precision=0)

declare lower;
#// Inputs
input periodMa = 100;#input(title="MA Length", minval=1, defval=100)
input plotMa   = yes;#input(title="Plot MA?", defval=false)
#// Calculations (Bull & Bear Balance Indicator by Vadim Gimelfarb)

def bullPower = if(close < open, if(close[1] < open, max(high - close[1], close - low), max(high - open, close - low)), if(close > open, if(close[1] > open, high - low, max(open - close[1], high - low)), if(high - close > close - low, if(close[1] < open, max(high - close[1], close - low), high - open), if(high - close < close - low, if(close[1] > open, high - low, max(open - close[1], high - low)), if(close[1] > open, max(high - open, close - low), if(close[1] < open, max(open - close[1], high - low), high-low))))));

def bearPower = if(close < open, if(close[1] > open, max(close[1] - open, high - low), high - low), if(close > open, if(close[1] > open, max(close[1] - low, high - close), max(open - low, high - close)), if(high - close > close - low, if(close[1] > open, max(close[1] - open, high - low), high - low), if(high - close < close - low, if(close[1] > open, max(close[1] - low, high - close), open - low), if(close[1] > open, max(close[1] - open, high - low), if(close[1] < open, max(open - low, high - close), high - low))))));

#// Calculations (Bull & Bear Pressure Volume)

def bullVolume = (bullPower / (bullPower + bearPower)) * volume;
def bearVolume = (bearPower / (bullPower + bearPower)) * volume;

#// Calculations Delta
def delta = if isnan(close) then delta[1] else bullVolume - bearVolume;
def cvd   = if barnumber()==1 then delta else if barnumber()>1 then cvd[1] + delta else cvd[1];
def cvdMa = simpleMovingAvg(cvd, periodMa);

#// Plotting
#customColor = cvd > cvdMa ? color.new(color.teal, 50) : color.new(color.red, 50)
plot Ref1 = cvd;#plot(cvd, style=plot.style_line, linewidth=1, color=color.black, title="CVD")
plot Ref2 = if plotMa then cvdMa else double.nan;#, style=plot.style_line, linewidth=1, color=color.new(color.black, 0), title="CVD MA")
#fill(plotRef1, plotRef2, color=customColor)
addcloud(ref1,ref2,color.green,color.red);
