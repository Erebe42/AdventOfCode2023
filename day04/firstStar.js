const { getLines } = require('../common/getLines');

function main () {
  const lines = getLines(`${__dirname}/input`);
  lines.pop();

  let sum = 0;

  for (const line of lines) {
    const [,numbers] = line.split(':');
    const [winningNumbersString, scratchedNumbersString] = numbers.split('|');
    const winningNumbers = [...winningNumbersString.matchAll(/(\d+)/g)]
      .map((result) => parseInt(result[0], 10));
    const scratchedNumbers = [...scratchedNumbersString.matchAll(/(\d+)/g)]
      .map((result) => parseInt(result[0], 10));
    let linePoint = 0;
    for (const scratchedNumber of scratchedNumbers) {
      if (winningNumbers.includes(scratchedNumber)) {
        if (linePoint === 0) {
          linePoint = 1;
        } else {
          linePoint *= 2;
        }
      }
    }
    sum += linePoint;
  }
  console.log(sum);
}

main();
