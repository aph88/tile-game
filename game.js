class Tile {
    constructor(displayChar, impassible,) {
        this.displayChar = displayChar;
        this.impassible = impassible;
    }
}
const grass = new Tile('G', false);
const tree = new Tile('T', true);
const mountain = new Tile('M', true);
const exit = new Tile('X', false);

const testArr = [mountain];
const tileArray = [grass, tree, mountain];

getRandomTile = (tiles) => {
    return { ...tiles[Math.floor((Math.random() * tiles.length))] }
}

getRandomPosInArray = (arr) => {
    return Math.floor(Math.random() * arr.length)
}

plusOrMinus = () => {
    if (Math.random() > 0.5) return 1;
    return -1;
}

makeRandomMap = (tiles, max) => {
    const map = [];
    const exitLocation = { x: Math.floor(Math.random() * max) };
    if (exitLocation.x < 10) exitLocation.y = Math.floor(Math.random() * (max / 2)) + (max / 2);
    else exitLocation.y = Math.floor(Math.random() * max);
    console.log(exitLocation, 'exit');
    console.log(createRandomPath({ x: 0, y: 0, }, exitLocation, max - 1))
    let y = 0
    for (let x = 0; x < max; x++) {
        if (x === exitLocation.x && y === exitLocation.y) map.push([{ ...exit }]);
        else map.push([getRandomTile(tiles)]);
        if (x === 0 && y === 0) map[0][0] = { ...grass }
        y++;
        while (y < max) {
            if (x === exitLocation.x && y === exitLocation.y) map[x].push({ ...exit });
            else map[x].push(getRandomTile(tiles));
            y++;
        }
        y = 0;
    }
    return map;
}

convertKeyToXY = (key) => {
    const xY = key.split(',')
    return { x: parseInt(xY[0]), y: parseInt(xY[1]) }
}

createRandomPath = (pointA, pointB, max) => {
    const xyBeen = {};
    xyBeen[`${pointB.x},${pointB.y}`] = 0;
    const steps = [{ ...pointB }];
    //console.log(xyBeen, 'xyBeen')
    const currentPos = { ...pointB }
    //console.log(pointA, 'pointA');
    //console.log(pointB, 'pointB');
    //console.log(currentPos, 'currentPos');

    while (currentPos.x !== pointA.x || currentPos.y !== pointA.y) {
        let validMoves = [];
        let checkPos = currentPos.x + 1;
        if (checkPos < max) {
            if (!xyBeen[`${checkPos},${currentPos.y}`]) validMoves.push({ x: checkPos, y: currentPos.y })
        }
        checkPos = currentPos.x - 1;
        if (checkPos >= 0) {
            if (!xyBeen[`${checkPos},${currentPos.y}`]) validMoves.push({ x: checkPos, y: currentPos.y })
        }
        checkPos = currentPos.y + 1;
        if (checkPos < max) {
            if (!xyBeen[`${currentPos.x},${checkPos}`]) validMoves.push({ x: currentPos.x, y: checkPos })
        }
        checkPos = currentPos.y - 1;
        if (checkPos >= 0) {
            if (!xyBeen[`${currentPos.x},${checkPos}`]) validMoves.push({ x: currentPos.x, y: checkPos })
        }
        if (validMoves.length > 0) {
            const nextMove = validMoves[getRandomPosInArray(validMoves)];
            if (currentPos.x !== steps[steps.length - 1].x || currentPos.y !== steps[steps.length - 1].y) {
                steps.push({ ...currentPos });
            }
            xyBeen[`${nextMove.x},${nextMove.y}`] = steps.length;
            currentPos.x = nextMove.x;
            currentPos.y = nextMove.y;
        } else {
            if (currentPos.x === steps[steps.length - 1].x && currentPos.y === steps[steps.length - 1].y) {
                steps.pop();
            }
            xyBeen[`${currentPos.x},${currentPos.y}`] = -1;
            currentPos.x = steps[steps.length - 1].x;
            currentPos.y = steps[steps.length - 1].y;
            //refactor to say current pos is the last pos in the array
        }

    }
    return { xys: xyBeen, steps: steps }
}



displayMap = (map, max) => {
    for (let i = 0; i < max; i++) {
        let displayString = '';
        for (let j = 0; j < max; j++) {
            displayString += ' ' + map[i][j].displayChar;
            if (j === (max - 1)) console.log(displayString);
        }
    }
}

const testA = { x: 0, y: 0 };
const testB = { x: 19, y: 19 };
const gameMap = makeRandomMap(testArr, 20);
displayMap(gameMap, 20);

//console.log(createRandomPath(testA, testB, 19));

