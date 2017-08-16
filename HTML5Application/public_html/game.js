var gameLoopInterval,
    blockSize = 50,
    gameUpdateSpeed = 400,
    foodScore = 5,
    cherryScore = 10,
    panicMode = false,
    panicModeTimeOut = 4000;


var mazeElement = document.querySelector('.maze');
var startGameBtn = document.querySelector('.start-game-btn');
var pauseGameBtn = document.querySelector('.pause-game-btn');
var resumeGameBtn = document.querySelector('.resume-game-btn');
var scoreElement = document.querySelector('.score');
var gameOverElement = document.querySelector('.game-over');
var startNewGameBtn = document.querySelector('.start-new-game-btn');

var score = 0;

var pacman = {
    name: 'pacman',
    initialPosition: { row: 0, col: 0 },
    position: { row: 0, col: 0 },
    movingDirection: 'stand'
};


var ghosts = [{
    name: 'blinky',
    initialPosition: { row: 9, col: 7 },
	firstPosition: { row: 9, col: 7 },
    position: { row: 9, col: 7 },
    movingDirection: 'up'
},
{
    name: 'pinky',
    initialPosition: { row: 9, col: 8 },
	firstPosition: { row: 9, col: 8 },
    position: { row: 9, col: 8 },
    movingDirection: 'left'
},
{
    name: 'inky',
    initialPosition: { row: 9, col: 9 },
	firstPosition: { row: 9, col: 9 },
    position: { row: 9, col: 9 },
    movingDirection: 'right'
},
{
    name: 'clyde',
    initialPosition: { row: 9, col: 10 },
	firstPosition: { row: 9, col: 10 },
    position: { row: 9, col: 10 },
    movingDirection: 'down'
}];

var cherries = [{
    position: { row: 0, col: 10 },
},
{
    position: { row: 4, col: 2 },
},
{
    position: { row: 7, col: 10 },
},
{
    position: { row: 9, col: 2 },
},
{
    position: { row: 9, col: 10 }
}];


var mazeWidth = 11;
var mazeHight = 10;


