const { getLines } = require('../common/getLines');

function main () {
  const lines = getLines(`${__dirname}/input`);
  lines.pop();

  const numbers = [];
  const symbols = [];
  lines.forEach((line, indexY) => {
    const numbersFound = [...line.matchAll(/(\d+)/g)];
    for (const matchNumber of numbersFound) {
      numbers.push({
        asString: matchNumber[0],
        asNumber: parseInt(matchNumber[0], 10),
        indexX: matchNumber.index,
        indexY,
      });
    }
    const symbolsFound = [...line.matchAll(/(?!\d|\.)(.)/g)];
    for (const symbol of symbolsFound) {
      symbols.push({
        asString: symbol[0],
        indexX: symbol.index,
        indexY,
        nearNumber: [],
      });
    }
  })

  for (const number of numbers) {
    for (let i = 0; i < number.asString.length; ++i) {
      const indexXToCheck = number.indexX + i;
      const indexYToCheck = number.indexY;

      const foundSymbol = symbols.find((symbol) => Math.abs(indexXToCheck - symbol.indexX) <= 1 && Math.abs(indexYToCheck - symbol.indexY) <= 1);

      if (foundSymbol) {
        foundSymbol.nearNumber.push(number.asNumber);
        break;
      }
    }
  }

  const matchingGears = symbols.filter((symbol) => symbol.asString === '*' && symbol.nearNumber.length === 2);
  const result = matchingGears.reduce((acc, gear) => acc + (gear.nearNumber[0] * gear.nearNumber[1]), 0);

  console.log(result);
}

main();
