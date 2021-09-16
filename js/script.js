// Global Variables
let url =
  "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";
let height = 700;
let width = 900;
let radius = 10;
let color = d3.scaleOrdinal(d3.schemeCategory20c);
let tooltip = d3.select("body").append("div").attr("id", "tooltip");
let svg = d3
  .select(".graph")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// JSON Data

d3.json(url, function (err, data) {
  if (err) throw err;
  // Create Simulation
  let simulation = d3
    .forceSimulation()
    .force("charge", d3.forceManyBody().strength(-8))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink().distance(35))
    .force("collide", d3.forceCollide(25));

  // Create Nodes
  let nodes = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("r", 10)
    .attr("fill", function (d) {
      return color(d.code[0]);
    })
    .call(
      d3.drag().on("start", dragStart).on("drag", dragIng).on("end", dragEnd)
    )
    .on("mousemove", function (d) {
      tooltip
        .style("display", "inline-block")
        .style("left", d3.event.pageX + 15 + "px")
        .style("top", d3.event.pageY + -55 + "px")
        .html(d.country);
    })
    .on("mouseout", function (d) {
      return tooltip.style("display", "none");
    });

  // Create Flags
  let flags = d3
    .select(".flagbox")
    .selectAll("img")
    .data(data.nodes)
    .enter()
    .append("img")
    .attr("class", (d) => `flag flag-${d.code}`)
    .call(
      d3.drag().on("start", dragStart).on("drag", dragIng).on("end", dragEnd)
    )
    .on("mousemove", function (d) {
      tooltip
        .style("display", "inline-block")
        .style("left", d3.event.pageX + 15 + "px")
        .style("top", d3.event.pageY + -55 + "px")
        .html(d.country);
    })
    .on("mouseout", function (d) {
      return tooltip.style("display", "none");
    });

  // Create Links
  let links = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("stroke-width", "1.5px");

  // Function to Update Ticks
  function updateTicks() {
    nodes
      .attr("cx", function (d) {
        return (d.x = Math.max(radius, Math.min(width - radius, d.x)));
      })
      .attr("cy", function (d) {
        return (d.y = Math.max(radius, Math.min(height - radius, d.y)));
      });

    links
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      });

    flags
      .style("left", function (d) {
        return d.x - 8 + "px";
      })
      .style("top", function (d) {
        return d.y - 6 + "px";
      });
  }

  // Function to Drag Start
  function dragStart(d) {
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
  }

  // Function to Drag
  function dragIng(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  // Function to Drag End
  function dragEnd(d) {
    if (!d3.event.active) {
      simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }

  // Apply Simulation
  simulation
    .nodes(data.nodes)
    .on("tick", updateTicks)
    .force("link")
    .links(data.links);
});