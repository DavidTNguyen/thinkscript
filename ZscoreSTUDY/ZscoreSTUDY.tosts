#=====================================
#Computes and plots the Zscore
#Provided courtesy of ThetaTrend.com
#Feel free to share the code with a link back to thetatrend.com

declare lower;

input price = close;
input length = 20;
input ZavgLength = 20;

#Initialize values
def oneSD = stdev(price,length);
def avgClose = simpleMovingAvg(price,length);
def ofoneSD = oneSD*price[1];
def Zscorevalue = ((price-avgClose)/oneSD);
def avgZv = average(Zscorevalue,20);

#Compute and plot Z-Score
plot Zscore = ((price-avgClose)/oneSD);
Zscore.setPaintingStrategy(paintingStrategy.HISTOGRAM);
Zscore.setLineWeight(2);
Zscore.assignValueColor(color.cyan);
Zscore.assignValueColor(if Zscore > 0 then color.cyan else color.red);

plot avgZscore = average(Zscorevalue,ZavgLength);
avgZscore.setPaintingStrategy(paintingStrategy.LINE);
avgZscore.setLineWeight(2);
avgZscore.assignValueColor(color.green);
#This is an optional plot that will display the momentum of the Z-Score average
#plot momZAvg = (avgZv-avgZv[5]);

#Plot zero line and extreme bands
plot zero = 0;
plot two = 2;
two.assignValueColor(color.YELLOW);
plot one = 1;
one.setPaintingStrategy(paintingStrategy.DASHES);
one.setLineWeight(1);
one.assignValueColor(color.GRAY);
plot negone = -1;
negone.setPaintingStrategy(paintingStrategy.DASHES);
negone.setLineWeight(1);
negone.assignValueColor(color.GRAY);
plot negtwo = -2;
negtwo.assignValueColor(color.LIGHT_RED);
zero.setDefaultColor(color.DARK_GRAY);
avgZscore.AssignValueColor(if avgZscore >avgZscore[1]
                     then Color.WHITE
                     else if avgZscore <avgZscore[1]
                          then Color.Red
                          else Color.White);

