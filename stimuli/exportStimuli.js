const parseCsvFile = require('./convert_csv');
const fs = require('fs');
const papa = require('papaparse');

async function parseAndUseCsvFile() {
    const filePath = 'stimuli/stimuli.csv';
    const exportFileName = 'stimuli/stimuliData.JSON';
    try {
        const parsedData = await parseCsvFile(filePath);
        const jsonData = JSON.stringify(parsedData);
        fs.writeFile(exportFileName, jsonData, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Data exported to ${exportFileName}`);
        });
        return parsedData; // return the object with the parsed data
    } catch (error) {
        console.error(error);
    }
}

parseAndUseCsvFile();
//module.exports = parseAndUseCsvFile(); // export the function call as a module
// import parseCsvFile from './convert_csv.mjs';

// async function parseAndUseCsvFile() {
//     const filePath = 'stimuli/stimuli.csv';
//     try {
//         const parsedData = await parseCsvFile(filePath);
//         // use the parsed data here
//         // console.log(parsedData);
//         return parsedData; // return the parsed data
//     } catch (error) {
//         console.error(error);
//     }
// }

// const myData = await parseAndUseCsvFile(); // assign the parsed data to a variable
// console.log(myData);
// export default myData;