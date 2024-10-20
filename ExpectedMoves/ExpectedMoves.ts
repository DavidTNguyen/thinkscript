# Title: Selected Ticker Expected Moves
# Author: VietRoadie
# Version: 1.4

declare upper;

# Input parameters
input length = 20; #length for historical volatility calculation
input stdDevMultiplier = 1.0; #multiplier for expected move calculation
input showBands = yes; #option to show expected move bands

# Calculate returns and volatility for current symbol
def currentClose = close;
def dailyReturn = Log(currentClose / currentClose[1]);
def stdDev = StDev(dailyReturn, length);

# Calculate expected moves
def dailyEM = currentClose * stdDev * stdDevMultiplier;
def weeklyEM = dailyEM * Sqrt(5);

# Calculate bands
def dailyUpperBand = currentClose + dailyEM;
def dailyLowerBand = currentClose - dailyEM;
def weeklyUpperBand = currentClose + weeklyEM;
def weeklyLowerBand = currentClose - weeklyEM;

# Plot expected move bands
plot DailyUpper = if showBands then dailyUpperBand else Double.NaN;
plot DailyLower = if showBands then dailyLowerBand else Double.NaN;
plot WeeklyUpper = if showBands then weeklyUpperBand else Double.NaN;
plot WeeklyLower = if showBands then weeklyLowerBand else Double.NaN;

# Set colors and styles for bands
DailyUpper.SetDefaultColor(CreateColor(0, 255, 0));
DailyLower.SetDefaultColor(CreateColor(0, 255, 0));
WeeklyUpper.SetDefaultColor(CreateColor(0, 200, 0));
WeeklyLower.SetDefaultColor(CreateColor(0, 200, 0));

DailyUpper.SetStyle(Curve.SHORT_DASH);
DailyLower.SetStyle(Curve.SHORT_DASH);
WeeklyUpper.SetStyle(Curve.LONG_DASH);
WeeklyLower.SetStyle(Curve.LONG_DASH);

# Add labels
AddLabel(yes, GetSymbol() + " Daily EM: $" + AsPrice(dailyEM), CreateColor(0, 255, 0));
AddLabel(yes, GetSymbol() + " Weekly EM: $" + AsPrice(weeklyEM), CreateColor(0, 200, 0));

# Add info labels
AddLabel(yes, "HV" + length + ": " + AsPercent(stdDev), Color.GRAY);
AddLabel(yes, "Ann.Vol: " + AsPercent(stdDev * Sqrt(252)), Color.GRAY);