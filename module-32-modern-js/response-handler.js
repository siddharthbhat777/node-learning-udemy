// const fs = require('fs').promises;
import fs from "fs/promises";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// this type of export you use when you want to export multiple modules
export const resHandler = (req, res, next) => { // if you use export like this then you need to import component directly like this 'import { resHandler } ...'
    // fs.readFile('my-page.html', 'utf8', (err, data) => {
    //     res.send(data);
    // });
    fs.readFile('my-page.html', 'utf8').then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
    });
    // res.sendFile(path.join(__dirname, 'my-page.html'));
};

// module.exports = resHandler;
// export default resHandler; // can use it if you have single export