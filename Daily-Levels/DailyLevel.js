// Only work on TrendSpider
describe_indicator("ES - Market Clubhouse Daily Levels");

const levels = [
	6150.5, 6095.5, 6063.0, 6036.0, 6009.0, 5996.25, 5971.5, 5951.5, 5931.5,
	5916.5, 5899.75, 5880.25, 5860.25, 5843.0, 5830.75, 5812.25, 5797.5, 5782.75,
	5771.5, 5751.25, 5734.75, 5723.0, 5716.0, 5710.0, 5704.25,
];

levels.forEach((level) => {
	paint(horizontal_line(+level), { thickness: 1, color: "#FF000066" });
});
