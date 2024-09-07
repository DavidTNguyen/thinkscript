# TS_GapFill
# [www.thinkscripter.com]
# thinkscripter@gmail.com
# Last Update 28 Jan 2010

input marketOpenTime = 0930;
input marketCloseTime = 1615;

def yesterdaysClose = close(period = "DAY" )[1];

def secondsFromOpen =  secondsFromTime(marketOpenTime);
def secondsTillClose = secondsTillTime(marketCloseTime);
def marketOpen = if secondsFromOpen >= 0 and secondsTillClose >= 0 then 1 else 0;

rec regularHoursOpen = if (secondsFromOpen >= 0 and secondsFromOpen[1] < 0) or
(getDay() != getDay()[1]) then open else regularHoursOpen[1];

def newDay = if getDay() != getDay()[1] then 1 else 0;

rec regHoursHigh = if newDay then high else if marketOpen then
if high > regHoursHigh[1] then high else regHoursHigh[1] else high;
rec regHoursLow = if newDay then low else if marketOpen then
if low < regHoursLow[1] then low else regHoursLow[1] else low;

def yc = if marketOpen then yesterdaysClose else double.nan;
def o = if marketOpen then regularHoursOpen else double.nan;
def hg = o + (yc - o) / 2;

def gapUp = if yc < o then 1 else 0;
def gapDown = if yc > o then 1 else 0;

def gapRemaining = if gapUp then
Max(regHoursLow - yc, 0) else
if gapDown then Max(yc - regHoursHigh, 0) else 0;

def percentRemaining = 100 * gapRemaining / AbsValue(yc - o);
def gapFilled = if percentRemaining == 0 then 1 else 0;
def halfGapFilled = if percentRemaining <= 50 then 1 else 0;

plot gH = if (gapUp and !gapFilled and marketOpen and !newDay[-1])
then regHoursLow else if (gapDown and !gapFilled and marketOpen and !newDay[-1])
then yc else double.nan;
plot gL = if (gapUp and !gapFilled and marketOpen and !newDay[-1])
then yc else if (gapDown and !gapFilled and marketOpen and !newDay[-1])
then regHoursHigh else double.nan;
plot hGF = if !gapFilled and !halfGapFilled and marketOpen and !newDay[-1]
then hg else double.nan;

gH.SetPaintingStrategy(paintingStrategy.DaSHES);
gH.AssignValueColor(if gapDown then color.darK_red else color.dark_green);
gL.SetPaintingStrategy(paintingStrategy.DASHES);
gL.AssignValueColor(if gapDown then color.darK_red else color.dark_green);
hGF.setStyle(curve.LONG_DASH);
hGF.SetDefaultColor(color.dark_gray);
gH.hideBubble();
gL.hideBubble();
hgF.hideBubble();

AddCloud(gH, gL, color.violet, color.violet);
#AddChartLabel(gapUp or gapDown, concat(percentRemaining, " % Gap Remaining" ), color.white);

