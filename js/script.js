// Global Variables
let url = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";
let height = 800;
let width = 1000;
let color = d3.scaleOrdinal(d3.schemeCategory20c);
let tooltip = d3.select("body").append("div").attr("id","tooltip");
let svg = d3.select(".graph").append("svg").attr("width", width).attr("height", height);
let req = new XMLHttpRequest();
