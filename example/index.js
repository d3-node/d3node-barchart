const output = require('d3node-output');
const fs = require('fs');
const d3 = require('d3-node')().d3;
const d3nBar = require('../');

const csvString = fs.readFileSync('data/data.csv').toString();
var data = d3.csvParse(csvString);

// create output files
output('./example/output', d3nBar(data));
