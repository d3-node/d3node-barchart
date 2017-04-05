const D3Node = require('d3-node');

function bar({
  data,
  selector: defaultSelector = '#chart',
  container: defaultContainer = `
    <div id="container">
      <h2>Bar Chart</h2>
      <div id="chart"></div>
    </div>
  `,
  style: defaultStyle = `
    .bar{fill: steelblue;}
    .bar:hover{fill: brown;}
    .axis{font: 10px sans-serif;}
    .axis path,.axis line{fill: none;stroke: #000;shape-rendering: crispEdges;}
    .x.axis path{display: none;}
  `
} = {}) {
  const d3n = new D3Node({
    selector: defaultSelector,
    svgStyles: defaultStyle,
    container: defaultContainer
  });

  const d3 = d3n.d3;

  // adapted from: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  // set the ranges
  const x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);

  const y = d3.scaleLinear()
          .range([height, 0]);

  const svg = d3n.createSVG()
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  x.domain(data.map((d) => d.key));
  y.domain([0, d3.max(data, (d) => d.value)]);

  // append the rectangles for the bar chart
  svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.key))
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => height - y(d.value));

  // add the x Axis
  svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append('g').call(d3.axisLeft(y));

  return d3n;
}

module.exports = bar;
