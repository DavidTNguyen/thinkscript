# Title: Expected Move Indicator with ATR and Fibonacci
# Author: VietRoadie
# Version: 1.4

declare upper;
input ATR_length = 14; #ATR lookback period
input IV_length = 5; #IV lookback period
input daysToExpiry = 7; #Days to expiry for options
input ATR_weight = 0.5; #Weight given to ATR vs IV (0-1)
input ATR_multiplier = 2.0; #Multiplier for ATR bands
input showFibExtensions = yes; #Show Fibonacci extensions
input showFibRetracements = yes; #Show Fibonacci retracements
input strikeSpacing = 5.0; #Strike price spacing for options
input daysToExpiration = 7; #Days to expiration for options

# Fibonacci levels
def fib_0 = 0.0;
def fib_236 = 0.236;
def fib_382 = 0.382;
def fib_500 = 0.500;
def fib_618 = 0.618;
def fib_786 = 0.786;
def fib_100 = 1.0;
def fib_1618 = 1.618;
def fib_2618 = 2.618;

# Calculate ATR
def avgTR = WildersAverage(TrueRange(), ATR_length);
def ATR_component = avgTR * ATR_multiplier;

# Calculate nearest strike price
def currentPrice = close;
def nearestStrike = Round(currentPrice / strikeSpacing, 0) * strikeSpacing;

# Get implied volatility from ATM options
def IV = ImpVolatility();
def IV_MA = ExpAverage(IV, IV_length);
def IV_adjusted = IV_MA * Sqrt(daysToExpiration / 365);
def IV_component = close * IV_adjusted;

# Combine ATR and IV for expected move
def expectedMove = (ATR_weight * ATR_component) + ((1 - ATR_weight) * IV_component);

# Base plots for expected move
plot UpperBand = close + expectedMove;
plot LowerBand = close - expectedMove;
plot MidLine = close;

# ATR Bands
plot ATR_Upper = close + ATR_component;
plot ATR_Lower = close - ATR_component;

# Fibonacci Retracement levels based on expected move
plot Fib_236_Up = if showFibRetracements then close + (expectedMove * fib_236) else Double.NaN;
plot Fib_382_Up = if showFibRetracements then close + (expectedMove * fib_382) else Double.NaN;
plot Fib_500_Up = if showFibRetracements then close + (expectedMove * fib_500) else Double.NaN;
plot Fib_618_Up = if showFibRetracements then close + (expectedMove * fib_618) else Double.NaN;
plot Fib_786_Up = if showFibRetracements then close + (expectedMove * fib_786) else Double.NaN;

plot Fib_236_Down = if showFibRetracements then close - (expectedMove * fib_236) else Double.NaN;
plot Fib_382_Down = if showFibRetracements then close - (expectedMove * fib_382) else Double.NaN;
plot Fib_500_Down = if showFibRetracements then close - (expectedMove * fib_500) else Double.NaN;
plot Fib_618_Down = if showFibRetracements then close - (expectedMove * fib_618) else Double.NaN;
plot Fib_786_Down = if showFibRetracements then close - (expectedMove * fib_786) else Double.NaN;

# Fibonacci Extension levels
plot Fib_1618_Up = if showFibExtensions then close + (expectedMove * fib_1618) else Double.NaN;
plot Fib_2618_Up = if showFibExtensions then close + (expectedMove * fib_2618) else Double.NaN;
plot Fib_1618_Down = if showFibExtensions then close - (expectedMove * fib_1618) else Double.NaN;
plot Fib_2618_Down = if showFibExtensions then close - (expectedMove * fib_2618) else Double.NaN;

# Format main plots
UpperBand.SetStyle(Curve.SHORT_DASH);
UpperBand.SetLineWeight(2);
UpperBand.SetDefaultColor(CreateColor(0, 255, 0));

LowerBand.SetStyle(Curve.SHORT_DASH);
LowerBand.SetLineWeight(2);
LowerBand.SetDefaultColor(CreateColor(255, 0, 0));

# Format ATR plots
ATR_Upper.SetStyle(Curve.LONG_DASH);
ATR_Upper.SetLineWeight(1);
ATR_Upper.SetDefaultColor(CreateColor(128, 255, 128));

ATR_Lower.SetStyle(Curve.LONG_DASH);
ATR_Lower.SetLineWeight(1);
ATR_Lower.SetDefaultColor(CreateColor(255, 128, 128));

# Format Fibonacci levels
def fibColor = CreateColor(255, 165, 0); # Orange color for Fib levels

