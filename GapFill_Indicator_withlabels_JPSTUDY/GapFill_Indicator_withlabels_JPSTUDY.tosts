# TS_GapFill
# thinkscripter@gmail.com
# Last Update 28 Jan 2010
# Last Update 16 Jan 2019 by Jerry Investor

input marketOpenTime = 0930;
input marketCloseTime = 1615;

def yesterdaysClose = close(period = "DAY" )[1];

def secondsFromOpen =  SecondsFromTime(marketOpenTime);
def secondsTillClose = SecondsTillTime(marketCloseTime);
def marketOpen = if secondsFromOpen >= 0 and secondsTillClose >= 0 then 1 else 0;

rec regularHoursOpen = if (secondsFromOpen >= 0 and secondsFromOpen[1] < 0) or
(GetDay() != GetDay()[1]) then open else regularHoursOpen[1];

def newDay = if GetDay() != GetDay()[1] then 1 else 0;

rec regHoursHigh = if newDay then high else if marketOpen then
if high > regHoursHigh[1] then high else regHoursHigh[1] else high;
rec regHoursLow = if newDay then low else if marketOpen then
if low < regHoursLow[1] then low else regHoursLow[1] else low;

def yc = if marketOpen then yesterdaysClose else Double.NaN;
def o = if marketOpen then regularHoursOpen else Double.NaN;
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
then yc else Double.NaN;
plot gL = if (gapUp and !gapFilled and marketOpen and !newDay[-1])
then yc else if (gapDown and !gapFilled and marketOpen and !newDay[-1])
then regHoursHigh else Double.NaN;
plot hGF = if !gapFilled and !halfGapFilled and marketOpen and !newDay[-1]
then hg else Double.NaN;

gH.SetPaintingStrategy(PaintingStrategy.DASHES);
gH.AssignValueColor(if gapDown then Color.DARK_RED else Color.DARK_GREEN);
gL.SetPaintingStrategy(PaintingStrategy.DASHES);
gL.AssignValueColor(if gapDown then Color.DARK_RED else Color.DARK_GREEN);
hGF.SetStyle(Curve.LONG_DASH);
hGF.SetDefaultColor(Color.DARK_GRAY);
gH.HideBubble();
gL.HideBubble();
hGF.HideBubble();

AddCloud(gH, gL, Color.VIOLET, Color.VIOLET);
AddLabel(yes, Concat(percentRemaining, " % Gap Remaining" ),if percentRemaining  > 0 then Color.green else Color.Red);

