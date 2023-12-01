const { getLines } = require("../common/getLines");

const regex = RegExp('([0-9])', 'g');

function main() {
  const lines = getLines(`${__dirname}/input`);
  // Remove last empty line from file
  lines.pop();

  let sum = 0;

  for (const line of lines) {
    const lineDigits = [...line.matchAll(/([0-9])/g)];
    const firstDigit = lineDigits[0][0];
    const lastDigit = lineDigits[lineDigits.length - 1][0];
    const lineNumber = parseInt(`${firstDigit}${lastDigit}`, 10);
    sum += lineNumber;
  }

  console.log(sum);
}

main();
