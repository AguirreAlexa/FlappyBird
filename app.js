document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');

    // let birdLeft = 220;
    let birdLeft = 500;
    // let birdBottom = 100;
    let birdBottom = 200;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }
    let gameTimerId = setInterval(startGame, 20);

    function control(e) {
        if(e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if(birdBottom < 390){ //Implica que el bird solo puede llegar a ese height que seria el tope de pagina.
            birdBottom += 30;
            bird.style.bottom = birdBottom + 'px';
        }
    }
    document.addEventListener('keyup', control);

    function generateObstacle() {
        // let obstacleLeft = 500;
        let obstacleLeft = 1200;
        let randomHeight = Math.random() * 90;
        let obstacleBottom = randomHeight;

        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        };
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            if(!isGameOver) obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if(obstacleLeft === -60){
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            // obstacleLeft > 160 && obstacleLeft < 280 && birdleft === 220
            if ((obstacleLeft > 450 && obstacleLeft < 550 && birdLeft === 500) && 
                (birdBottom < obstacleBottom + 151 || birdBottom > obstacleBottom + gap - 185) || 
                (birdBottom === 0)){
                gameOver();
                clearInterval(timerId);
            }
        }
        let timerId = setInterval(moveObstacle, 15);
        if(!isGameOver) {
            setTimeout(generateObstacle, 3000);
        };
    }
    generateObstacle();

    function gameOver() {
        console.log("game over");
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);

        const letter = document.createElement('div');
        letter.classList.add('gameOver');
        gameDisplay.appendChild(letter);
    }

})