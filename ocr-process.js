//OCR
const { createWorker } = require('tesseract.js')
const fs = require('fs/promises');
const path = require('path');
const {exit} = require('process');

const imageFileName = 'wmrt-3.jpeg';
const filePath = path.join(process.cwd(),'images', imageFileName);
const destTextFilePath = path.join(process.cwd(), 'receipts-data', `${imageFileName}.txt`);

async function extractImageDetails() {
    try {
        const worker = createWorker({
            langPath: path.join(process.cwd(), 'lang-data'),
            logger: (m) => console.log(m),
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text }, } = await worker.recognize(filePath);

        await worker.writeText(destTextFilePath, text);
        if (text == undefined || text.length <= 0) {
            res.sendStatus(400, 'ERROR: Could not read receipt!')
        }
        await worker.terminate();
        console.log("Process Completed Successfully");
    }
    catch (err) {
        console.log(err);
        exit(1);
    }
}

async function writeDataToFile(text) {
    try {
        await fs.writeFile(path.join(destTextFilePath), text);
    } catch (e) {
        console.log(e);
        exit(1);
    }
}

module.exports = {
    extractImageDetails,
    writeDataToFile
}