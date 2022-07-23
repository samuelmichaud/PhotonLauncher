
import { ipcMain } from 'electron';
import axios from 'axios';
import { loadFromJSONFile } from './Utils'

const path = require('path');
const fs = require('fs');

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');
const optmizedDatabaseName = 'games-database.json';

// Doesn't work yet... It should download the database and optimise it
const downloadAndOptimizeMetadata = (async () => {
    try {
        const res = await axios("https://cdn.thegamesdb.net/json/database-latest.json", {
            onDownloadProgress: (progressEvent) => {
                const percentage = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                    console.log(percentage + '%');
                if (percentage === 100) {
                    console.log('Download ended');
                }
              },
        });
        const { status } = res;
    
        if (status === 200) {
          const fileStream = fs.createWriteStream(path.resolve(glcDir, optmizedDatabaseName));
          fileStream.write(JSON.stringify(res));
          fileStream.on('finish', () => {
            console.log('Download ended 2');
        });
        }
      } catch (error) {
          console.log(error);
      }

});


// Optimize a file download there : https://cdn.thegamesdb.net/json/database-latest.json
ipcMain.on("downloadAndOptimizeMetadata", (event, args) => {
    console.log('downloadAndOptimizeMetadata');
    let data = loadFromJSONFile(path.resolve(glcDir, './database-latest.json'));
    data = (typeof data.data.games != undefined)? data.data.games : [];

    data = data.filter((item) => {
        return item.platform == 1
    });
    data = data.map(item => {
        return {'id': item.id, 'title': item.game_title /*, 'img': 'https://cdn.thegamesdb.net/images/thumb/boxart/front/' + item.id + '-1.jpg'*/}
    });
    const fileStream = fs.createWriteStream(path.resolve(glcDir, optmizedDatabaseName));
    fileStream.write(JSON.stringify(data));
    fileStream.on('finish', () => {
      console.log('Download ended 2');
  });
    
});