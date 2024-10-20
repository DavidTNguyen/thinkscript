# VietRoadie TODO - Change the calculation dynamically when new ticker entered.

declare upper;

# Dropdown to select the product tracking the volatility index
input volIndexType = {default "S&P 500", "Nasdaq 100", "Russell 2000", "Apple", "Google", "Amazon", "Gold", "Goldman Sachs", "Crude Oil", "TLT"};

# Automatically detect the symbol on the chart, using the daily close for calculation
def dailyClose = close(GetSymbol(), period = AggregationPeriod.DAY);
def tickerClose = if !IsNaN(dailyClose) then dailyClose else tickerClose[1];

# Determine the appropriate volatility index based on the selected option, using daily aggregation
def currentVolIndex;
switch (volIndexType) {
    case "S&P 500":
        currentVolIndex = close("VIX", period = AggregationPeriod.DAY);
    case "Nasdaq 100":
        currentVolIndex = close("VXN:CGI", period = AggregationPeriod.DAY);
    case "Russell 2000":
        currentVolIndex = close("RVX", period = AggregationPeriod.DAY);
    case "Apple":
        currentVolIndex = close("VXAPL:CGI", period = AggregationPeriod.DAY);
    case "Google":
        currentVolIndex = close("VXGOG:CGI", period = AggregationPeriod.DAY);
    case "Amazon":
        currentVolIndex = close("VXAZN:CGI", period = AggregationPeriod.DAY);
    case "Gold":
        currentVolIndex = close("GVZ:CGI", period = AggregationPeriod.DAY);
    case "Goldman Sachs":
        currentVolIndex = close("VXGS:CGI", period = AggregationPeriod.DAY);
    case "Crude Oil":
        currentVolIndex = close("OVX:CGI", period = AggregationPeriod.DAY);
    case "TLT":
        currentVolIndex = close("VXTLT:CGI", period = AggregationPeriod.DAY);
}

# Calculate the implied daily move percentage based on the daily volatility index
def impliedMove = currentVolIndex / Sqrt(252);

# Project tomorrow's upper and lower bands based on the most recent daily close
def projectedUpperBand = tickerClose * (1 + impliedMove / 100);
def projectedLowerBand = tickerClose * (1 - impliedMove / 100);

# Plot the projected bands for the following day with a one-day displacement inline in the plot
plot NextDay_Upper_Band = projectedUpperBand[1]; # Displace forward by using [1] offset
plot NextDay_Lower_Band = projectedLowerBand[1]; # Displace forward by using [1] offset

# Styling for the projected bands (solid white lines)
NextDay_Upper_Band.SetDefaultColor(Color.WHITE);
NextDay_Upper_Band.SetLineWeight(2);
NextDay_Lower_Band.SetDefaultColor(Color.WHITE);
NextDay_Lower_Band.SetLineWeight(2);

# Apply yellow color to candles if the price closes outside the projected bands
AssignPriceColor(if close > projectedUpperBand[1] or close < projectedLowerBand[1] then Color.YELLOW else Color.CURRENT);

# Display the implied move, upper, and lower levels in the labels, with white text color
AddLabel(yes, "Implied Move: " + AsPercent(impliedMove / 100), Color.WHITE);
AddLabel(yes, "Upper Level: " + AsText(projectedUpperBand, NumberFormat.TWO_DECIMAL_PLACES), Color.WHITE);
AddLabel(yes, "Lower Level: " + AsText(projectedLowerBand, NumberFormat.TWO_DECIMAL_PLACES), Color.WHITE);
