#TB_BreadthBubbles UPDATED 10/27/2023

input ShowZeroLine = yes;
input ShowNYSE = yes;
input ShowNASDAQ = yes;
input ShowRUSSELL = yes;
input ShowSNP = yes;

def UVOL = close(“$UVOL”);
def DVOL = close(“$DVOL”);
def UVOLQ = close(“$UVOL/Q”);
def DVOLQ = close(“$DVOL/Q”);
def UVOLRL = close("$UVOLRL");
def DVOLRL = close("$DVOLRL");
def UVOLSP = close("$UVOLSP");
def DVOLSP = close("$DVOLSP");

#NYSE Breadth ratio
def NYSEratio =  if (UVOL >= DVOL) then (UVOL / DVOL) else -(DVOL / UVOL);
AddLabel(ShowNYSE, Concat(Round(NYSEratio, 2), ” :1 NYSE ”), (if NYSEratio >= 0 then Color.GREEN else Color.RED));

#Nasdaq Breadth ratio
def NASDratio =  if (UVOLQ >= DVOLQ) then (UVOLQ / DVOLQ) else -(DVOLQ / UVOLQ) ;
AddLabel(ShowNASDAQ, Concat(Round(NASDratio, 2), ” :1 NASDAQ ”), (if NASDratio >= 0 then Color.GREEN else Color.RED));

#Russell Breadth ratio
def Russellratio =  if (UVOLRL >= DVOLRL) then (UVOLRL / DVOLRL) else -(DVOLRL / UVOLRL) ;
AddLabel(ShowRUSSELL, Concat(Round(Russellratio, 2), ” :1 RUSSELL ”), (if Russellratio >= 0 then Color.GREEN else Color.RED));

#SNP Breadth ratio
def SNPratio =  if (UVOLSP >= DVOLSP) then (UVOLSP / DVOLSP) else -(DVOLSP / UVOLSP) ;
AddLabel(ShowSNP, Concat(Round(SNPratio, 2), ” :1 S&P500 ”), (if SNPratio >= 0 then Color.GREEN else Color.RED));
