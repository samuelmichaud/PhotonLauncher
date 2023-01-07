const fs = require('fs');

export const isProductionEnv = () => {
    return !(process.env.WEBPACK_SERVE === "true");
}

export const loadFromJSONFile = (path: string) => {
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

export const storeToJSONFile = (path: string, data: any, callback?: Function) => {
    data = JSON.stringify(data);
    fs.writeFile(path, data, (err: any) => {
        if(err) {
            return console.log(err);
        }
        if (typeof callback === 'function') {
            callback();    
        }
        console.log("Write file to disk: " + path);
    }); 
}

export const encodePathForWindows = (path: string) => {
    return path.replace(/\\/g, '\\\\');
}