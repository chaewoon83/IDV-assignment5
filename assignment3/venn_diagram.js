function VennDiagram() {
    const svg = d3.select("#venn_diagram_canvas");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    svg.selectAll("*").remove(); // clear old diagram

    n = parseInt(document.getElementById("circleCount").value);
    const min = 1;
    const max = 6;

    if (n < min) {
        n = min
        document.getElementById("circleCount").value = min
    };
    if (n > max) {
        n = max
        document.getElementById("circleCount").value = max
    };
    //const n = 5; //number of sets

    const cx = width / 2;
    const cy = height / 2;
    const r = 50;

    // Define color scale
    const colors = d3.schemeCategory10;

    // Compute equally spaced positions around a circle
    const angleStep = (2 * Math.PI) / n;

    for (let i = 0; i < n; i++) {

        const angle = i * angleStep;
        const x = cx + 15 * Math.sqrt(n) * Math.cos(angle);
        const y = cy + 15 * Math.sqrt(n) * Math.sin(angle);

        circle = svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 0)
        .attr("fill", colors[i % colors.length])
        .attr("opacity", 0.4)
        .attr("stroke", "black")
        .attr("stroke-width", 1.5);

        const textx = x + ((r+15) * Math.cos(angle));
        const texty = y + ((r+15) * Math.sin(angle));

        svg.append("text")
        .attr("x", textx )
        .attr("y", texty)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "16px")
        .text(`${i + 1}`);

        circle.transition()
        .delay(0)
        .duration(200)
        .attr("r", r);
    }

}

function drawVenn() {
    VennDiagram();
}

function showVennDiagram() {
    const allContainers = document.getElementsByClassName("diagram");
    for (let i = 0; i < allContainers.length; i++) {
        allContainers[i].style.display = "none";
    }
    
    const container = document.getElementById("venn_diagram");
    container.style.display = "block";
    container.style.opacity = 0;
    container.style.transition = "opacity 1s";
    setTimeout(() => container.style.opacity = 1, 10);

    d3.select("#word_network_canvas").selectAll("*").remove(); //clear previous diagram
}

