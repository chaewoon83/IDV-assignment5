// heatmap.js
rawData = {
  "No Attack": {
    "ERM": 94.85,
    "DA": 94.21,
    "PGDT": 84.38,
    "TRADES": 80.42,
    "MART": 81.54,
    "RS": 89.45,
    "IBP": 48.4,
    "PRL": 93.82,
    "TandT": 94.23
  },
  "TIFGSM": {
    "ERM": 35.1,
    "DA": 33.0,
    "PGDT": 65.7,
    "TRADES": 62.9,
    "MART": 69.1,
    "RS": 45.4,
    "IBP": 40.2,
    "PRL": 34.0,
    "TandT": 92.8
  },
  "MIFGSM": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 50.9,
    "TRADES": 51.9,
    "MART": 50.5,
    "RS": 5.8,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 92.8
  },
  "DIFGSM": {
    "ERM": 1.0,
    "DA": 0.0,
    "PGDT": 51.75,
    "TRADES": 50.5,
    "MART": 53.6,
    "RS": 4.1,
    "IBP": 38.1,
    "PRL": 3.1,
    "TandT": 92.8
  },
  "VMIFGSM": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 51.1,
    "TRADES": 50.9,
    "MART": 51.9,
    "RS": 4.1,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 93.9
  },
  "TPGD": {
    "ERM": 38.1,
    "DA": 39.2,
    "PGDT": 69.3,
    "TRADES": 69.1,
    "MART": 70.1,
    "RS": 48.5,
    "IBP": 50.0,
    "PRL": 28.9,
    "TandT": 91.8
  },
  "FGSM": {
    "ERM": 29.9,
    "DA": 25.8,
    "PGDT": 57.95,
    "TRADES": 54.6,
    "MART": 61.9,
    "RS": 28.9,
    "IBP": 38.1,
    "PRL": 25.8,
    "TandT": 93.8
  },
  "RFGSM": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 49.15,
    "TRADES": 50.4,
    "MART": 48.5,
    "RS": 3.7,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 90.0
  },
  "BIM": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 52.0,
    "TRADES": 57.2,
    "MART": 47.4,
    "RS": 2.1,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 90.7
  },
  "FAB": {
    "ERM": 1.0,
    "DA": 2.1,
    "PGDT": 43.0,
    "TRADES": 46.4,
    "MART": 40.2,
    "RS": 5.3,
    "IBP": 38.1,
    "PRL": 4.1,
    "TandT": 90.1
  },
  "CW": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 32.2,
    "TRADES": 35.1,
    "MART": 29.9,
    "RS": 1.0,
    "IBP": 40.2,
    "PRL": 1.0,
    "TandT": 92.9
  },
  "UPGD": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 49.85,
    "TRADES": 50.5,
    "MART": 49.8,
    "RS": 5.1,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 93.8
  },
  "FFGSM": {
    "ERM": 19.6,
    "DA": 23.7,
    "PGDT": 60.55,
    "TRADES": 55.7,
    "MART": 66.0,
    "RS": 33.0,
    "IBP": 42.3,
    "PRL": 29.9,
    "TandT": 92.8
  },
  "Jitter": {
    "ERM": 11.3,
    "DA": 12.4,
    "PGDT": 48.15,
    "TRADES": 47.4,
    "MART": 49.5,
    "RS": 34.0,
    "IBP": 39.2,
    "PRL": 24.7,
    "TandT": 90.7
  },
  "PGD": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 57.4,
    "TRADES": 54.6,
    "MART": 60.8,
    "RS": 7.2,
    "IBP": 40.2,
    "PRL": 0.0,
    "TandT": 91.8
  },
  "EOTPGD": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 50.1,
    "TRADES": 50.3,
    "MART": 50.5,
    "RS": 3.0,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 90.7
  },
  "APGD": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 48.4,
    "TRADES": 51.0,
    "MART": 46.4,
    "RS": 1.0,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 90.7
  },
  "NIFGSM": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 57.95,
    "TRADES": 56.7,
    "MART": 59.8,
    "RS": 7.2,
    "IBP": 38.1,
    "PRL": 1.0,
    "TandT": 92.8
  },
  "SiniFGSM": {
    "ERM": 4.1,
    "DA": 1.0,
    "PGDT": 59.0,
    "TRADES": 56.7,
    "MART": 61.9,
    "RS": 23.7,
    "IBP": 38.1,
    "PRL": 12.4,
    "TandT": 93.7
  },
  "VNIFGSM": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 50.45,
    "TRADES": 53.0,
    "MART": 48.5,
    "RS": 5.1,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 92.9
  },
  "APGDT": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 40.9,
    "TRADES": 44.3,
    "MART": 38.1,
    "RS": 0.0,
    "IBP": 38.1,
    "PRL": 0.0,
    "TandT": 88.7
  },
  "Square": {
    "ERM": 0.0,
    "DA": 1.0,
    "PGDT": 50.4,
    "TRADES": 54.0,
    "MART": 47.4,
    "RS": 3.1,
    "IBP": 38.1,
    "PRL": 2.1,
    "TandT": 88.08
  },
  "Add Gaussian Noise": {
    "ERM": 25.8,
    "DA": 43.3,
    "PGDT": 79.1,
    "TRADES": 78.4,
    "MART": 80.4,
    "RS": 74.2,
    "IBP": 42.3,
    "PRL": 45.4,
    "TandT": 87.6
  },
  "OnePixel": {
    "ERM": 79.4,
    "DA": 83.5,
    "PGDT": 78.05,
    "TRADES": 74.2,
    "MART": 82.5,
    "RS": 83.5,
    "IBP": 42.5,
    "PRL": 80.4,
    "TandT": 89.7
  },
  "Pixle": {
    "ERM": 0.0,
    "DA": 0.0,
    "PGDT": 12.55,
    "TRADES": 11.3,
    "MART": 14.4,
    "RS": 1.0,
    "IBP": 10.3,
    "PRL": 0.0,
    "TandT": 17.5
  },
  "PGDL2": {
    "ERM": 1.0,
    "DA": 0.0,
    "PGDT": 35.8,
    "TRADES": 36.1,
    "MART": 36.1,
    "RS": 5.2,
    "IBP": 36.1,
    "PRL": 0.0,
    "TandT": 92.9
  }
}


