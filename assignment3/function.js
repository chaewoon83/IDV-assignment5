function MakeFunction() {
    const svg = d3.select("#function_canvas");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove(); // clear


    const margin = {left: 60, right: 20, top: 20, bottom: 40};
    const plotW = width - margin.left - margin.right;
    const plotH = height - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    //parameters
    const mean1 = 0.8, sd1 = 0.8;
    const mean2 = 1.8, sd2 = 0.8;

    function normalPDF(x, mean, sd) {
        return (1 / (sd * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * ((x - mean) / sd) ** 2);
    }

    const xMin = -2, xMax = 5;
    const step = 0.02;
    const xs = d3.range(xMin, xMax + step, step);

    const data1 = xs.map(x => ({x, y: normalPDF(x, mean1, sd1)}));
    const data2 = xs.map(x => ({x, y: normalPDF(x, mean2, sd2)}));

    const maxY = d3.max([...data1.map(d => d.y), ...data2.map(d => d.y)]);
    const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, plotW]);
    const yScale = d3.scaleLinear().domain([0, maxY * 1.2]).range([plotH, 0]);
    const maxYLimit = 0.55

    //axis
    g.append("g").attr("transform", `translate(0,${plotH})`).call(d3.axisBottom(xScale));
    g.append("g").call(d3.axisLeft(yScale));

    //fucntion line
    const line = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))
        .curve(d3.curveBasis);

    const path1 = g.append("path").datum(data1)
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 2)
        .attr("pathLength", 1) 
        .attr("stroke-dasharray", 1)
        .attr("stroke-dashoffset", 1)
        .attr("d", line)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

    const path2 = g.append("path").datum(data2)
        .attr("fill", "none")
        .attr("stroke", "teal")
        .attr("stroke-width", 2)
        .attr("pathLength", 1)
        .attr("stroke-dasharray", 1)
        .attr("stroke-dashoffset", -1)
        .attr("d", line)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

    // overlapped area
    graph1AreaValue = 1.0;
    graph2AreaValue = 1.5;

    const graph1Area = data1
    .filter(d => d.x >= graph1AreaValue) 
    .map((d, i) => ({
        x: d.x,
        y: d.y
    }));

    const graph2Area = data2
    .filter(d => d.x <= graph2AreaValue) 
    .map((d, i) => ({
        x: d.x,
        y: d.y
    }));

    const area = d3.area()
        .x(d => xScale(d.x))
        .y0(yScale(0))
        .y1(d => yScale(d.y))
        .curve(d3.curveBasis);

    g.append("defs").append("clipPath")
        .attr("id", "clipLeft")
        .append("rect")
        .attr("x", xScale(graph1AreaValue))
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", plotH)
        .transition()
        .delay(1000)
        .duration(1500)
        .attr("width", plotW - xScale(graph1AreaValue))
        .on("end", function() {
            d3.select("#clipLeft").remove();
            dottedLine1Hitbox.call(dragLine);
            dottedLine1Hitbox.style("cursor", "grab");
        });

    g.append("defs").append("clipPath")
        .attr("id", "clipRight")
        .append("rect")
        .attr("x", xScale(graph2AreaValue))
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", plotH)
        .transition()
        .delay(1000)
        .duration(1500)
        .attr("x", 0)
        .attr("width", xScale(graph2AreaValue))
        .on("end", function() {
            d3.select("#clipRight").remove();
            dottedLine2Hitbox.call(dragLine);
            dottedLine2Hitbox.style("cursor", "grab");
        });



    const Area1 = g.append("path")
        .datum(graph1Area)
        .attr("d", area)
        .attr("fill", "gray")
        .attr("opacity", 0.4)
        .attr("clip-path", "url(#clipLeft)");

    const Area2 = g.append("path")
        .datum(graph2Area)
        .attr("d", area)
        .attr("fill", "gray")
        .attr("opacity", 0.4)
        .attr("clip-path", "url(#clipRight)");

    //dotted line
    const dottedLine1 = g.append("line")
        .attr("x1", xScale(graph1AreaValue))
        .attr("y1", yScale(0))
        .attr("x2", xScale(graph1AreaValue))
        .attr("y2", yScale(0))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4,4");

    const dottedLine1Hitbox = g.append("line")
        .attr("x1", xScale(graph1AreaValue))
        .attr("y1", yScale(0))
        .attr("x2", xScale(graph1AreaValue))
        .attr("y2", yScale(maxYLimit))
        .attr("stroke", "transparent")   // 투명
        .attr("stroke-width", 10)        // 클릭 영역만 넓음
        .attr("pointer-events", "stroke");

    dottedLine1.transition()
        .duration(1000)
        .attr("y2", yScale(maxYLimit));

    const dottedLine2 = g.append("line")
        .attr("x1", xScale(graph2AreaValue))
        .attr("y1", yScale(0))
        .attr("x2", xScale(graph2AreaValue))
        .attr("y2", yScale(0))
        .attr("stroke", "black")
        .attr("stroke-dasharray", "4,4")
        .style("cursor", "grab");

    const dottedLine2Hitbox = g.append("line")
        .attr("x1", xScale(graph2AreaValue))
        .attr("y1", yScale(0))
        .attr("x2", xScale(graph2AreaValue))
        .attr("y2", yScale(maxYLimit))
        .attr("stroke", "transparent")   // 투명
        .attr("stroke-width", 10)        // 클릭 영역만 넓음
        .attr("pointer-events", "stroke");

    dottedLine2.transition()
        .duration(1000)
        .attr("y2", yScale(maxYLimit));

    function updateAreas() {
        const graph1AreaValueNew = xScale.invert(+dottedLine1.attr("x1"));
        const graph2AreaValueNew = xScale.invert(+dottedLine2.attr("x1"));

        const graph1AreaNew = data1
        .filter(d => d.x >= graph1AreaValueNew) 
        .map((d, i) => ({
            x: d.x,
            y: d.y
        }));

        const graph2AreaNew = data2
        .filter(d => d.x <= graph2AreaValueNew) 
        .map((d, i) => ({
            x: d.x,
            y: d.y
        }));

        Area1.datum(graph1AreaNew)
            .attr("d", area)
            .attr("fill", "gray")
            .attr("opacity", 0.4);
;
        Area2.datum(graph2AreaNew)
            .attr("d", area);
    }

    const dragLine = d3.drag()
    .on("start", function() {
        d3.select(this).style("cursor", "grabbing");
    })
    .on("drag", function(event) {
        const newX = Math.max(0, Math.min(plotW, event.x));
        //current dragbox
        const hitbox = d3.select(this);
        if (this === dottedLine1Hitbox.node()) {
        dottedLine1
            .attr("x1", newX)
            .attr("x2", newX);
        hitbox.attr("x1", newX).attr("x2", newX);
        } else if (this === dottedLine2Hitbox.node()) {
        dottedLine2
            .attr("x1", newX)
            .attr("x2", newX);
        hitbox.attr("x1", newX).attr("x2", newX);
        }
        updateAreas();
    })
    .on("end", function() {
        // d3.select(this).attr("stroke-width", 1).attr("opacity", 1);
    });

    //axis label
    g.append("text")
        .attr("x", plotW / 2)
        .attr("y", plotH + 35)
        .attr("text-anchor", "middle")
        .text("x");
    g.append("text")
        .attr("x", -plotH / 2)
        .attr("y", -45)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Probability Density");

    //graph form
    const legend = g.append("g").attr("transform", `translate(${plotW - 120}, 20)`);
    legend.append("line")
        .attr("x1", 0).attr("x2", 20).attr("y1", 0).attr("y2", 0)
        .attr("stroke", "orange").attr("stroke-width", 2);
    legend.append("text")
        .attr("x", 30).attr("y", 5).text("p(x, y=0) * ν(x)");
    legend.append("line")
        .attr("x1", 0).attr("x2", 20).attr("y1", 20).attr("y2", 20)
        .attr("stroke", "teal").attr("stroke-width", 2);
    legend.append("text")
        .attr("x", 30).attr("y", 25).text("p(x, y=1) * ν(x)");
}


MakeFunction();

function showFunction() {
    const allContainers = document.getElementsByClassName("diagram");
    for (let i = 0; i < allContainers.length; i++) {
        allContainers[i].style.display = "none";
    }
    
    const container = document.getElementById("function");
    container.style.display = "block";
    container.style.opacity = 0;
    container.style.transition = "opacity 1s";
    setTimeout(() => container.style.opacity = 1, 10);

    d3.select("#function_canvas").selectAll("*").remove(); //clear previous diagram
    MakeFunction();
}