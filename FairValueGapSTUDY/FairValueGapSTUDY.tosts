input fvg_threshold = 1;
input bpr_threshold = 1;
input bars_since = 10;
input only_clean_bpr = no;

def new_fvg_bearish = if low[2] - high > fvg_threshold then yes else no;
def new_fvg_bullish = if low - high[2] > fvg_threshold then yes else no;


# Bullish BPR
def new_bear = if new_fvg_bearish then 1 else new_bear[1] + 1;
def bullish_bear_fvg_high = if new_bear == 1 then low[2] else bullish_bear_fvg_high[1];
def bullish_bear_fvg_low = if new_bear == 1 then high else bullish_bear_fvg_low[1];

def bull_cond_1 = new_fvg_bullish and new_fvg_bearish within bars_since bars;

def bull_fvg_high = if bull_cond_1 then low else bull_fvg_high[1];
def bull_fvg_low = if bull_cond_1 then high[2] else bull_fvg_low[1];

def bull_cond_2 = if bull_cond_1 then if bullish_bear_fvg_low + bullish_bear_fvg_high + bull_fvg_low + bull_fvg_high > Max(bullish_bear_fvg_low, bull_fvg_low) - Min(bullish_bear_fvg_high, bull_fvg_high) then yes else no else no;

def bull_combined_low = if bull_cond_1 and bull_cond_2 then Max(bullish_bear_fvg_low, bull_fvg_low) else bull_combined_low[1];
def bull_combined_high = if bull_cond_1 and bull_cond_2 then Min(bullish_bear_fvg_high, bull_fvg_high) else bull_combined_high[1];

def bull_cond_3 = if only_clean_bpr then fold i = 2 to bars_since with j = yes do if i < new_bear and high[i] > bull_combined_low then j and no else j and yes else yes;

def bull_result = if bull_cond_1 and bull_cond_2 and (bull_combined_high - bull_combined_low > bpr_threshold) then yes else if low < bull_combined_low then double.nan else bull_result[1];

def bull_result_high = if bull_result and bull_combined_low < bull_combined_high then bull_combined_high else bull_result_high[1];
def bull_result_low = if bull_result and bull_combined_low < bull_combined_high then bull_combined_low else bull_result_low[1];


# Bearish BPR
def new_bull = if new_fvg_bullish then 1 else new_bull[1] + 1;
def bearish_bull_fvg_high = if new_bull == 1 then low else bearish_bull_fvg_high[1];
def bearish_bull_fvg_low = if new_bull == 1 then high[2] else bearish_bull_fvg_low[1];

def bear_cond_1 = new_fvg_bearish and new_fvg_bullish within bars_since bars;

def bear_fvg_high = if bear_cond_1 then low[2] else bear_fvg_high[1];
def bear_fvg_low = if bear_cond_1 then high else bear_fvg_low[1];

def bear_cond_2 = if bear_cond_1 then if bearish_bull_fvg_low + bearish_bull_fvg_high + bear_fvg_low + bear_fvg_high > Max(bearish_bull_fvg_low, bear_fvg_low) - Min(bearish_bull_fvg_high, bear_fvg_high) then yes else no else no;

def bear_combined_low = if bear_cond_1 and bear_cond_2 then Max(bearish_bull_fvg_low, bear_fvg_low) else bear_combined_low[1];
def bear_combined_high = if bear_cond_1 and bear_cond_2 then Min(bearish_bull_fvg_high, bear_fvg_high) else bear_combined_high[1];

def bear_cond_3 = if only_clean_bpr then fold k = 2 to bars_since with p = yes do if k < new_bull and low[k] < bear_combined_high then p and no else p and yes else yes;

def bear_result = if bear_cond_1 and bear_cond_2 and bear_cond_3 and (bear_combined_high - bear_combined_low > bpr_threshold) then yes else if high > bear_combined_high then double.nan else bear_result[1];

def bear_result_high = if bear_result and bear_combined_low < bear_combined_high then bear_combined_high else bear_result_high[1];
def bear_result_low = if bear_result and bear_combined_low < bear_combined_high then bear_combined_low else bear_result_low[1];


# Plotting
def bull_signal = if bull_result then yes else no;
def bh = if bull_result then bull_result_high else bh[1];
def bh1 = bh;
def bl = if bull_result then bull_result_low else bl[1];
def bl1 = bl;

def bear_signal = if bear_result then yes else no;
def ph = if bear_result then bear_result_high else ph[1];
def ph1 = ph;
def pl = if bear_result then bear_result_low else pl[1];
def pl1 = pl;

DefineGlobalColor("Bullish", Color.GREEN);
DefineGlobalColor("Bearish", Color.RED);
AddCloud(if bull_signal then bh1 else Double.NaN, if bull_signal then bl1 else Double.NaN,  GlobalColor("Bullish"));
AddCloud(if bear_signal then ph1 else Double.NaN, if bear_signal then pl1 else Double.NaN,  GlobalColor("Bearish"));
