const fs = require('fs');

function getLines (filePath) {
  const fileContent = fs.readFileSync(filePath);

  return fileContent.toString().split(/\r?\n/);
}

module.exports = {
  getLines,
};
