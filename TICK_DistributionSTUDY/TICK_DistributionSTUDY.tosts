#TB TICK HI LO DIST
#Originally coded by ShadowTrader

input ShowDistArrows = yes;
input UpThreshold = 1000;
input DownThreshold = -1000;
input DistArrowLevel = 1250;
input ShowHiLo = yes;

def Above = if close > UpThreshold then 1 else 0;
def Below = if close < DownThreshold then 1 else 0;
AddLabel(ShowHiLo,“HI ”+AsText(high(“$TICK”, ”Day”, ”LAST”)), Color.ORANGE); AddLabel(ShowHiLo,“LO ”+AsText(low(“$TICK”, ”Day”, ”LAST”)), Color.ORANGE); AddLabel(close >= 0 and close <= UpThreshold,close+ " ”,Color.GREEN);
AddLabel(close < 0 and close >= DownThreshold,close+ " ”,Color.RED);
AddLabel(close > UpThreshold,"Above "+AsText(UpThreshold)+"! "+ close, Color.GREEN);
AddLabel(close < DownThreshold,"Below "+AsText(DownThreshold)+"! "+close, Color.RED);

#Distribution Function
def Less = If((close < 0), 1, 0); def Greater = If((close >0), 1, 0);
def closeByPeriod = close(period = “DAY”)[-1];
def newDay = if !IsNaN(closeByPeriod) then 0 else 1;
plot DistributionUp;
plot DistributionDown;

if !IsNaN(close(period = “DAY”)[-1])
then {

DistributionUp = Double.NaN;
DistributionDown = Double.NaN;

} else {

DistributionUp = if newDay and ShowDistArrows and Greater then +DistArrowLevel else Double.NaN;
DistributionDown = if newDay and ShowDistArrows and Less then -DistArrowLevel else Double.NaN;
}

DistributionUp.SetStyle(Curve.POINTS);
DistributionUp.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);
DistributionUp.SetDefaultColor(Color.GREEN);
DistributionUp.SetLineWeight(3);
DistributionDown.SetStyle(Curve.POINTS);
DistributionDown.SetPaintingStrategy(PaintingStrategy.LINE_VS_TRIANGLES);
DistributionDown.SetDefaultColor(Color.RED);
DistributionDown.SetLineWeight(3);

