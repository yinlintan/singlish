import fs from 'fs';
import papa from 'papaparse';

const filepath = 'stimuli/stimuli.csv';
const file = fs.createReadStream(filepath);

var stimuliData = [];

papa.parse(file, {
    header: true,
    step: function (result) {
        stimuliData.push(result.data)
    },
    complete: function (results, file) {
        console.log('Complete', stimuliData[0], 'records.');
    }
});
export default stimuliData;