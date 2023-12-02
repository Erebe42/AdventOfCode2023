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

function checkGames (gameInfos) {
  for (const draw of gameInfos.draws) {
    if (draw.red && draw.red > 12) {
      return false;
    }
    if (draw.green && draw.green > 13) {
      return false;
    }
    if (draw.blue && draw.blue > 14) {
      return false;
    }
  }

  return true;
}

function main () {
  const lines = getLines(`${__dirname}/input`);
  lines.pop();
  let sum = 0;

  for (const line of lines) {
    const infos = getGameInfos(line);
    if (checkGames(infos)) {
      sum += infos.id;
    }
  }

  console.log(sum);
}

main();
