const fs = require('fs');
const papa = require('papaparse');

function parseCsvFile(filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createReadStream(filePath);
        const results = [];

        file.on('data', (chunk) => {
            const parsedData = papa.parse(chunk.toString(), {
                header: true,
                skipEmptyLines: true,
            });
            results.push(...parsedData.data);
        });

        file.on('end', () => {
            resolve(results);
        });

        file.on('error', (error) => {
            reject(error);
        });
    });
}

module.exports = parseCsvFile;
