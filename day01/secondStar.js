const { getLines } = require("../common/getLines");

const digitsAsString = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

function reverseString (stringToReverse) {
  return stringToReverse
    .split('')
    .reverse()
    .join('');
}

function buildRegex () {
  const stringDigitsCapturingGroup = digitsAsString
    .map((digitAsString) => `(${digitAsString})`);
  const stringDigitsCapturingGroupReversed = digitsAsString
    .map((digitAsString) => reverseString(digitAsString))
    .map((digitAsString) => `(${digitAsString})`);
  const allStringDigitsCapturingGroup = stringDigitsCapturingGroup.join('|');
  const allStringDigitsCapturingGroupReversed = stringDigitsCapturingGroupReversed.join('|');
  const stringRegex = `[0-9]|${allStringDigitsCapturingGroup}`;
  const reversedStringRegex = `[0-9]|${allStringDigitsCapturingGroupReversed}`;
  return {
    normal: RegExp(stringRegex, 'g'),
    reversed: RegExp(reversedStringRegex, 'g'),
  };
}

const regex = buildRegex();

function convertDigitFound (digit) {
  const index = digitsAsString.findIndex((digitString) => digitString === digit);
  return index < 0 ? digit : index + 1;
}

function main() {
  const lines = getLines(`${__dirname}/input`);
  // Remove last empty line from file
  lines.pop();

  let sum = 0;

  for (const line of lines) {
    const lineDigits = [...line.matchAll(regex.normal)];
    const lineDigitsReversed = [...reverseString(line).matchAll(regex.reversed)];
    const firstDigit = convertDigitFound(lineDigits[0][0]);
    const lastDigit = convertDigitFound(reverseString(lineDigitsReversed[0][0]));
    const lineNumber = parseInt(`${firstDigit}${lastDigit}`, 10);
    console.log(lineNumber);
    sum += lineNumber;
  }

  console.log(sum);
}

main();
