var isPC = document.documentElement.scrollWidth > 768 ? true : false,
    margin = {top: 40, right: (isPC ? 50 : 30), bottom: 0, left: (isPC ? 240 : 140) }, //グラフの外枠のマージン設定
    width = d3.select(".graph__inner")[0][0].clientWidth - margin.left - margin.right,
    height = d3.select(".graph__inner")[0][0].clientHeight - margin.top - margin.bottom;

// X軸のスケール設定
var x = d3.scale.linear()
    .range([0, width]);

// Y軸のスケール設定
var y = d3.scale.ordinal()
    .rangeRoundBands([0, height], 0.3);

// X軸の描画設定
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("top")
    .ticks(2)
    .tickFormat(d3.format(".0%"))
    .tickPadding([10])
    .tickSize([0]);

// Y軸の描画設定
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickPadding([10])
    .tickSize([0]);

// ツールチップの設定
var tip = d3.tip()
.attr('class', 'graph__tip')
.offset([-10, 0])
.html(function(d) {
    return "<strong>利用率:</strong> <span class='graph__tip__number'>" + d3.format(".1%")(d.frequency) + "</span>";
})

// グラフの描画領域にSVGを設定
var svg = d3.select(".graph__inner").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//ツールチップの呼び出し
svg.call(tip);

//CSVの呼び出し
d3.csv("data.csv", type, function(error, data) {

  //軸のラベル（項目）表示の設定
x.domain([0, 1]);
y.domain(data.map(function(d) { return d.letter; }));

  //X軸の描画実行
svg.append("g")
    .attr("class", "graph__axis graph__axis--x")
    .call(xAxis);

  //Y軸の描画実行
svg.append("g")
    .attr("class", "graph__axis graph__axis--y")
    .call(yAxis);

  //X軸のスケール描画
svg.selectAll(".graph__axis--x .tick:not(:first-of-type) line")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", height)
    .attr("stroke", "#aaa")
    .attr("stroke-dasharray", "2,2");

  //棒の描画
svg.selectAll(".graph__bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "graph__bar")
    .attr("x", 0)
    .attr("width", 0)
    .attr("y", function(d) { return y(d.letter); })
    .attr("height", y.rangeBand())
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
    .transition()
        .delay(400)
        .duration(500)
        .attr("width", function(d) { return x(d.frequency); });
});

function type(d) {
d.frequency = +d.frequency;
return d;
}