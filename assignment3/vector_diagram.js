function VectorDiagram() {
    const svg = d3.select("#vector_diagram_canvas");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const gridSize = 50;

    //Draw grid
    for (let x = 0; x <= width; x += gridSize) {
        svg.append("line")
        .attr("x1", x).attr("y1", 0)
        .attr("x2", x).attr("y2", height)
        .attr("stroke", "#eee");
    }
    for (let y = 0; y <= height; y += gridSize) {
        svg.append("line")
        .attr("x1", 0).attr("y1", y)
        .attr("x2", width).attr("y2", y)
        .attr("stroke", "#eee");
    }

    //Points
    const points = [
        { id: "e1a", x: 400, y: 100, color: "black" },
        { id: "e2a", x: 250, y: 100, color: "black" },
        { id: "e1b", x: 300, y: 200, color: "black" },
        { id: "e2b", x: 150, y: 200, color: "black" }
    ];

    //Arrow data
    const arrowsData = [
        { start: "e1a", end: "e1b", color: "black", dashed: false },
        { start: "e1b", end: "e2b", color: "black", dashed: false },
        { start: "e2b", end: "e2a", color: "black", dashed: false },
        { start: "e2a", end: "e1a", color: "black", dashed: false },
        { start: "e2a", end: "e1b", color: "darkcyan", dashed: true },
        { start: "e1a", end: "e2b", color: "darkblue", dashed: true },
    ];

    // //arrow animate
    function drawAnimatedArrow(p1, p2, color, dashed, index, onComplete) {
        const line = svg.append("line")
        .attr("id", `arrow-${index}`)
        .attr("x1", p1.x)
        .attr("y1", p1.y)
        .attr("x2", p2.x)
        .attr("y2", p2.y)
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .style("stroke-dasharray", dashed ? "6,4" : "none")
        .attr("opacity", 0);



        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        //make arrow head with polygon direcrlty
        const arrowHead = svg.append("polygon")
        .attr("points", "0,0 -8,-4 -8,4")
        .attr("fill", color)
        .attr("opacity", 0)
        .attr("transform", `translate(${p2.x},${p2.y}) rotate(${angle})`);

        line.transition()
        .delay(index * 600)
        .duration(1000)
        .ease(d3.easeCubicOut)
        .attr("opacity", 1)
        .attrTween("x2", function() {
            const ix = d3.interpolateNumber(p1.x, p2.x);
            const iy = d3.interpolateNumber(p1.y, p2.y);
            return function(t) {
            const cx = ix(t);
            const cy = iy(t);
            arrowHead
                .attr("opacity", t)
                .attr("transform", `translate(${cx},${cy}) rotate(${angle})`);
            return cx;
            };
        })
        .attrTween("y2", function() {
            const iy = d3.interpolateNumber(p1.y, p2.y);
            return t => iy(t);
        })
        .on("end", () => {
            if (dashed) line.attr("stroke-dasharray", "6,4");
            if (onComplete) onComplete();
        });
    }

    //Sequential animation
    let completed = 0;
    arrowsData.forEach((a, i) => {
        const p1 = points.find(p => p.id === a.start);
        const p2 = points.find(p => p.id === a.end);
        drawAnimatedArrow(p1, p2, a.color, a.dashed, i, () => {
        completed++;
        if (completed === arrowsData.length) {
            showPoints(); //show points after initial animation is finished
        }
        });
    });

    //Labels
    const labels = [
        { id: "e1a", text: "e¹ᵅ", offsetX: 10, offsetY: 0 },
        { id: "e2a", text: "e²ᵅ", offsetX: -30, offsetY: 0 },
        { id: "e1b", text: "e¹ᵝ", offsetX: 10, offsetY: 20 },
        { id: "e2b", text: "e²ᵝ", offsetX: -30, offsetY: 20 }
    ];

    labels.forEach(label => {
        const t = points.find(p => p.id === label.id);
        svg.append("text")
        .attr("id", `label-${label.id}`)
        .attr("x", t.x + label.offsetX)
        .attr("y", t.y + label.offsetY)
        .text(label.text)
        .style("font-size", "18px")
        .style("font-style", "italic")
        .style("opacity", 0);
    });

    //Draggable points
    function showPoints() {
        const circles = svg.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("fill", d => d.color)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .style("cursor", "grab")
        .style("opacity", 0)
        .transition()
        .duration(500)
        .style("opacity", 1);

        const drag = d3.drag()
        .on("start", function() {
            d3.select(this).style("cursor", "grabbing");
        })
        .on("drag", function(event, d) {
            d.x = event.x;
            d.y = event.y;
            d3.select(this)
            .attr("cx", d.x)
            .attr("cy", d.y);
            updateDiagram();
        })
        .on("end", function() {
            d3.select(this).style("cursor", "grab");
        });

        svg.selectAll("circle").call(drag);

        //label fade-in
        labels.forEach(label => {
        svg.select(`#label-${label.id}`)
            .transition()
            .delay(300)
            .duration(800)
            .style("opacity", 1);
        });
    }

    //Update lines & labels when dragging
    function updateDiagram() {
        const p = Object.fromEntries(points.map(pt => [pt.id, pt]));

        arrowsData.forEach((a, i) => {
        const line = svg.select(`#arrow-${i}`);
        const dx = p[a.end].x - p[a.start].x;
        const dy = p[a.end].y - p[a.start].y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;

        line.attr("x1", p[a.start].x)
            .attr("y1", p[a.start].y)
            .attr("x2", p[a.end].x)
            .attr("y2", p[a.end].y);

        //update arrow head position
        const head = svg.selectAll("polygon").nodes()[i];
        if (head) {
            d3.select(head)
            .attr("transform", `translate(${p[a.end].x},${p[a.end].y}) rotate(${angle})`);
        }
        });

        labels.forEach(label => {
        const t = p[label.id];
        svg.select(`#label-${label.id}`)
            .attr("x", t.x + label.offsetX)
            .attr("y", t.y + label.offsetY);
        });
    }
}

function showVectorDiagram() {
    const allContainers = document.getElementsByClassName("diagram");
    for (let i = 0; i < allContainers.length; i++) {
        allContainers[i].style.display = "none";
    }

    const container = document.getElementById("vector_diagram");
    container.style.display = "block";
    container.style.opacity = 0;
    container.style.transition = "opacity 1s";
    setTimeout(() => container.style.opacity = 1, 10);

    d3.select("#vector_diagram_canvas").selectAll("*").remove(); //clear previous diagram
    VectorDiagram();
}

