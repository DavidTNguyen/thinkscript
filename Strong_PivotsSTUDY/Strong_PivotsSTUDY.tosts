# Filter out Weak pivot highs/lows
input lb = 15; # pivots: lookback/forward
input atrlen = 30;
input atrMult = 1.5; # Spikeyness Index
input useSpikeyCond = yes; # use spikey condition
input confirmOnClose = yes; # wait 1x bar to confirm (avoid repainting)
input project_pivots = yes;
input show_arrows = no;
input usecharttime = yes;
input agg = aggregationperiod.fifteen_min;
input add_boundClouds = yes;
input pivot_margin = 0.25;
input use_rth = yes;
input rth_start = 0930;
input rth_end = 1600;
def rth = SecondsFromTime(rth_start) >= 0 and SecondsTillTime(rth_end) >= 0;

def x = if confirmOnClose then 1 else 0;
def atr = ATR(atrlen);

#//MTF
def TFLow;
def TFHigh;
def TFClose;

if UseChartTime
then {
    TFLow   = low;
    TFHigh  = high;
    TFClose = close;
} else {
    TFLow = low(period = agg);
    TFHigh = high(period = agg);
    TFClose = close(period = agg);
}


# Pivot highs & Pivot lows: filtering out the rounded/unimpressive pivot highs
def pivHigh = if use_rth then (if rth and (Highest(TFHigh, lb) <= TFHigh and highest(TFHigh[-lb], lb) <= TFHigh ) then TFHigh else double.nan) else if (Highest(TFHigh, lb) <= TFHigh and highest(TFHigh[-lb], lb) <= TFHigh ) then TFHigh else double.nan;
def isPivHigh = !IsNaN(pivHigh);
def maH = Average(TFHigh, 2 * lb);
def spikyH = if useSpikeyCond then pivHigh > maH + (atrMult * atr) else pivHigh and TFHigh > maH;;

plot ph = (isPivHigh[x] and spikyH[x]);
ph.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
ph.sethiding(!show_arrows);

def pivothigh = if isPivHigh and spikyH then TFHigh else Double.NaN;
def pivothigh1 = if !IsNaN(pivothigh[1]) then pivothigh[1] else pivothigh1[1];

plot project_ph = pivothigh1;
project_ph.setpaintingstrategy(paintingstrategy.horizontal);
project_ph.setdefaultcolor(color.green);
project_ph.sethiding(!project_pivots);

addcloud(if add_boundClouds then project_ph - pivot_margin else double.nan, project_ph + pivot_margin, color.light_green, color.light_green);

### Pivot Lows
def pivLow = if use_rth then (if rth and (Lowest(TFLow, lb) >= TFLow  and lowest(TFLow[-lb], lb) >= TFLow) then TFLow else double.nan) else if (Lowest(TFLow, lb) >= TFLow  and lowest(TFLow[-lb], lb) >= TFLow) then TFLow else double.nan;
def isPivLow = !IsNaN(pivLow);
def maL = Average(TFLow, 2 * lb);
def spikyL = if useSpikeyCond then pivLow < maL - (atrMult * atr) else pivLow and TFLow < maL;;

plot pl = isPivLow[x] and spikyL[x];
pl.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
pl.sethiding(!show_arrows);

def pivotlow = if isPivLow and spikyL then TFLow else Double.NaN;
def pivotlow1 = if !IsNaN(pivotlow[1]) then pivotlow[1] else pivotlow1[1];

plot project_pl = pivotlow1;
project_pl.setpaintingstrategy(paintingstrategy.horizontal);
project_pl.setdefaultcolor(color.red);
project_pl.sethiding(!project_pivots);

addcloud(if add_boundClouds then project_pl - pivot_margin else double.nan,  project_pl + pivot_margin, color.light_red, color.light_red);