const margin = { top: 60, right: 60, bottom: 100, left: 60 };
const cellSize = 40;

const attacks = Object.keys(rawData);              // X축
const methods = Object.keys(rawData[attacks[0]]);  // Y축

const width  = margin.left + margin.right + attacks.length * cellSize;
const height = margin.top  + margin.bottom + methods.length * cellSize;

const svg = d3.select("#heatmap")
.attr("width", width)
.attr("height", height);

// JSON → long format
const data = [];
attacks.forEach(a => {
methods.forEach(m => {
    data.push({ attack: a, method: m, value: rawData[a][m] });
});
});

const values = data.map(d => d.value);
const minVal = d3.min(values);
const maxVal = d3.max(values);

const defs = svg.append("defs");

defs.append("filter")
    .attr("id", "blur-filter")
    .append("feGaussianBlur")
    .attr("stdDeviation", 1);

// X축 = Attack
const x = d3.scaleBand()
.domain(attacks)
.range([margin.left, width - margin.right])
.padding(0.05);

// Y축 = Defense (method)
const y = d3.scaleBand()
.domain(methods)
.range([margin.top, height - margin.bottom])
.padding(0.05);

mincolor = "#f2f2f2"
maxcolor = "#00ff00"
const color = d3.scaleSequential()
  .domain([minVal, maxVal])
  .interpolator(t => d3.interpolateRgb(mincolor, maxcolor)(t));

// 셀 그리기
svg.selectAll("rect.cell")
.data(data)
.enter()
.append("rect")
    .attr("class", "cell")
    .attr("x", d => x(d.attack))
    .attr("y", d => y(d.method))
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", "#f2f2f2")     
    .transition()                    
    .duration(2000)                    
    .delay(d => {
    const t = (d.value - minVal) / (maxVal - minVal);  // 0~1 정규화
    return t * 2000;  
    })      
    .attr("fill", d => color(d.value))
    .on("end", function(_, i) {
    //when every cell animation ended
    if (i === data.length - 1) {  
        enableHover();  
    }});

// 숫자 표시
svg.selectAll("text.value")
.data(data)
.enter()
.append("text")
    .attr("class", "value")
    .attr("x", d => x(d.attack) + x.bandwidth() / 2)
    .attr("y", d => y(d.method) + y.bandwidth() / 2 + 3)
    .attr("text-anchor", "middle")
    .attr("font-size", 9)
    .attr("fill", "black")
    .text(d => d.value.toFixed(1));

// X축 (Attack)
const xAxis = d3.axisBottom(x);
svg.append("g")
.attr("class", "axis x-axis")
.attr("transform", `translate(0, ${height - margin.bottom})`)
.call(xAxis)
.selectAll("text")
    .attr("transform", "rotate(-60)")
    .attr("dx", "-0.8em")
    .attr("dy", "0.1em")
    .style("text-anchor", "end");

// Y축 (Defense)
const yAxis = d3.axisLeft(y);
svg.append("g")
.attr("class", "axis y-axis")
.attr("transform", `translate(${margin.left},0)`)
.call(yAxis);

  
function highlightMaxForMethod(MethodName) {
    const col = data.filter(d => d.method === MethodName && d.attack !== "No Attack");
    const maxVal = d3.max(col, d => d.value);
    svg.selectAll("rect.cell")
        .classed("highlight", d => d.method === MethodName && d.value === maxVal)
        .classed("dimmed", d => !(d.method === MethodName) || d.attack == "No Attack");

    svg.selectAll("text.value")
        .classed("dimmed", d => !(d.method === MethodName) || d.attack == "No Attack");
}

function highlightMaxForMethodAttack(AttackName, MethodName) {
    svg.selectAll("rect.cell")
        .classed("highlight", d => d.method === MethodName && d.attack === AttackName)
        .classed("dimmed", d => !(d.method === MethodName || d.attack === AttackName));

    svg.selectAll("text.value")
        .classed("dimmed", d => !(d.method === MethodName || d.attack === AttackName));
}

function resetHighlight() {
    svg.selectAll(".highlight, .dimmed")
        .classed("highlight", false)
        .classed("dimmed", false);
}

function enableHover() {
    svg.selectAll("rect.cell")
        .on("mouseover", function(event, d) {
            highlightMaxForMethodAttack(d.attack, d.method);
        })
        .on("mouseout", function(event, d) {
            resetHighlight();
        });
}