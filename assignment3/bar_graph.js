function BarGraph() {
    const svg = d3.select("#bar_graph_canvas");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove(); // clear

    const startX = 50;
    const startY = 80;
    const cx = width/2;
    const cy = height/2;

    data1 = [74.4, 64.8];

    data2 = [81.9, 65.5];

    data3 = [73.1, 63.5];

    datastartingPoint = [startX + 30, startX + 200, startX + 370]
    test_cases = ["BERT", "RoBERTa", "BART"]
    
    MakePartBarGraph(svg, data1, datastartingPoint[0], startY, width, height + startY / 2);

    MakePartBarGraph(svg, data2, datastartingPoint[1], startY, width, height + startY / 2);

    MakePartBarGraph(svg, data3, datastartingPoint[2], startY, width, height + startY / 2);
    
    const rectWidth = width - 2 * startX;
    const rectHeight = height - startY;
    svg.append("rect")
    .attr("x", startX)
    .attr("y", startY / 2)
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .attr("fill", "none")
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("opacity", 1.0)

    svg.append("line")
    .attr("x1", startX)
    .attr("y1", startY)
    .attr("x2", startX + 15)
    .attr("y2", startY)
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("opacity", 1.0)

    svg.append("line")
    .attr("x1", width - startX)
    .attr("y1", startY)
    .attr("x2", width - startX - 15)
    .attr("y2", startY)
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("opacity", 1.0)

    svg.append("text")
    .attr("x", startX - 20 )
    .attr("y", startY)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "16px")
    .text(`100`);

    svg.append("text")
    .attr("x", cx )
    .attr("y", cy - rectHeight / 2 + 20)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "16px")
    .text(`Cross Validation Accuracy (%)`);

    datastartingPoint.forEach((x, i) => {
        svg.append("text")
        .attr("x", x + 55 )
        .attr("y", height - startY / 2 + 20)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "16px")
        .text(`${test_cases[i]}`);
    });
}

BarGraph();

function drawBarGraph() {
    BarGraph();
}

function MakePartBarGraph(svg, data, startX, startY, width, height) {
    const xScale = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([0, 100])

    const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height-startY, startY]);

    const g = svg.append("g")
        .attr("transform", `translate(${startX}, 0)`);
    
    //tooltip definite
    const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "5px 8px")
    .style("border-radius", "6px")
    .style("font-size", "14px")
    .style("pointer-events", "none")
    .style("opacity", 0);

    g.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => xScale(i)+ i * 10)
    .attr("y", yScale(0))
    .attr("height", 0)
    .attr("width", xScale.bandwidth())
    .style("fill", (d, i) => i == 0 ? "orange" : "white")
    .style("stroke", (d, i) => i == 0 ? "none" : "orange")
    .style("stroke", (d, i) => i == 0 ? "none" : "orange")
    .attr("stroke-width", (d, i) => i == 0 ? 0 : 2)
    //hover effect
    .style("stroke-dasharray", (d, i) => i == 0 ? 0 : "6,4")
        .on("mouseover", function (event, d) {
        tooltip
        .style("opacity", 1)
        .html(`Value: ${d}`);
    })
    .on("mousemove", function (event) {
        tooltip
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 20) + "px");
    })
    .on("mouseout", function () {
        tooltip.style("opacity", 0);
    })
    .transition()
    .duration(800)
    .attr("y", d => yScale(d))
    .attr("height", d => (height - startY) - yScale(d));
}

function showBarGraph() {
    const allContainers = document.getElementsByClassName("diagram");
    for (let i = 0; i < allContainers.length; i++) {
        allContainers[i].style.display = "none";
    }
    
    const container = document.getElementById("bar_graph");
    container.style.display = "block";
    container.style.opacity = 0;
    container.style.transition = "opacity 1s";
    setTimeout(() => container.style.opacity = 1, 10);

    d3.select("#bar_graph_canvas").selectAll("*").remove(); //clear previous diagram
    BarGraph();
}
