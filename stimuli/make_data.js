const fs = require('fs');

// read the contents of the JSON file
const jsonData = fs.readFileSync('/Users/tinglin/singlish/stimuli/stimuliData.JSON');

// parse the JSON data
const data = JSON.parse(jsonData);

// generate the JavaScript code
const jsCode = `var stimuliData = ${JSON.stringify(data, null, 2)};`;

// write the JavaScript code to a new file
fs.writeFileSync('data.js', jsCode);
