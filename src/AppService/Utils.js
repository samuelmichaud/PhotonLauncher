
const fs = require('fs');

export const loadFromJSONFile = (path) => {
    let parsedData = [];
    try {
        console.log('loadFromJSONFile: ' + path);
        let rawdata = fs.readFileSync(path);
        parsedData = JSON.parse(rawdata);
    } catch(e){
        console.log('Error:' + e);
    }
  
    return parsedData;
}