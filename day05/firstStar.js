const { getLines } = require('../common/getLines');

function getSeeds (seedLine) {
  const [,numbersString] = seedLine.split(':');
  return [ ...numbersString.matchAll(/(\d+)/g) ]
    .map((number) => parseInt(number, 10));
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

  const seeds = getSeeds(lines[0]);
  const transformations = getTransformations(lines.slice(1).filter((value) => value.length > 0));
  const final = transformations.reduce((acc, transformation) => calculateTransformation(acc, transformation), seeds);
  console.log(Math.min(...final));
}

main();
