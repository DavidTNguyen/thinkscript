input anchorDate = 20210122;
input anchorTime = 730;

def postAnchorDate = if GetYYYYMMDD() >= anchorDate then 1 else 0;
def postAnchorTime = if SecondsTillTime(anchorTime) == 0 then 1 else if GetYYYYMMDD() < AnchorDate then 0 else postAnchorTime[1];

plot anchoredVWAP = TotalSum(if postAnchorDate and postAnchorTime then ((high+low+close)/3)*(volume) else 0)/TotalSum(if postAnchorDate and postAnchorTime then volume else 0);

anchoredVWAP.setStyle(Curve.Firm);
anchoredVWAP.SetLineWeight(3);
anchoredVWAP.SetDefaultColor(Color.Cyan);





#AddChartBubble(yes,close, revisedDate, color.yellow);
