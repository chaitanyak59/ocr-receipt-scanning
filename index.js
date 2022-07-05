const { extractImageDetails } = require('./ocr-process');

// Include dependences
const fs = require('fs')

async function startProcess() {
    await extractImageDetails();
}

startProcess();