# Retracement levels formatting
Fib_236_Up.SetStyle(Curve.SHORT_DASH);
Fib_236_Up.SetDefaultColor(fibColor);
Fib_382_Up.SetStyle(Curve.SHORT_DASH);
Fib_382_Up.SetDefaultColor(fibColor);
Fib_500_Up.SetStyle(Curve.SHORT_DASH);
Fib_500_Up.SetDefaultColor(fibColor);
Fib_618_Up.SetStyle(Curve.SHORT_DASH);
Fib_618_Up.SetDefaultColor(fibColor);
Fib_786_Up.SetStyle(Curve.SHORT_DASH);
Fib_786_Up.SetDefaultColor(fibColor);

Fib_236_Down.SetStyle(Curve.SHORT_DASH);
Fib_236_Down.SetDefaultColor(fibColor);
Fib_382_Down.SetStyle(Curve.SHORT_DASH);
Fib_382_Down.SetDefaultColor(fibColor);
Fib_500_Down.SetStyle(Curve.SHORT_DASH);
Fib_500_Down.SetDefaultColor(fibColor);
Fib_618_Down.SetStyle(Curve.SHORT_DASH);
Fib_618_Down.SetDefaultColor(fibColor);
Fib_786_Down.SetStyle(Curve.SHORT_DASH);
Fib_786_Down.SetDefaultColor(fibColor);

# Extension levels formatting
Fib_1618_Up.SetStyle(Curve.LONG_DASH);
Fib_1618_Up.SetDefaultColor(CreateColor(255, 140, 0));
Fib_2618_Up.SetStyle(Curve.LONG_DASH);
Fib_2618_Up.SetDefaultColor(CreateColor(255, 140, 0));
Fib_1618_Down.SetStyle(Curve.LONG_DASH);
Fib_1618_Down.SetDefaultColor(CreateColor(255, 140, 0));
Fib_2618_Down.SetStyle(Curve.LONG_DASH);
Fib_2618_Down.SetDefaultColor(CreateColor(255, 140, 0));

# Labels
AddLabel(yes, "Expected Move: $" + AsPrice(expectedMove), Color.WHITE);
AddLabel(yes, "ATR Component: $" + AsPrice(ATR_component), Color.YELLOW);
AddLabel(yes, "IV Component: $" + AsPrice(IV_component), Color.CYAN);
AddLabel(yes, "Nearest Strike: $" + AsPrice(nearestStrike), Color.WHITE);
AddLabel(yes, "Current IV: " + AsPercent(IV), Color.CYAN);

# Volatility Analysis
def IV_percentile = PercentRank(IV, 252);
def ATR_percentile = PercentRank(avgTR, 252);
AddLabel(yes, "IV Percentile: " + AsPercent(IV_percentile), Color.CYAN);
AddLabel(yes, "ATR Percentile: " + AsPercent(ATR_percentile), Color.YELLOW);

# Fibonacci Level Hits
def hitFib236 = AbsValue(close - Fib_236_Up) < avgTR * 0.1 or AbsValue(close - Fib_236_Down) < avgTR * 0.1;
def hitFib382 = AbsValue(close - Fib_382_Up) < avgTR * 0.1 or AbsValue(close - Fib_382_Down) < avgTR * 0.1;
def hitFib618 = AbsValue(close - Fib_618_Up) < avgTR * 0.1 or AbsValue(close - Fib_618_Down) < avgTR * 0.1;

# Alert conditions
Alert(hitFib618, "Price at 61.8% Fibonacci Level", Alert.BAR, Sound.Ding);
Alert(close crosses above UpperBand, "Price crossed above expected move", Alert.BAR, Sound.Ding);
Alert(close crosses below LowerBand, "Price crossed below expected move", Alert.BAR, Sound.Ding);

# Accuracy tracking
def outsideBands = if close > UpperBand or close < LowerBand then 1 else 0;
def bandAccuracy = Average(outsideBands, 20);
AddLabel(yes, "20-Day Accuracy: " + AsPercent(1 - bandAccuracy), Color.WHITE);

# Fibonacci confluence with ATR
def fibATRConfluence = 
    hitFib618 and AbsValue(close - ATR_Upper) < avgTR * 0.1 or 
    hitFib618 and AbsValue(close - ATR_Lower) < avgTR * 0.1;
AddLabel(yes, if fibATRConfluence then "FIB-ATR CONFLUENCE" else "", Color.MAGENTA);

# Movement strength
def moveStrength = AbsValue(close - close[1]) / ATR_component;
AddLabel(yes, "Move Strength: " + AsPercent(moveStrength), Color.WHITE);