const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    return new Promise((resolve, reject) => {
        exec(`javac "${filepath}" -d "${outPath}" && java -cp "${outputPath}" Main`, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            // Assuming successful execution if no errors are encountered
            resolve(stdout);
        });
    });
}

module.exports = {
    executeJava
};
