// Global Variables
let url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";
let height = 800;
let width = 1000;
let color = d3.scaleOrdinal(d3.schemeCategory20c);
let tooltip = d3.select("body").append("div").attr("id","tooltip");
let svg = d3.select(".graph").append("svg").attr("width", width).attr("height", height);
let req = new XMLHttpRequest();

// JSON Data
req.open('GET', url, true);
req.onload(function() {
    let data = JSON.parse(req.responseText);

    // Create Simulation
    let simulation = d3.forceSimulation().force("charge",d3.forceManyBody().strength(-8)).force("center",d3.forceCenter(width/2, height/2)).force("link",d3.forceLink().distance(35)).force("collide",d3.forceCollide(25));
});
req.send();