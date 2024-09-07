declare Hide_On_Daily;
declare Once_per_bar;

input OrMeanS  = 0930.0; #hint OrMeanS: Begin Mean Period. Usually Market Open EST.
input OrMeanE  = 0935.0; #hint OrMeanE: End Mean period. Usually End of first bar.
input OrBegin  = 0930.0; #hint OrBegin: Beginning for Period of Opening Range Breakout.
input OrEnd    = 1000.0; #hint OrEnd: End of Period of Opening Range Breakout.
input CloudOn  = yes;     #hint CloudOn: Clouds Opening Range.
input AlertOn  = yes;    #hint AlertOn: Alerts on cross of Opening Range.
input ShowTodayOnly = {"No", default "Yes"};   
input nAtr = 4;          #hint nATR: Lenght for the ATR Risk and Target Lines.
input AtrTargetMult = 2.0; #hint ATRmult: Multiplier for the ATR calculations.

  def h = high;
  def l = low;
  def c = close;
  def bar = barNumber();
  def s = ShowTodayOnly;
  def ORActive = if secondsTillTime(OrMeanE) > 0 and
                    secondsFromTime(OrMeanS) >= 0 
                 then 1 
                 else 0;
  def today = if s == 0 
              or getDay() == getLastDay() and
                 secondsFromTime(OrMeanS) >= 0 
              then 1 
              else 0;
  def ORHigh = if ORHigh[1] == 0 
               or ORActive[1] == 0 and 
                  ORActive == 1 
               then h 
               else if ORActive and
                       h > ORHigh[1] 
               then h 
               else ORHigh[1];
  def ORLow = if ORLow[1] == 0 
              or ORActive[1] == 0 and
                 ORActive == 1 
              then l 
              else if ORActive and
                      l < ORLow[1] 
              then l 
              else ORLow[1];
  def ORWidth = ORHigh - ORLow;
  def na = double.nan;
  def ORHA = if ORActive 
             or today < 1 
             then na 
             else ORHigh;
  def ORLA = if ORActive 
             or today < 1 
             then na 
             else ORLow;
  def O = ORHA - Round(((ORHA - ORLA) / 2) / TickSize(), 0) * TickSize();
  def ORActive2 = if secondsTillTime(OREnd) > 0 and
                     secondsFromTime(ORBegin) >= 0 
                  then 1 
                  else 0;
  def ORHigh2 = if ORHigh2[1] == 0 
                  or ORActive2[1] == 0 and
                     ORActive2 == 1 
                then h
                else if ORActive2 and
                        h > ORHigh2[1] 
                then h 
                else ORHigh2[1];
  def ORLow2 = if ORLow2[1] == 0 
                or ORActive2[1] == 0 and
                   ORActive2 == 1 
               then l 
               else if ORActive2 and
                       l < ORLow2[1] 
               then l 
               else ORLow2[1];
  def ORWidth2 = ORHigh2 - ORLow2;
  def TimeLine = if secondsTillTime(OREnd) == 0  
                 then 1 
                 else 0;
  def ORmeanBar = if !ORActive and ORActive[1]
                  then barNumber()
                  else ORmeanBar[1];
  def ORendBar = if !ORActive2 and ORActive2[1]
                 then barNumber()
                 else ORendBar[1];
  def ORL = if (o == 0 , na, o);

  def ORH2 = if ORActive2 
             or today < 1 
             then na 
             else ORHigh2;

  def ORL2 = if ORActive2 
               or today < 1 
             then na 
             else ORLow2;

  def RelDay = (ORL - ORL2) / (ORH2 - ORL2);
  def dColor = if RelDay > .5
               then 5
               else if RelDay < .5
                    then 6
               else 4;
  def pos = (ORH2 - ORL2)/10;

addCloud(if CloudOn == yes 
         then orl 
         else double.nan
       , orl2,createColor(244,83,66), createColor(244,83,66));
addCloud(if CloudOn == yes 
         then orl 
         else double.nan
       , orh2,createColor(144, 238, 144), createColor(144, 238, 144));

