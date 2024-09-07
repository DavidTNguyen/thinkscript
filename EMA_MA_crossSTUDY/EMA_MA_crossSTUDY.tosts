## jctrades229

input price = close;
input length1 = 23;
input length2 = 50;
input averageType1 = AverageType.EXPONENTIAL;
input averageType2 = AverageType.SIMPLE;
input crossingType = {default above, below};
input showBreakoutSignals = no;
input cross_alert = no;

def avg1 = MovingAverage(averageType1, price, length1);
def avg2 = MovingAverage(averageType2, price, length2);

plot avg1_plot = avg1;
plot avg2_plot = avg2;

avg1_plot.SetDefaultColor(GetColor(1));
avg2_plot.SetDefaultColor(GetColor(2));

plot UpSignal = Crosses(avg1, avg2, crossingType.below);
plot DownSignal = Crosses(avg1, avg2, crossingType.above);

UpSignal.SetHiding(!showBreakoutSignals);
DownSignal.SetHiding(!showBreakoutSignals);

UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);

def ma_cross = avg1 crosses above avg2;

# Alert
Alert(ma_cross and cross_alert, "MA Crossover", Alert.BAR, Sound.Ring);


