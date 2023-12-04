const { getLines } = require('../common/getLines');

function main () {
  const lines = getLines(`${__dirname}/input`);
  lines.pop();

  let sum = 0;

  const matchingNumbersCount = [];
  const cardCount = [];

  for (const line of lines) {
    const [,numbers] = line.split(':');
    const [winningNumbersString, scratchedNumbersString] = numbers.split('|');
    const winningNumbers = [...winningNumbersString.matchAll(/(\d+)/g)]
      .map((result) => parseInt(result[0], 10));
    const scratchedNumbers = [...scratchedNumbersString.matchAll(/(\d+)/g)]
      .map((result) => parseInt(result[0], 10));
    let count = 0;
    for (const scratchedNumber of scratchedNumbers) {
      if (winningNumbers.includes(scratchedNumber)) {
        count += 1;
      }
    }
    cardCount.push(1);
    matchingNumbersCount.push(count);
  }
  for (let i = 0; i < cardCount.length; ++i) {
    const currentMatching = matchingNumbersCount[i];
    for (let j = i + 1; j < cardCount.length && j <= i + currentMatching; ++j) {
      cardCount[j] += cardCount[i];
    }
  }

  console.log(cardCount.reduce((acc, value) => acc + value, 0));
}

main();
