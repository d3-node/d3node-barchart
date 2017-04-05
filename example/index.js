const output = require('d3node-output');
const d3nBar = require('../');

const gen = n => {
  const data = [];

  for (let i = 0; i < n; ++i) {
    data.push({
      key: i,
      value: Math.max(10, Math.floor(Math.random() * 100)),
    });
  }

  return data;
};

// create output files
output('./example/output', d3nBar({ data: gen(20) }));