var initialMaze = [
    ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food'],
    ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'wall horizontal', 'wall horizontal', 'food'],
    ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food'],
    ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food'],
    ['food', 'food', 'food', 'wall horizontal', 'wall horizontal', 'food', 'food', 'wall horizontal vertical', 'food', 'food', 'food'],
    ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food'],
    ['food', 'food', 'wall horizontal', 'wall horizontal', 'wall horizontal', 'wall horizontal', 'food', 'food', 'food', 'food', 'food'],
    ['food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'wall horizontal', 'wall horizontal', 'food'],
    ['food', 'wall vertical', 'food', 'wall horizontal', 'wall horizontal', 'wall horizontal', 'food', 'food', 'food', 'food', 'food'],
    ['food', 'wall vertical', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food', 'food']];

// TODO: do not us JSON bazooka
var maze = JSON.parse(JSON.stringify(initialMaze));


function startGame() {

    initMaze();
    drawMaze(maze);

    gameLoopInterval = setInterval(gameLoop, gameUpdateSpeed);
}


var gameLoop = function () {
    //will handel pacman movment 

    switch (pacman.movingDirection) {
        case 'right':
            movePacman(pacman.position, { row: pacman.position.row, col: pacman.position.col + 1 }, maze);
            break;
        case 'left':
            movePacman(pacman.position, { row: pacman.position.row, col: pacman.position.col - 1 }, maze);
            break;
        case 'down':
            movePacman(pacman.position, { row: pacman.position.row + 1, col: pacman.position.col }, maze);
            break;
        case 'up':
            movePacman(pacman.position, { row: pacman.position.row - 1, col: pacman.position.col }, maze);
            break

    }

    for (ghost of ghosts) {
        switch (ghost.movingDirection) {
            case 'right':
                moveGhost(ghost.position, { row: ghost.position.row, col: ghost.position.col + 1 }, maze, ghost);
                break;

            case 'left':
                moveGhost(ghost.position, { row: ghost.position.row, col: ghost.position.col - 1 }, maze, ghost);
                break;
            case 'down':
                moveGhost(ghost.position, { row: ghost.position.row + 1, col: ghost.position.col }, maze, ghost);
                break;
            case 'up':
                moveGhost(ghost.position, { row: ghost.position.row - 1, col: ghost.position.col }, maze, ghost);
                break;
        }
    }



    drawMaze(maze);

    checkGameOver();
    
}


function initMaze() {
    //init maze size on UI
    mazeElement.style = 'width: ' + mazeWidth * blockSize + 'px; height: ' + mazeHight * blockSize + 'px;';

    //place pacman
    maze[pacman.position.row][pacman.position.col] = 'pacman';

    //place ghost
    for (ghost of ghosts) {
        maze[ghost.position.row][ghost.position.col] += ' ghost ' + ghost.name;
    }

    // place cherries
    for (cherry of cherries) {
        maze[cherry.position.row][cherry.position.col] += ' cherry';
    }

}

// first function to update the maze with pacman and ghosts
initMaze();


function drawMaze(maze) {

    mazeElement.innerHTML = '';
    for (var i = 0; i < maze.length; i++) {
        var row = maze[i];
        for (var j = 0; j < row.length; j++) {
            // console.log(row[j]);

            //TODO: here we will draw the maze blocks and characters
            drawMazeBlock(row[j], j, i);
        }
    }

}

function drawMazeBlock(block, leftPos, topPos) {

    //TODO: creat block element in the corect position inside maze dave

    var blockElement = document.createElement('div');
    blockElement.className = block;
    blockElement.style.top = topPos * blockSize + 'px';
    blockElement.style.left = leftPos * blockSize + 'px';

    mazeElement.appendChild(blockElement);
}

drawMaze(maze);


function movePacman(fromPoint, toPoint, maze) {//move pacman function 

    if ((toPoint.row < mazeHight && toPoint.row >= 0)
        && (toPoint.col < mazeWidth && toPoint.col >= 0)
        && (maze[toPoint.row][toPoint.col].indexOf('wall') === -1)) {

        if (maze[toPoint.row][toPoint.col] === 'food') {
            score += foodScore;
            updateScoreInUi();
        } else if (maze[toPoint.row][toPoint.col].indexOf('cherry') !== -1) {
            //checks if cherry food
            score += cherryScore;
            updateScoreInUi();
            startPanicMode();
        }

        maze[toPoint.row][toPoint.col] = 'pacman';
        pacman.position = toPoint;
        maze[fromPoint.row][fromPoint.col] = 'empty';

    }
}


function movePacmanByPres(e) {

    switch (e.key) {
        case 'd': //d
            pacman.movingDirection = 'right';
            break;
        case 's': //s
            pacman.movingDirection = 'down';
            break;
        case 'a': //a
            pacman.movingDirection = 'left';
            break;
        case 'w': //w
            pacman.movingDirection = 'up';
            break;
    }

}

function moveGhost(fromPoint, toPoint, maze, ghost) {//move gohst function 

    if ((toPoint.row < mazeHight && toPoint.row >= 0)
        && (toPoint.col < mazeWidth && toPoint.col >= 0)
        && (maze[toPoint.row][toPoint.col].indexOf('wall') === -1)
        && (maze[toPoint.row][toPoint.col].indexOf('ghost') === -1)) {


        maze[toPoint.row][toPoint.col] += ' ghost ' + ghost.name;
        ghost.position = toPoint;
        maze[fromPoint.row][fromPoint.col] = maze[fromPoint.row][fromPoint.col].replace('ghost ' + ghost.name, '');
    }
    else {
        updateGhostMovingDirection(ghost);
    }
}

function moveGohstByPacmanMovment(gohstPosition) {
    //TODO: see if rand is necesry becouse of the rand function of the walls
    //  var randChasePacman = 100 * Math.random();//not relvent
    // if (randChasePacman < 100) {//the way to get the pacman//not relvent
    if (gohstPosition.row > pacman.position.row) {
        if ((gohstPosition.row > 0) && (maze[gohstPosition.row - 1][gohstPosition.col] !== 'wall')) {

            GohstMovingDirection = 'up';
        }
        else if (gohstPosition.col > pacman.position.col) {
            GohstMovingDirection = 'left';
        }
        else if (gohstPosition.col < pacman.position.col) {
            GohstMovingDirection = 'right';
        }


    }

    else if (gohstPosition.row < pacman.position.row) {
        if ((gohstPosition.row < mazeHight) && (maze[gohstPosition.row + 1][gohstPosition.col] !== 'wall')) {
            GohstMovingDirection = 'down';
        }
        else if (gohstPosition.col > pacman.position.col) {
            GohstMovingDirection = 'left';
        }
        else if (gohstPosition.col < pacman.position.col) {
            GohstMovingDirection = 'right';
        }


    }

    else if (gohstPosition.row === pacman.position.row) {

        if (gohstPosition.col > pacman.position.col) {
            if (maze[gohstPosition.row - 1][gohstPosition.col] !== 'wall') {
                GohstMovingDirection = 'left';
            }

            else {
                updateGhostMovingDirection(ghost);
            }
        }

        else if (gohstPosition.col < pacman.position.col) {
            if (maze[gohstPosition.row + 1][gohstPosition.col] !== 'wall') {
                GohstMovingDirection = 'right';
            }

            else {
                updateGhostMovingDirection(ghost);
            }

        }
    }



}




function updateGhostMovingDirection(ghost) {
    var randDirection = Math.floor(4 * Math.random());
    switch (randDirection) {
        case 0:
            ghost.movingDirection = 'up';
            break;
        case 1:
            ghost.movingDirection = 'down';
            break;
        case 2:
            ghost.movingDirection = 'left';
            break;
        case 3:
            ghost.movingDirection = 'right';
            break;
    }
}

function checkGameOver() {

    for (ghost of ghosts) {
        if ((panicMode = false)&&
		   (pacman.position.row === ghost.position.row) && (pacman.position.col === ghost.position.col)) {//make initGameover function
            

            clearInterval(gameLoopInterval);

            gameOverElement.style.display = 'block';

        }
    }
}


function startPanicMode() {
    mazeElement.classList.add('panic-mode');
    panicMode = true;
	
	for (ghost of ghosts) {
        if ((pacman.position.row === ghost.position.row) && (pacman.position.col === ghost.position.col)) {
		
		score = score + 200;
		updateScoreInUi()
		ghost.position = ghost.firstPosition;
		}
	}
     

    setTimeout(function(){
        panicMode= false;
        mazeElement.classList.remove('panic-mode');
    }, panicModeTimeOut);

}

function pauseGame() {
    clearInterval(gameLoopInterval);
    pauseGameBtn.style.display = 'none';
    resumeGameBtn.style.display = 'inline';
}
function resumeGame() {

    gameLoopInterval = setInterval(gameLoop, gameUpdateSpeed);
    pauseGameBtn.style.display = 'inline';
    resumeGameBtn.style.display = 'none';
}

function updateScoreInUi() {
    scoreElement.innerText = score;
}

function resetGame() {
    maze = JSON.parse(JSON.stringify(initialMaze));

    pacman.position.col = pacman.initialPosition.col;
    pacman.position.row = pacman.initialPosition.row;
    pacman.movingDirection = 'stand';

    for (ghost of ghosts) {
        ghost.position.row = ghost.initialPosition.row;
        ghost.position.col = ghost.initialPosition.col;
    }

    clearInterval(gameLoopInterval);

    gameOverElement.style.display = 'none';
    score = 0;
    updateScoreInUi();
}


window.addEventListener('keypress', movePacmanByPres, false);


startGameBtn.addEventListener('click', () => {
    resetGame();
    startGame();
});
pauseGameBtn.addEventListener('click', pauseGame);
resumeGameBtn.addEventListener('click', resumeGame);
startNewGameBtn.addEventListener('click', function () {
    resetGame();
    startGame();
});