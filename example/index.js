const d3 = require('d3'); // v3.5.17
const output = require('d3node-output');
const fs = require('fs');
const d3nBar = require('../');

const tsvString = fs.readFileSync('data/data.tsv').toString();
var data = d3.tsv.parse(tsvString);

// create output files
output('./dist/output', d3nBar(data));
