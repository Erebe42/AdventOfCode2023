const {getLines} = require("../common/getLines");

function getDrawInfos (drawString) {
  const cubes = drawString.split(',');
  const infos = {};

  for (cube of cubes) {
    const color = cube.match(/(red)|(green)|(blue)/)[0];
    const count = parseInt(cube.match(/[0-9]+/)[0], 10);
    infos[color] = count;
  }

  return infos;
}

function getGameInfos (gameLine) {
  const [header, drawsString] = gameLine.split(':');
  const idString = header.match(/[0-9]+/);
  const id = parseInt(idString[0], 10);
  const draws = drawsString.split(';');
  return {
    id,
    draws: draws.map((draw) => getDrawInfos(draw)),
  };
}

function getGameMinimumCubes (gameInfos) {
  const mininumCubes = gameInfos.draws.reduce(
    (acc, draw) => {
      for (const color of Object.keys(draw)) {
        if (acc[color] < draw[color]) {
          acc[color] = draw[color];
        }
      }
      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );

  return mininumCubes.red * mininumCubes.green * mininumCubes.blue;
}

function main () {
  const lines = getLines(`${__dirname}/input`);
  lines.pop();
  let sum = 0;

  for (const line of lines) {
    const infos = getGameInfos(line);
    sum += getGameMinimumCubes(infos);
  }

  console.log(sum);
}

main();
