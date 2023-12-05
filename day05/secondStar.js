const { getLines } = require('../common/getLines');

function getSeeds (seedLine) {
  const [,numbersString] = seedLine.split(':');
  const numbers = [ ...numbersString.matchAll(/(\d+)/g) ]
    .map((number) => parseInt(number, 10));
  const seeds = [];
  for (let i = 1; i < numbers.length; i += 2) {
    const begin = numbers[i - 1];
    const range = numbers[i];
    seeds.push({ begin, range });
  }
  return seeds;
}

function getTransformations (lines) {
  const transformations = [];
  let currentTransformation;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    if (line.match(/[a-z\-]+ map:/) !== null) {
      if (currentTransformation) {
        transformations.push(currentTransformation);
      }
      currentTransformation = {
        name: line,
        list: [],
      };
    } else {
      const [destination, source, range] = [...line.matchAll(/(\d+)/g)].map((number) => parseInt(number, 10));
      currentTransformation.list.push({ source, destination, range });
    }
  }
  transformations.push(currentTransformation);
  return transformations;
}

function calculateTransformation(sources, transformation) {
  return sources.map((source) => {
    const matchingFormula = transformation.list.find((object) => source >= object.source && source < object.source + object.range);
    if (matchingFormula) {
      return source + (matchingFormula.destination - matchingFormula.source);
    }
    return source;
  });
}

function main () {
  const lines = getLines(`${__dirname}/input`);

  console.log('Start parsing...');
  const seeds = getSeeds(lines[0]);
  const transformations = getTransformations(lines.slice(1).filter((value) => value.length > 0));
  let min = undefined;
  const total = seeds.reduce((acc, seed) => acc + seed.range, 0);
  let handled = 0;
  console.log(`Start processing the ${total} seeds...`);
  for (seed of seeds) {
    for (let i = seed.begin; i < seed.begin + seed.range; ++i) {
      const final = transformations.reduce((acc, transformation) => calculateTransformation(acc, transformation), [i]);
      if (min) {
        min = Math.min(min, ...final);
      } else {
        min = Math.min(...final);
      }
    }
    handled += seed.range;
    console.log(`${handled} / ${total} seeds`);
  }
  console.log(min);
}

main();
