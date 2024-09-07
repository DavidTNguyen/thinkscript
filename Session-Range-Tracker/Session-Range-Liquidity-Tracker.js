// Define the ranges for each session
var NY_PM_Q4_hrange = ...; // Define how to calculate hrange for NY PM session
var NY_PM_Q4_lrange = ...; // Define how to calculate lrange for NY PM session

// Input for showing clouds
var Show_Cloud = true; // Change to false if you don't want to show the cloud
var Show_Cloud2 = true; // Change to false if you don't want to show the second cloud

// Add clouds
if (Show_Cloud) {
    addCloud(NY_PM_Q4_hrange, NY_PM_Q4_lrange, "#FF9966", "#FF9966");
}
if (Show_Cloud2) {
    addCloud(NY_PM_Q4_hrange, NY_PM_Q4_lrange, "#000000", "#000000");
}

// Define specific price levels
var priceLevel1 = 100; // Example price level 1
var priceLevel2 = 200; // Example price level 2

// Add horizontal lines for specific price levels
addHorizontalLine(priceLevel1, "Price Level 1", "#FF0000", "dashed"); // Red dashed line
addHorizontalLine(priceLevel2, "Price Level 2", "#00FF00", "solid"); // Green solid line

// Define the time ranges for each session
var asianSessionStart = "00:00";
var asianSessionEnd = "06:00";
var londonSessionStart = "06:00";
var londonSessionEnd = "12:00";
var nyAMSessionStart = "12:00";
var nyAMSessionEnd = "16:00";

// Function to add vertical lines for session start and end times
function addSessionVerticalLines(sessionStart, sessionEnd, color) {
    addVerticalLine(sessionStart, "", color, "firm");
    addVerticalLine(sessionEnd, "", color, "firm");
}

// Add vertical lines for each session
addSessionVerticalLines(asianSessionStart, asianSessionEnd, "#CCFFCC"); // Asian session
addSessionVerticalLines(londonSessionStart, londonSessionEnd, "#9999FF"); // London session
addSessionVerticalLines(nyAMSessionStart, nyAMSessionEnd, "#0099FF"); // NY AM session

// Input for showing bubbles
var Show_Bubbles = true; // Change to false if you don't want to show bubbles

// Add chart bubbles for session ranges with custom colors
if (Show_Bubbles) {
    addChartBubble(NY_PM_Q4_hrange, NY_PM_Q4_hrange.toString(), "#FF6666"); // Light red color
    addChartBubble(NY_PM_Q4_lrange, NY_PM_Q4_lrange.toString(), "#66FF66", false); // Light green color
}