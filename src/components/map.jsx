import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Geo from "../geo.json";

function Map({ launchpads = [], highlighted }) {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("[Map] render, pads:", launchpads.length, "highlighted:", highlighted);

    const width = 1000;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 100 };

    const container = d3.select(containerRef.current);
    container.selectAll("*").remove();

    const svg = container
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

    const mainGroup = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const projection = d3
      .geoMercator()
      .scale(150)
      .center([0, 20])
      .translate([
        (width - margin.left - margin.right) / 2 + margin.left,
        (height - margin.top - margin.bottom) / 2 + margin.top,
      ]);

    const path = d3.geoPath().projection(projection);

    mainGroup
      .append("g")
      .selectAll("path")
      .data(Geo.features)
      .enter()
      .append("path")
      .attr("class", "topo")
      .attr("d", path)
      .style("opacity", 0.8)
      .style("fill", "#ccc")
      .style("stroke", "#444");

    const padsData = launchpads
      .filter(p => p.latitude !== undefined && p.longitude !== undefined)
      .map(p => ({ ...p, _lat: p.latitude, _lon: p.longitude }));

    console.log("[Map] Filtered pads:", padsData.length);

    const padsG = mainGroup.append("g").attr("class", "launchpads");

    padsG.selectAll("circle.launchpad")
      .data(padsData, d => d.id)
      .join("circle")
      .attr("class", "launchpad")
      .attr("r", d => (d.id === highlighted ? 10 : 5))
      .attr("cx", d => projection([d._lon, d._lat])[0])
      .attr("cy", d => projection([d._lon, d._lat])[1])
      .attr("fill", d => (d.id === highlighted ? "#00aaff" : "#ff7f50"))
      .attr("stroke", d => (d.id === highlighted ? "#002a44" : "#fff"))
      .attr("stroke-width", d => (d.id === highlighted ? 2 : 1))
      .on("mouseenter", (event, d) => console.log("[Map] hover pad:", d.name));

    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on("zoom", event => mainGroup.attr("transform", event.transform));

    svg.call(zoom);
  }, [launchpads, highlighted]);

  return <div className="mapContainer" ref={containerRef}></div>;
}

export default Map;
