function WordNetwork() {
    const svg = d3.select("#word_network_canvas");
    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const words = [
        {text: "strike", connection: ["protest", "riot", "crowd"], x: 100, y : 50, color: "red" },
        {text: "protest", connection: ["strike", "crowd", "riot"], x: 60, y: 180 , color: "red" },
        {text: "riot", connection: ["strike", "protest", "crowd", "tsunami"], x:120, y:250 , color: "red"},
        {text: "crowd", connection: ["strike", "protest", "riot", "earthquake"], x: 200, y:140 , color: "red"},
        {text: "earthquake", connection: ["tsunami","tremor", "shaking"], x: 400, y: 30 , color: "green"},
        {text: "tremor", connection: ["crowd", "earthquake", "tsunami", "collapse", "shaking"], x:420, y:170 , color: "green" },
        {text: "tsunami", connection: ["riot", "earthquake", "collapse"], x: 320, y:270 , color: "green" },
        {text: "shaking", connection: ["earthquake", "collapse", "tremor"], x:550, y:70 , color: "green" },
        {text: "collapse", connection: [ "tsunami", "tremor", "collapse", "shaking"], x:480, y:260 , color: "green" },
    ];

    //check duplicate connections
    const drawn = new Set();
    const lines = [];
    words.forEach(word => {
        word.connection.forEach(targetText => {
            const target = words.find(w => w.text === targetText);
            if (target) {
            const key = [word.text, target.text].sort().join("-");

            if (!drawn.has(key)) {
                drawn.add(key);
                line = svg.append("line")
                .attr("x1", word.x)
                .attr("y1", word.y)
                .attr("x2", target.x)
                .attr("y2", target.y)
                .attr("stroke", "darkblue")
                .attr("stroke-width", 2.5)
                .attr("opacity", 0);

                line.transition()
                .delay(1000)
                .duration(1000)
                .ease(d3.easeCubicOut)
                .attr("opacity", 1)
                .attrTween("x2", function() {
                    const ix = d3.interpolateNumber(word.x, target.x);
                    return t => ix(t);
                })
                .attrTween("y2", function() {
                    const iy = d3.interpolateNumber(word.y, target.y);
                    return t => iy(t);
                });
                lines.push({ source: word, target, element: line });
            }}
            
        });
    });

    const groups = svg.selectAll("g.word")
        .data(words)
        .enter()
        .append("g")
        .attr("class", "word")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .style("cursor", "grab")
        .attr("opacity", 0.0);

    const rectWidth = 80;
    const rectHeight = 30;

    //make groups of box and text
    groups.append("rect")
        .attr("x", -rectWidth / 2)
        .attr("y", -rectHeight / 2)
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", d=>d.color=="red" ? "#ffcccc" : "#ccffcc")
        .attr("stroke", "darkblue")
        .attr("stroke-width", 2)
        .attr("opacity", 1.0)
        .style("stroke-dasharray", "6,4");

    //text
    groups.append("text")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("font-family", "sans-serif")
        .text(d=>d.text);

    groups.transition()
        .delay(400)
        .duration(800)
        .attr("opacity", 1.0);

    const drag = d3.drag()
    .on("start", function (event, d) {
    d3.select(this).style("cursor", "grabbing");
    })
    .on("drag", function (event, d) {
    d.x = event.x;
    d.y = event.y;
    d3.select(this).attr("transform", `translate(${d.x}, ${d.y})`);
        updateLines();
        const rect = d3.select(this).select("rect");
        target = words.find(w => w.text === d.text);
        if (d.x > width / 2) {

            if(target.color == "red"){
                rect.attr("stroke", "orange"); 
            }
            else{
                rect.attr("stroke", "darkblue");   
            }
            rect.attr("fill", "#ccffcc");

        } else {
            if(target.color == "green"){
                rect.attr("stroke", "orange"); 
            }
            else{
                rect.attr("stroke", "darkblue");   
            }
            rect.attr("fill", "#ffcccc");
        }

        updateLines();
    })
    .on("end", function () {
    d3.select(this).style("cursor", "grab");
    });

    groups.call(drag);
    //Update lines & word position
    function updateLines() {
        lines.forEach(l => {
        l.element
            .attr("x1", l.source.x)
            .attr("y1", l.source.y)
            .attr("x2", l.target.x)
            .attr("y2", l.target.y);
        });
    }
}

function showWordNetwork() {
    const allContainers = document.getElementsByClassName("diagram");
    for (let i = 0; i < allContainers.length; i++) {
        allContainers[i].style.display = "none";
    }
    
    const container = document.getElementById("word_network");
    container.style.display = "block";
    container.style.opacity = 0;
    container.style.transition = "opacity 1s";
    setTimeout(() => container.style.opacity = 1, 10);

    d3.select("#word_network_canvas").selectAll("*").remove(); //clear previous diagram
    WordNetwork();
}
